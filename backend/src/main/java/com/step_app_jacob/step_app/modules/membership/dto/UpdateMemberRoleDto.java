package com.step_app_jacob.step_app.modules.membership.dto;

import com.step_app_jacob.step_app.modules.enums.ProjectRoles;

public class UpdateMemberRoleDto {

    public ProjectRoles role;
    
    public ProjectRoles getRole() {
        return role;
    }
    public void setRole(ProjectRoles role) {
        this.role = role;
    }

}
