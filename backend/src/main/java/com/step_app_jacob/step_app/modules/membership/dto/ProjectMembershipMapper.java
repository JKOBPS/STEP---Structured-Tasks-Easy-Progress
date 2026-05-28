package com.step_app_jacob.step_app.modules.membership.dto;

import org.springframework.stereotype.Component;

import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class ProjectMembershipMapper {

    public static ProjectMembershipResponseDTO toDto(ProjectMembership entity) {
        if (entity == null) {
            return null;
        }

        ProjectMembershipResponseDTO dto = new ProjectMembershipResponseDTO();
        dto.setUserId(entity.getId().getUserId());
        dto.setProjectId(entity.getId().getProjectId());
        
        if (entity.getRole() != null) {
            dto.setRole(entity.getRole().name());
        }

        return dto;
    }

    //LIST
    public static List<ProjectMembershipResponseDTO> toDtoList(List<ProjectMembership> entities) {
        if (entities == null) {
            return List.of();
        }
        List<ProjectMembershipResponseDTO> dtoMembersList = new ArrayList<>();
        for(ProjectMembership pMembership : entities) {
            dtoMembersList.add(toDto(pMembership));
        }

        return dtoMembersList;
    }

    //SET
    public static Set<ProjectMembershipResponseDTO> toDtoSet(Set<ProjectMembership> entities) {
        if (entities == null) {
            return Set.of();
        }
        Set<ProjectMembershipResponseDTO> dtoMembersSet = new HashSet<>();
        for(ProjectMembership pMembership : entities) {
            dtoMembersSet.add(toDto(pMembership));
        }

        return dtoMembersSet;
    }
}
