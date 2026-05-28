package com.step_app_jacob.step_app.modules.membership.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMembershipResponseDTO {

    private Long projectId;
    private Long userId;
    private String role;
    private String username;

}
