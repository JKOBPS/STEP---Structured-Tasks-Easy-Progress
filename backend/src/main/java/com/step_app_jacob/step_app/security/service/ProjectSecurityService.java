package com.step_app_jacob.step_app.security.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.step_app_jacob.step_app.modules.columns.repository.ColumnRepository;
import com.step_app_jacob.step_app.modules.enums.ProjectRoles;
import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;
import com.step_app_jacob.step_app.modules.membership.repository.ProjectMembershipRepository;
import com.step_app_jacob.step_app.modules.tasks.repository.TaskRepository;
import com.step_app_jacob.step_app.modules.users.entity.User;
import com.step_app_jacob.step_app.modules.users.repository.UserRepository;


@Service("projectSecurity")
public class ProjectSecurityService {

    private final ProjectMembershipRepository projectMembershipRepository;

    private final UserRepository userRepository;

    private final ColumnRepository columnRepository;

    final TaskRepository taskRepository;

    ProjectSecurityService(ProjectMembershipRepository projectMembershipRepository, ColumnRepository columnRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.projectMembershipRepository = projectMembershipRepository;
        this.userRepository = userRepository;
        this.columnRepository = columnRepository;
        this.taskRepository = taskRepository;
    }

    //Comprueba si el rol del usuario, coincide con el rol esperado, en el proyecto pasado por parámetro
    public boolean hasProjectPermission(String userName, Long projectId, ProjectRoles requiredRole) {

        Optional<User> userOpt = userRepository.findByUsername(userName);

        if(!userOpt.isPresent()) return false;
        Long userId = userOpt.get().getId();

        Optional<ProjectMembership> membershipOpt = projectMembershipRepository.findByUserIdAndProjectId(userId, projectId);

        if(!membershipOpt.isPresent()) return false;
        ProjectRoles userRole = membershipOpt.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no es miembro del proyecto")).getRole();

        if(userRole == requiredRole || userRole == ProjectRoles.OWNER) {
            return true;
        }
        return false;
    }

    //Método que, desde la id de la columna, accede a al proyecto.
    public boolean hasColumnPermission(String username, Long columnId, ProjectRoles role) {
        Long projectId = columnRepository.findProjectIdByColumnId(columnId);
        if (projectId == null) {
            return false;
        }
        return hasProjectPermission(username, projectId, role);
    }

    //Método que, desde la id de la tarea accede a la columna.
    public boolean hasTaskPermission(String username, Long taskId, ProjectRoles role) { 
        Long columnId = taskRepository.findColumnIdByTaskId(taskId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna no encontrada"));
        if(columnId == null) return false;

        return hasColumnPermission(username, columnId, role);
    }

}