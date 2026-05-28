package com.step_app_jacob.step_app.modules.columns.dto;

import java.util.ArrayList;
import java.util.List;

import com.step_app_jacob.step_app.modules.columns.entity.ColumnEntity;
import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskDtoMapper;
import com.step_app_jacob.step_app.modules.tasks.dto.taskdto.TaskResponseDto;

public class ColumnDtoMapper {

    public static ColumnResponseDto toDto(ColumnEntity column) {
        
        if(column == null) {
            return null;
        }
        
        return new ColumnResponseDto(
            column.getId(),
            column.getName(),
            column.getProject().getId(),
            column.getTasks() != null ? TaskDtoMapper.toDtoList(column.getTasks()) : new ArrayList<TaskResponseDto>()
        );
    }

    public static List<ColumnResponseDto> toDtoList(List<ColumnEntity> columns) {
        if(columns == null) {
            return null;
        }
        return columns.stream().map(ColumnDtoMapper::toDto).toList();
    }
}
