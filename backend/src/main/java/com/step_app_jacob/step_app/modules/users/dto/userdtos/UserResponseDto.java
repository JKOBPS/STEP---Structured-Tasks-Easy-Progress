package com.step_app_jacob.step_app.modules.users.dto.userdtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    Long userId;
    private String username;
    private String email;

}
