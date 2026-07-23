package com.step_app_jacob.step_app.modules.membership.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;


import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;
import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembershipId;

public interface ProjectMembershipRepository extends JpaRepository<ProjectMembership, ProjectMembershipId> {

    Optional<ProjectMembership> findByUserId(Long userId);

    Optional<List<ProjectMembership>> findByProjectId(Long id);

    Optional<ProjectMembership> findByUserIdAndProjectId(Long userId, Long projectId);

    @Query("SELECT pm FROM ProjectMembership pm JOIN FETCH pm.user WHERE pm.project.id = :projectId")
    List<ProjectMembership> findMembershipsWithUserByProjectId(@Param("projectId") Long projectId);
}
