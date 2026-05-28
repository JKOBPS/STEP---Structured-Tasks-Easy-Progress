package com.step_app_jacob.step_app.modules.tasks.dto.taskdto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDto {

    @NotBlank(message = "Título no puede estar en blanco")
    @Size(max = 150, message = "Título no puede tener más de 150 caracteres")
    private String title;

    private String description;

    @NotBlank(message = "Prioridad no puede estar en blanco")
    @Builder.Default
    private String priority = "MEDIUM";

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    @Min(value = 0)
    @Max(value = 100)
    private int percentage;

    @NotNull(message = "El ID de la columna no puede ser nulo")
    @Min(value = 1, message = "El ID de la columna debe ser mayor o igual a 1")
    private Long assignedToColumnId;

    @Min(value = 1, message = "El ID del usuario asignado debe ser mayor o igual a 1")
    private Long assignedToUserId;
}
