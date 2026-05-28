package com.step_app_jacob.step_app.modules.membership.entity;


import com.step_app_jacob.step_app.modules.enums.ProjectRoles;
import com.step_app_jacob.step_app.modules.projects.entity.Project;
import com.step_app_jacob.step_app.modules.users.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "project_memberships")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMembership {

    @EmbeddedId
    @Builder.Default
    private ProjectMembershipId id = new ProjectMembershipId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Include
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private Project project;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectRoles role = ProjectRoles.VIEWER;

    @Override
    public String toString() {
        return "ProjectMembership(role=" + role + ")";
    }
}