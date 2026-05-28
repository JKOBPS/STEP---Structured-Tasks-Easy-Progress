package com.step_app_jacob.step_app.modules.projects.dto.projectdtos;

import java.time.Instant;
import java.util.List;
import java.util.Set;

import com.step_app_jacob.step_app.modules.columns.dto.ColumnResponseDto;
import com.step_app_jacob.step_app.modules.membership.dto.ProjectMembershipResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponseDto {

    Long projectId;
    String name;
    String description;
    Set<ProjectMembershipResponseDTO> memberships;
    List<ColumnResponseDto> columns;
    Instant createdAt;
}
