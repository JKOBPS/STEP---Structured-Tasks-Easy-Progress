package com.step_app_jacob.step_app.modules.columns.dto;

import java.util.List;

import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColumnResponseDto {
    
    private Long columnId;
    private String name;
    private Long assignedToProjectId;
    private List<TaskResponseDto> tasks;

}
