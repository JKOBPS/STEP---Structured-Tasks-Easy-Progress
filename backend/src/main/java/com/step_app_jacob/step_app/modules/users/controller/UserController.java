package com.step_app_jacob.step_app.modules.users.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.step_app_jacob.step_app.modules.users.dto.userdtos.UserRequestDto;
import com.step_app_jacob.step_app.modules.users.dto.userdtos.UserResponseDto;
import com.step_app_jacob.step_app.modules.users.service.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    //READ
    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponseDto> getUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/search/id/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id){
        UserResponseDto userOptional = userService.findByIdUser(id);
        return new ResponseEntity<>(userOptional, HttpStatus.OK);
    }

    @GetMapping("/search/name/{name}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<UserResponseDto>> getUserByName(@PathVariable String name) {
        List<UserResponseDto> userOptional = userService.findUserByUsername(name);
        return new ResponseEntity<>(userOptional, HttpStatus.OK);
    }

    //UPDATE
    @PutMapping("/update/{id}")
    @PreAuthorize("@userSecurity.isSelf(#id, authentication.name) or hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequestDto user) {
        return new ResponseEntity<>(userService.updateUser(id, user), HttpStatus.OK);
    }

    //DELETE
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponseDto> deleteUserById (@PathVariable Long id) {
        return new ResponseEntity<>(userService.deleteUserById(id), HttpStatus.OK);
    }

}
