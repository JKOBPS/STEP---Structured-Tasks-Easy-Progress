package com.step_app_jacob.step_app.modules.membership.service;

import com.step_app_jacob.step_app.modules.membership.dto.ProjectMembershipResponseDTO;
import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;
import com.step_app_jacob.step_app.modules.membership.repository.ProjectMembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MembershipService {

    @Autowired
    ProjectMembershipRepository membershipRepository;

    public List<ProjectMembershipResponseDTO> getProjectMembers(Long projectId) {

        List<ProjectMembership> memberships = membershipRepository.findMembershipsWithUserByProjectId(projectId);

        return memberships.stream().map(membership -> {
            ProjectMembershipResponseDTO dto = new ProjectMembershipResponseDTO();
            dto.setUserId(membership.getUser().getId());
            dto.setProjectId(membership.getProject().getId());
            dto.setRole(membership.getRole().name()); // O como tengas definido el rol

            dto.setUsername(membership.getUser().getUsername());

            return dto;
        }).collect(Collectors.toList());
    }
}
