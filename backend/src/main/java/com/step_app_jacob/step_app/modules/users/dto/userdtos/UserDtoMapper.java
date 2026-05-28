package com.step_app_jacob.step_app.modules.users.dto.userdtos;

import java.util.Set;
import java.util.stream.Collectors;

import com.step_app_jacob.step_app.modules.users.entity.User;

public class UserDtoMapper {

    public static UserResponseDto toDto(User user){
        if(user == null){
            return null;
        }
        return new UserResponseDto(
            user.getId(),
            user.getUsername(),
            user.getEmail()
        );
    }

    public static Set<UserResponseDto> toDtoSet(Set<User> users){
        return users.stream().map(UserDtoMapper::toDto).collect(Collectors.toSet());
    }

}
