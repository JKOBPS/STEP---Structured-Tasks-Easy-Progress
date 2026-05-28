package com.step_app_jacob.step_app.modules.columns.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColumnRequestDto {

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 1, max = 50, message = "El nombre debe tener entre 1 y 50 caracteres")    
    private String name;

    @NotNull(message = "El id del proyecto no puede ser nulo")
    @Min(value = 1, message = "El id del proyecto debe ser mayor o igual a 1")
    private Long projectId;

}
