package com.step_app_jacob.step_app.modules.projects.dto.projectdtos;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProjectRequestDto {

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 3, max = 100, message = "El nombre de proyecto debe tener entre 3 y 100 caracteres")
    private String name;

    @NotBlank(message = "La descripción no puede estar vacía")
    private String description;

    @Builder.Default
    private Set<Long> members = new HashSet<>();

    @Builder.Default
    private List<Long> columns = new ArrayList<>();

}
