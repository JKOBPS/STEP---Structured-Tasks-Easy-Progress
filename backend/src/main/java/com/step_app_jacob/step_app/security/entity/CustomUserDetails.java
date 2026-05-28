package com.step_app_jacob.step_app.security.entity;

import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {
    private Long id;

    public CustomUserDetails(Long id, String username, String password, java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.id = id;
    }

    public Long getId() {
        return id;
    }

}
