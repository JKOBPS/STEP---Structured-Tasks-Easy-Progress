package com.step_app_jacob.step_app.modules.projects.controller;


import com.step_app_jacob.step_app.modules.membership.dto.ProjectMembershipResponseDTO;
import com.step_app_jacob.step_app.modules.membership.dto.ProjectMembershipMapper;
import com.step_app_jacob.step_app.modules.membership.repository.ProjectMembershipRepository;

import com.step_app_jacob.step_app.modules.membership.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.step_app_jacob.step_app.modules.membership.dto.UpdateMemberRoleDto;
import com.step_app_jacob.step_app.modules.projects.dto.projectdtos.ProjectRequestDto;
import com.step_app_jacob.step_app.modules.projects.dto.projectdtos.ProjectResponseDto;
import com.step_app_jacob.step_app.modules.projects.service.ProjectService;
import com.step_app_jacob.step_app.security.entity.CustomUserDetails;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @Autowired
    ProjectMembershipRepository projectMembershipRepository;
    @Autowired
    MembershipService membershipService;

    //READ---------------------
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Page<ProjectResponseDto>> getAllProjects(
            @RequestParam(defaultValue = "ALL") String role,
            @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(projectService.findAllProjectsWithRole(role, pageable));
    }

    @GetMapping("/search/name/{name}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Page<ProjectResponseDto>> getAllByNameProject(
            @PathVariable String name,
            @RequestParam(defaultValue = "ALL") String role,
            @PageableDefault(size = 12, page = 0, sort = "createdAt", direction = Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(projectService.findAllProjectsByNameAndRole(name, role, pageable));
    }

    //No usado en UI por ahora
    @GetMapping("/search/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ProjectResponseDto> getByIdProject(@PathVariable Long id) {

        return new ResponseEntity<>(projectService.findByIdProject(id), HttpStatus.OK);
    }

    //Encontrar los miembros de x proyecto
    @GetMapping("/search/{projectId}/members")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<ProjectMembershipResponseDTO>> getProjectMembers(@PathVariable Long projectId){
        return new ResponseEntity<>(membershipService.getProjectMembers(projectId),
                HttpStatus.OK);
    }

    //CREATE--------------------
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ProjectResponseDto> createProject(@Valid @RequestBody ProjectRequestDto project, @AuthenticationPrincipal CustomUserDetails currentUser) {
        return new ResponseEntity<>(projectService.saveProject(project, currentUser), HttpStatus.OK);
    }

    //UPDATE--------------------
    //solo owner o admin
    @PutMapping("/update/{id}")
    @PreAuthorize("@projectSecurity.hasProjectPermission(authentication.name, #id, 'OWNER') or hasRole('ADMIN')")
    public ResponseEntity<ProjectResponseDto> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequestDto project){
     return new ResponseEntity<>(projectService.updateProject(id, project), HttpStatus.OK);
    }
    
    //Cambiar rol de miembro del proyecto, solo owner o admin
    @PatchMapping("/update/{id}/{userId}")
    @PreAuthorize("@projectSecurity.hasProjectPermission(authentication.name, #id, 'OWNER') or hasRole('ADMIN')")
    public ResponseEntity<ProjectResponseDto> updateProjectMember(@PathVariable Long id, @PathVariable Long userId, @RequestBody UpdateMemberRoleDto newRole) {
        return new ResponseEntity<>(projectService.updateProjectMember(id, userId, newRole.getRole()), HttpStatus.OK);
    }

    //elimina a usuario del proyecto, solo owner o admin
    @PutMapping("/update/{projectId}/remove_member/{memberId}")
    @PreAuthorize("@projectSecurity.hasProjectPermission(authentication.name, #projectId, 'OWNER') or hasRole('ADMIN')")
    public ResponseEntity<ProjectResponseDto> removeMemberFromProject(@PathVariable Long projectId, @PathVariable Long memberId) {
        return new ResponseEntity<>(projectService.deleteProjectMember(projectId, memberId), HttpStatus.OK);
    }

    //DELETE-------------------
    //solo owner o admin
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("@projectSecurity.hasProjectPermission(authentication.name, #id, 'OWNER') or hasRole('ADMIN')")
    public ResponseEntity<ProjectResponseDto> deleteProject(@PathVariable Long id){
        return new ResponseEntity<>(projectService.deleteProject(id), HttpStatus.OK);
    }

    
}

