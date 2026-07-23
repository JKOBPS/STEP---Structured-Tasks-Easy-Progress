package com.step_app_jacob.step_app.modules.tasks.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.step_app_jacob.step_app.modules.columns.entity.ColumnEntity;
import com.step_app_jacob.step_app.modules.columns.repository.ColumnRepository;
import com.step_app_jacob.step_app.modules.enums.Priority;
import com.step_app_jacob.step_app.modules.enums.ProjectRoles;
import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;
import com.step_app_jacob.step_app.modules.membership.repository.ProjectMembershipRepository;
import com.step_app_jacob.step_app.modules.projects.entity.Project;
import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskDtoMapper;
import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskRequestDto;
import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskResponseDto;
import com.step_app_jacob.step_app.modules.tasks.entity.Task;
import com.step_app_jacob.step_app.modules.tasks.repository.TaskRepository;
import com.step_app_jacob.step_app.modules.users.entity.User;
import com.step_app_jacob.step_app.modules.users.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ColumnRepository columnRepository;
    private final UserRepository userRepository;
    private final ProjectMembershipRepository projectMembershipRepository;

    TaskService(TaskRepository taskRepository, ProjectMembershipRepository projectMembershipRepository, UserRepository userRepository, ColumnRepository columnRepository) {
        this.taskRepository = taskRepository;
        this.columnRepository = columnRepository;
        this.projectMembershipRepository = projectMembershipRepository;
        this.userRepository = userRepository;
    }

    //READ
    @Transactional(readOnly = true)
    public List<TaskResponseDto> findAllTasksWithUsername(org.springframework.security.core.userdetails.User user) {
        return TaskDtoMapper.toDtoList(taskRepository.findAllByAndAssignedTo_Username(user.getUsername()));
    }

    @Transactional(readOnly = true)
    public List<TaskResponseDto> findTaskByProjectId (Long id, org.springframework.security.core.userdetails.User user) {
        return TaskDtoMapper.toDtoList(taskRepository.findTasksByProjectId(id));
    }

    @Transactional(readOnly = true)
    public TaskResponseDto findTaskByIdWithUsername(Long id, org.springframework.security.core.userdetails.User user) {
        return TaskDtoMapper.toDto(taskRepository.findByIdAndAssignedTo_Username(id, user.getUsername()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarea no encontrada con ID: " + id)));
    }

    @Transactional(readOnly = true)
    public List<TaskResponseDto> findTaskByTitleWithUsername(String name, org.springframework.security.core.userdetails.User user) {
        return TaskDtoMapper.toDtoList(taskRepository.findByTitleAndUsername(name, user.getUsername()));
    }

    //CREATE
    @Transactional
    public TaskResponseDto saveTask(TaskRequestDto taskDto) {
        Task task = new Task();
        ColumnEntity column = columnRepository.findById(taskDto.getAssignedToColumnId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna no encontrada con ID: " + taskDto.getAssignedToColumnId()));
        Project project = column.getProject();
        Long userDtoId = taskDto.getAssignedToUserId();
        User assignedUser = new User();
        
        if(userDtoId != null) {
            
            userRepository.findById(userDtoId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario que intenta asignar no existe en la BBDD con ID: " + userDtoId));
        
            //Comprueba si el nuevo usuario es miembro del proyecto donde se encuentra la columna.
            Optional<ProjectMembership> membership = projectMembershipRepository.findByUserIdAndProjectId(userDtoId, project.getId());
            if(membership.isPresent()) {
                assignedUser = membership.get().getUser();
            }
            //Comprueba que un 'VIEWER' no pueda tener asignada ninguna tarea.
            if(membership.get().getRole() == ProjectRoles.VIEWER) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se le pueden asignar tareas a un usuario con rol 'VIEWER'");

            if(assignedUser.getId() == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado en miembros del proyecto con ID: " + userDtoId);
            } else task.setAssignedTo(assignedUser);
        }        

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setPriority(Priority.valueOf(taskDto.getPriority()));
        task.setDueDate(taskDto.getDueDate());
        task.setPercentage(taskDto.getPercentage());
        task.setColumn(column);

        return TaskDtoMapper.toDto(taskRepository.save(task));
    }

    //UPDATE
    @Transactional
    public TaskResponseDto updateTaskById(Long id, TaskRequestDto newTask) {

        Long idComparator = null;

        //original data
        Task originalTask = taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarea no encontrada con ID: " + id));
        ColumnEntity originalColumn = originalTask.getColumn();
        Project originalProject = originalColumn.getProject();

        //new data
        User userUpdated = null;
        if(newTask.getAssignedToUserId()!=null) {
            userUpdated = userRepository.findById(newTask.getAssignedToUserId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No encontrado usuario con ID: " + newTask.getAssignedToUserId()));
            //Comprueba si el nuevo usuario es miembro del proyecto donde se encuentra la columna.
            Optional<ProjectMembership> membership = projectMembershipRepository.findByUserIdAndProjectId(userUpdated.getId(), originalProject.getId());
            if(membership.isPresent()) {
                idComparator = membership.get().getUser().getId();
            }
            //Comprueba que un 'VIEWER' no pueda tener asignada ninguna tarea.
            if(membership.get().getRole() == ProjectRoles.VIEWER) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se le pueden asignar tareas a un usuario con rol 'VIEWER'");
        }else {
            newTask.setAssignedToUserId(null);
        }
        ColumnEntity newTaskColumn = columnRepository.findById(newTask.getAssignedToColumnId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No encontrada columna con ID: " + newTask.getAssignedToColumnId()));
        Project projectOfNewTaskColumn = newTaskColumn.getProject();


        if(idComparator == null && userUpdated != null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no es miembro del proyecto donde se encuentra esta tarea ID: " + userUpdated.getId());
        }

        //comprueba que las diferentes columnas tienen el mismo proyecto
        if(originalProject.getId().equals(projectOfNewTaskColumn.getId())) {

            originalTask.setTitle(newTask.getTitle());
            originalTask.setDescription(newTask.getDescription());
            originalTask.setPriority(Priority.valueOf(newTask.getPriority()));
            originalTask.setDueDate(newTask.getDueDate());
            originalTask.setAssignedTo(userUpdated);
            originalTask.setPercentage(newTask.getPercentage());
            
            //actualiza sólo si se quiere cambiar la columna
            if(originalColumn.getId()!=newTaskColumn.getId()){
                originalTask.setColumn(newTaskColumn);
            }

            return TaskDtoMapper.toDto(taskRepository.save(originalTask));
        } else throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error: está intentando asignar una columna que no pertenece al proyecto");
    }

    //DELETE
    @Transactional
    public TaskResponseDto deleteTaskById(Long id){
        //task to delete
        Task taskFound = taskRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarea no encontrada con ID: " + id));

        taskRepository.delete(taskFound);

        return TaskDtoMapper.toDto(taskFound);
    }

}
