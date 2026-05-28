package com.step_app_jacob.step_app.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.step_app_jacob.step_app.modules.users.repository.UserRepository;

@Service("userSecurity")
public class UserSecurityService {

    @Autowired
    UserRepository userRepository;

    public boolean isSelf(Long userId, String authUserName) {
        return userRepository.findById(userId)
                .map(user -> user.getUsername().equals(authUserName))
                .orElse(false);
    }

}
