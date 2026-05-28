package com.step_app_jacob.step_app.modules.projects.service;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.step_app_jacob.step_app.modules.enums.GlobalRoles;
import com.step_app_jacob.step_app.modules.enums.ProjectRoles;
import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;
import com.step_app_jacob.step_app.modules.membership.repository.ProjectMembershipRepository;
import com.step_app_jacob.step_app.modules.projects.dto.projectdtos.ProjectDtoMapper;
import com.step_app_jacob.step_app.modules.projects.dto.projectdtos.ProjectRequestDto;
import com.step_app_jacob.step_app.modules.projects.dto.projectdtos.ProjectResponseDto;
import com.step_app_jacob.step_app.modules.projects.entity.Project;
import com.step_app_jacob.step_app.modules.projects.repository.ProjectRepository;
import com.step_app_jacob.step_app.modules.users.entity.User;
import com.step_app_jacob.step_app.modules.users.repository.UserRepository;
import com.step_app_jacob.step_app.security.entity.CustomUserDetails;



@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProjectMembershipRepository projectMembershipRepository;

    //READ------------------LA MAYORÍA DE READS, TE ENCONTRARÁ SOLO LOS PROYECTOS EN LOS QUE USER ES MIEMBRO!

    @Transactional
    public Project findById(Long id) {
        return projectRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado con ID: " + id));
    }

    @Transactional
    public ProjectResponseDto findByIdProject(Long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String currentUsername = auth.getName();
        Optional<Project> projectOpt = projectRepository.findByIdContainingMemberShip(id, currentUsername);

        if (!projectOpt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no es miembro del proyecto con ID: " + id);
        }

        return ProjectDtoMapper.projectToDto(projectOpt.get());
    }

     //**FILTRAR POR DONDE ES MIEMBRO EL USER** - TODOS LOS PROYECTOS, O TODOS EN LOS QUE ES MIEMBRO EL USER
    @Transactional(readOnly = true)
    public Page<ProjectResponseDto> findAllProjects(Pageable pageable) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return projectRepository.findAll(pageable).map(ProjectDtoMapper::projectToDto);
        } else 
            return projectRepository.findByMember(currentUsername, pageable).map(ProjectDtoMapper::projectToDto);
        }

    // **BUSCA CON O SIN FILTRO POR ROL DE PROYECTO **
    @Transactional(readOnly = true)
    public Page<ProjectResponseDto> findAllProjectsWithRole(String roleString, Pageable pageable) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));


        //Siendo admin ejecuta este
        if (isAdmin && "ALL".equalsIgnoreCase(roleString)) {
            return projectRepository.findAll(pageable).map(ProjectDtoMapper::projectToDto);
        } else if (isAdmin) {
            ProjectRoles roleEnum = ProjectRoles.valueOf(roleString.toUpperCase());
            return projectRepository.findAllByRole(roleEnum, currentUsername, pageable).map(ProjectDtoMapper::projectToDto);
        }

        //Si no es admin usa uno u otro depende del "role" de la membresía
        if("ALL".equalsIgnoreCase(roleString)) {
            return projectRepository.findByMember(currentUsername, pageable).map(ProjectDtoMapper::projectToDto);
        } else {
            ProjectRoles roleEnum = ProjectRoles.valueOf(roleString.toUpperCase());
            return projectRepository.findByMemberAndRole(currentUsername, roleEnum, pageable).map(ProjectDtoMapper::projectToDto);
        }
    }


    // ** 2. FILTRADO POR MEMBRESÍA DE USER, NOMBRE DE PROYECTO Y POR ROL **
    @Transactional(readOnly = true)
    public Page<ProjectResponseDto> findAllProjectsByNameAndRole(String queryName, String roleString, Pageable pageable) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return projectRepository.findByNameContaining("%" + queryName + "%", pageable).map(ProjectDtoMapper::projectToDto);
        }

        if ("ALL".equalsIgnoreCase(roleString)) {
            return projectRepository.findByNameContainingMemberShip("%" + queryName + "%", currentUsername, pageable).map(ProjectDtoMapper::projectToDto);
        } else {
            // Usamos tu Enum ProjectRoles (plural)
            ProjectRoles roleEnum = ProjectRoles.valueOf(roleString.toUpperCase());
            return projectRepository.findByNameContainingAndMemberAndRole(queryName, currentUsername, roleEnum, pageable).map(ProjectDtoMapper::projectToDto);
        }
    }
    

    //**FILTRADO** POR NOMBRE - TODOS LOS PROYECTOS QUE COINCIDAN CON EL NOMBRE, O EN LOS QUE ES MIEMBRO EL USER
    @Transactional(readOnly = true)
    public Page<ProjectResponseDto> findAllProjects(String queryName, Pageable pageable) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String currentUsername = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return projectRepository.findByNameContaining("%" + queryName + "%", pageable).map(ProjectDtoMapper::projectToDto);
        } else {
            return projectRepository.findByNameContainingMemberShip("%" + queryName + "%", currentUsername, pageable).map(ProjectDtoMapper::projectToDto);
        }
    }


    //SAVE------------------
    @Transactional 
    public ProjectResponseDto saveProject(ProjectRequestDto project, CustomUserDetails currentUser) {

        Project projectToCreate = new Project();

        Set<User> members = project.getMembers().stream().map(memberId -> userRepository.findById(memberId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con id: " + memberId))).collect(Collectors.toSet());

        projectToCreate.setName(project.getName());
        projectToCreate.setDescription(project.getDescription());
        projectToCreate.setCreatedAt(Instant.now());

        projectToCreate.addMember(userRepository.findById(currentUser.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Error al obtener la id del usuario autenticado")), ProjectRoles.OWNER);

        for (User user : members) {
            if (!user.getId().equals(currentUser.getId())) {
                projectToCreate.addMember(user, ProjectRoles.VIEWER);
            }
        }

        return ProjectDtoMapper.projectToDto(projectRepository.save(projectToCreate));
    }
    //Actualiza sólo, nombre, descripción, y nuevos miembros
    @Transactional
    public ProjectResponseDto updateProject(Long id, ProjectRequestDto updateProjectDto) {

        Project oldProject = projectRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado con ID: " + id));

        Set<User> newMembers = updateProjectDto.getMembers()
                .stream()
                .map(memberId -> userRepository.findById(memberId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Error: Uno o más miembros que intenta asignar no existen")))
                .collect(Collectors.toSet());

        oldProject.setName(updateProjectDto.getName());
        oldProject.setDescription(updateProjectDto.getDescription());

        for (User user : newMembers) {
            Optional<ProjectMembership> projectMembership = projectMembershipRepository.findByUserIdAndProjectId(user.getId(), oldProject.getId());

            if(projectMembership.isPresent()) {
                oldProject.addMember(user, projectMembership.get().getRole());
            }else {
                oldProject.addMember(user, ProjectRoles.VIEWER);
            }
        }

        return ProjectDtoMapper.projectToDto(projectRepository.save(oldProject));
    }
    //UPDATE------------------



    @Transactional
    public ProjectResponseDto updateProjectMember(Long projectId, Long memberId, ProjectRoles newRole) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByUsername(auth.getName())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario autenticado no encontrado"));
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado con ID: " + projectId));   

        //Membership del usuario a actualizar
        ProjectMembership newUserMembership = projectMembershipRepository.findByUserIdAndProjectId(memberId, projectId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El miembro con ID: " + memberId + " no pertenece al proyecto con ID: " + projectId));
        //Membership del usuario autenticado
        ProjectMembership currentUserMembership = projectMembershipRepository.findByUserIdAndProjectId(currentUser.getId(), projectId).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encuentran coincidencias"));
         
        //AL DARLE OWNER A OTRO MIEMBRO, PASAS A SER MEMBER (LO QUE HACE QUE SÓLO HAYA 1 OWNER)
        if(newRole == ProjectRoles.OWNER || currentUser.getRole() == GlobalRoles.ADMIN) {
            currentUserMembership.setRole(ProjectRoles.MEMBER);
            newUserMembership.setRole(newRole);
            projectMembershipRepository.save(newUserMembership);
            projectMembershipRepository.save(currentUserMembership);            
        }else {
            newUserMembership.setRole(newRole);
            projectMembershipRepository.save(newUserMembership);
        }

        return ProjectDtoMapper.projectToDto(projectRepository.save(project));
    }

    //DELETE------------------

    //Borra en cascada las columnas asociadas gracias al orphanRemoval = true en la entidad Project
    @Transactional
    public ProjectResponseDto deleteProject(Long id) {
        Optional<Project> projectOptional = projectRepository.findById(id);
        Project projectToDelete = projectOptional.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado con ID: " + id));
        projectRepository.delete(projectToDelete);
        return ProjectDtoMapper.projectToDto(projectToDelete);
    }

    //Borrar la tupla de la tabla intermedia project_memberships y remover el miembro de la lista de miembros del proyecto
    @Transactional
    public ProjectResponseDto deleteProjectMember(Long projectId, Long MemberId) {

        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado con ID: " + projectId));

        ProjectMembership newUserMembership = projectMembershipRepository.findByUserIdAndProjectId(MemberId, projectId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El miembro con ID: " + MemberId + " no pertenece al proyecto con ID: " + projectId));

        //Si intenta borrar al dueño del proyecto, lanza error
        if(newUserMembership.getRole() == ProjectRoles.OWNER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede eliminar al dueño del proyecto de sus miembros");
        }else {
            projectMembershipRepository.delete(newUserMembership);
            project.getMemberships().remove(newUserMembership);
        }
        
        return ProjectDtoMapper.projectToDto(projectRepository.save(project));
    }

}

//TODO - REVISAR LOS EXCEPTIONS Y STATUS CODES LANZADOS, ¿DEBERÍAN IR EN EL SERVICE?, PARECE QUE ENSUCIA MUCHO EL CÓDIGO
//Intentar usar la clase exceptionhandler personalizada