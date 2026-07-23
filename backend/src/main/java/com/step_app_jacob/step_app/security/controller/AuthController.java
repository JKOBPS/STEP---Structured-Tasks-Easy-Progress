package com.step_app_jacob.step_app.security.controller;

import com.step_app_jacob.step_app.modules.users.dto.userdtos.UserRequestDto;
import com.step_app_jacob.step_app.modules.users.dto.userdtos.UserResponseDto;
import com.step_app_jacob.step_app.modules.users.entity.User;
import com.step_app_jacob.step_app.modules.users.repository.UserRepository;
import com.step_app_jacob.step_app.modules.users.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.step_app_jacob.step_app.security.dto.AuthResponseDto;
import com.step_app_jacob.step_app.security.dto.LoginRequestDto;
import com.step_app_jacob.step_app.security.jwt.JwtService;
import com.step_app_jacob.step_app.security.service.CustomUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final CustomUserDetailsService userDetailsService;

    private final JwtService jwtService;

    private final UserService userService;

    AuthController(UserRepository userRepository, AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService, JwtService jwtService, UserService userService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtService.generateToken(user);

        User myUser = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(new AuthResponseDto(token, myUser.getId(), myUser.getUsername()));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody(required = true) UserRequestDto user) {
        UserResponseDto userSaved = userService.saveUser(user);
        return new ResponseEntity<>(userSaved, HttpStatus.CREATED);
    }
}
