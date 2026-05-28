package com.step_app_jacob.step_app.modules.projects.dto.projectdtos;

import com.step_app_jacob.step_app.modules.columns.dto.ColumnDtoMapper;
import com.step_app_jacob.step_app.modules.membership.dto.ProjectMembershipMapper;
import com.step_app_jacob.step_app.modules.projects.entity.Project;

public class ProjectDtoMapper {

    public static ProjectResponseDto projectToDto(Project project) {

        if(project == null) {
            return null;
        }

        return new ProjectResponseDto(
            project.getId(),
            project.getName(),
            project.getDescription(),
            ProjectMembershipMapper.toDtoSet(project.getMemberships()),
            ColumnDtoMapper.toDtoList(project.getColumns()),
            project.getCreatedAt()
        );

    }
}
