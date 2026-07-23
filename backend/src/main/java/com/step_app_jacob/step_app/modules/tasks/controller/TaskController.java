package com.step_app_jacob.step_app.modules.tasks.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskRequestDto;
import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskResponseDto;
import com.step_app_jacob.step_app.modules.tasks.service.TaskService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    //READ
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TaskResponseDto>> getAllTasks(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(taskService.findAllTasksWithUsername(user),HttpStatus.OK);
    }

    @GetMapping("/search/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<TaskResponseDto> getTaskById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(taskService.findTaskByIdWithUsername(id, user), HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TaskResponseDto>> getTaskByTitle(@PathVariable String name, @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(taskService.findTaskByTitleWithUsername(name, user), HttpStatus.OK);
    }

    @GetMapping("/search/project/{projectId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<TaskResponseDto>> getTaskByProjectId(@PathVariable Long projectId,
                                                                    @AuthenticationPrincipal User user) {
        //Revisar si necesito mi user, para authenticación, TODO hacer pruebas de seguridad...
        return new ResponseEntity<>(taskService.findTaskByProjectId(projectId, user), HttpStatus.OK);
    }

    //CREATE
    @PostMapping("/create")
    @PreAuthorize("@projectSecurity.hasColumnPermission(authentication.name, #taskDto.assignedToColumnId, 'MEMBER') or hasRole('ADMIN')")
    public ResponseEntity<TaskResponseDto> createTask(@Valid @RequestBody TaskRequestDto taskDto) {
        return new ResponseEntity<>(taskService.saveTask(taskDto), HttpStatus.CREATED);
    }
    

    //UPDATE
    @Transactional
    @PutMapping("/update/{id}")
    @PreAuthorize("@projectSecurity.hasColumnPermission(authentication.name, #newTask.assignedToColumnId, 'MEMBER') or hasRole('ADMIN')")
    public ResponseEntity<TaskResponseDto> updateTasktById(@PathVariable Long id, @Valid @RequestBody TaskRequestDto newTask){
        return new ResponseEntity<>(taskService.updateTaskById(id, newTask), HttpStatus.OK);
    }

    //DELETE
    @Transactional
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("@projectSecurity.hasTaskPermission(authentication.name, #id, 'OWNER') or hasRole('ADMIN')")
    public ResponseEntity<TaskResponseDto> deleteTaskById(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.deleteTaskById(id), HttpStatus.OK);
    }
}
