package com.step_app_jacob.step_app.modules.projects.repository;


import com.step_app_jacob.step_app.modules.enums.ProjectRoles;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.step_app_jacob.step_app.modules.projects.entity.Project;

import java.util.Optional;


public interface ProjectRepository extends JpaRepository<Project, Long>{
    
    public Optional<Project> findById(Long id); 

    @Query("SELECT DISTINCT p FROM Project p JOIN p.memberships m WHERE p.id = :id AND m.user.username = :username")
    public Optional<Project> findByIdContainingMemberShip(@Param("id") Long id, @Param("username") String username);

    public Page<Project> findAll(Pageable pageable);

    @Query("SELECT DISTINCT p FROM Project p JOIN p.memberships m WHERE m.user.username = :username AND m.role = :role")
    Page<Project> findAllByRole(@Param("role")ProjectRoles role, @Param("username")String username, Pageable pageable);
    
    @Query("SELECT DISTINCT p FROM Project p JOIN p.memberships m WHERE m.user.username = :username")
    Page<Project> findByMember(@Param("username") String username, Pageable pageable);

    @Query("SELECT p FROM Project p JOIN p.memberships m WHERE m.user.username = :username AND m.role = :role")
    Page<Project> findByMemberAndRole(
            @Param("username") String username,
            @Param("role") ProjectRoles role,
            Pageable pageable
    );

    @Query("SELECT DISTINCT p FROM Project p WHERE LOWER(p.name) LIKE LOWER( :name)")
    Page<Project> findByNameContaining(String name, Pageable pageable);

    @Query("SELECT p FROM Project p JOIN p.memberships m WHERE p.name LIKE %:queryName% AND m.user.username = :username AND m.role = :role")
    Page<Project> findByNameContainingAndMemberAndRole(
            @Param("queryName") String queryName,
            @Param("username") String username,
            @Param("role") ProjectRoles role,
            Pageable pageable
    );

    @Query("SELECT DISTINCT p FROM Project p JOIN p.memberships m WHERE LOWER(p.name) LIKE LOWER( :name) AND m.user.username = :username")
    Page<Project> findByNameContainingMemberShip(@Param("name") String name, @Param("username") String username, Pageable pageable);

}
