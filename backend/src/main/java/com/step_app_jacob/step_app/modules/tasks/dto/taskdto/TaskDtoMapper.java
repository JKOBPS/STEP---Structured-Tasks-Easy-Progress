package com.step_app_jacob.step_app.modules.tasks.dto.taskdto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.step_app_jacob.step_app.modules.tasks.entity.Task;
import com.step_app_jacob.step_app.modules.users.entity.User;

public class TaskDtoMapper {

    public static TaskResponseDto toDto(Task task) {

        if(task == null) {
            return null;
        }

        //Forma correcta ya que antes fallaba si intentabas hacer toString de un null
        String fechaFormateada = Optional.ofNullable(task.getDueDate())
        .map(LocalDate::toString)
        .orElse(null);

        //Permite recoger null, o el usuario
        Long userAssigned = Optional.ofNullable(task.getAssignedTo())
        .map(User::getId)
        .orElse(null);

        return new TaskResponseDto(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getPriority().toString(),
            fechaFormateada,
            userAssigned,
            task.getColumn().getId(),
            task.getPercentage()
        );
    }

    public static List<TaskResponseDto> toDtoList(List<Task> tasks) {
        return tasks.stream().map(TaskDtoMapper::toDto).toList();
    }

}
