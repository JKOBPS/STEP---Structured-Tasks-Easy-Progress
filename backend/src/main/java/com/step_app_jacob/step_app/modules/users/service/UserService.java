package com.step_app_jacob.step_app.modules.users.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.step_app_jacob.step_app.modules.enums.GlobalRoles;
import com.step_app_jacob.step_app.modules.enums.ProjectRoles;
import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;
import com.step_app_jacob.step_app.modules.membership.repository.ProjectMembershipRepository;
import com.step_app_jacob.step_app.modules.users.dto.userdtos.UserDtoMapper;
import com.step_app_jacob.step_app.modules.users.dto.userdtos.UserRequestDto;
import com.step_app_jacob.step_app.modules.users.dto.userdtos.UserResponseDto;
import com.step_app_jacob.step_app.modules.users.entity.User;
import com.step_app_jacob.step_app.modules.users.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectMembershipRepository projectMembershipService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //READS
    @Transactional(readOnly = true)
    public List<UserResponseDto> findAllUsers() {
        List<UserResponseDto> dtoList = new ArrayList<>();
        userRepository.findAll().stream().map(usr -> dtoList.add(UserDtoMapper.toDto(usr))).collect(Collectors.toList());
        return dtoList;
    }

    @Transactional(readOnly = true)
    public UserResponseDto findByIdUser(Long id) {
        Optional<User> userFound = userRepository.findById(id);
        return UserDtoMapper.toDto(userFound.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con ID: " + id)));
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> findUserByUsername(String name) {
        List<UserResponseDto> users = 
        userRepository.findAllByUsername('%'+name+'%')
        .stream()
        .map(usr -> UserDtoMapper.toDto(usr))
        .collect(Collectors.toList());
        return users;
    }

    //CREATE/SAVE
    @Transactional
    public UserResponseDto saveUser(UserRequestDto user) {
        User newUser = User.builder()
        .username(user.getUsername())
        .password(passwordEncoder.encode(user.getPassword()))
        .email(user.getEmail())
        .role(GlobalRoles.USER)
        .build();
        return UserDtoMapper.toDto(userRepository.save(newUser));
    }

    //UPDATE
    @Transactional
    public UserResponseDto updateUser(Long id, UserRequestDto user) {
        Optional<User> userFound = userRepository.findById(id);
        User oldUser = userFound.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con ID: " + id));

        oldUser.setUsername(user.getUsername());
        oldUser.setEmail(user.getEmail());
        oldUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return UserDtoMapper.toDto(userRepository.save(oldUser));
    }
      
    //DELETE
    @Transactional
    public UserResponseDto deleteUserById(Long id) {
        User userFound = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con ID: " + id));
        UserResponseDto userResponseDto = UserDtoMapper.toDto(userFound);
        
        //Borrar usuario de los proyectos donde es miembro
        Set<ProjectMembership> userProjects = userFound.getMemberships();
        for (ProjectMembership membership : userProjects) {
            if(membership.getRole()!= ProjectRoles.OWNER) {
                projectMembershipService.delete(membership);
                userFound.getMemberships().remove(membership);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede eliminar el usuario del proyecto con id: " + membership.getProject().getId() + ", porque es dueño del proyecto. Asigne otro dueño o elimine el proyecto antes de eliminar el usuario.");
            }
        }
        userRepository.delete(userFound);
        return userResponseDto;
    }

    @Transactional
    public UserResponseDto deleteByUser(User user) {
        //Borrar usuario de los proyectos donde es miembro
        Set<ProjectMembership> userProjects = user.getMemberships();
        for (ProjectMembership membership : userProjects) {
            projectMembershipService.delete(membership);
        }
        userRepository.delete(user);
        return UserDtoMapper.toDto(user);
    }
}
