package com.step_app_jacob.step_app.security.service;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.step_app_jacob.step_app.modules.users.entity.User;
import com.step_app_jacob.step_app.modules.users.repository.UserRepository;
import com.step_app_jacob.step_app.security.entity.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService{

    final UserRepository userRepository;

    CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*Al tener Spring Security en el proyecto busca un usuario default que está authorizado,
    en esta clase le decimos (con la implementación y la notificación) que no use ese user y que use el nuestro
    se busca el usuario en la BBDD por su username (compara la contraseña con BCrypt) y lo transforma en un UserDetails de spring security
    permitiendo que spring security use mis usuarios para gestionar la autenticación y autorización
    */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con username: " + username));
        
        List<GrantedAuthority> authorities = List.of(
            new SimpleGrantedAuthority("ROLE_" + user.getRole())
        );

        return new CustomUserDetails(user.getId(), user.getUsername(), user.getPassword(), authorities);
    }

}
