package com.step_app_jacob.step_app.modules.users.dto.userdtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    @Size(min = 3, max = 30, message = "El nombre de usuario debe tener entre 3 y 20 caracteres")
    private String username;
    
    @Email(message = "El email debe ser válido")
    @Size(min = 5, max = 254, message = "El email no puede tener más de 254 caracteres")
    private String email;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 6, max = 255, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;


}
