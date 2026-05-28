package com.step_app_jacob.step_app.modules.users.entity;

import java.util.HashSet;
import java.util.Set;

import com.step_app_jacob.step_app.modules.enums.GlobalRoles;
import com.step_app_jacob.step_app.modules.membership.entity.ProjectMembership;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private GlobalRoles role = GlobalRoles.USER;

    //Relación con projectos mediante ProjectMembership tabla intermedia
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjectMembership> memberships;

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    //Builder constructor and methods
    private User(UserBuilder builder) {
        this.id = builder.id;
        this.username = builder.username;
        this.password = builder.password;
        this.email = builder.email;
        this.role = builder.role == null ? GlobalRoles.USER : builder.role;
        this.memberships = builder.memberships == null ? new HashSet<>() : builder.memberships;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    //Clase anidada para el patron builder
    public static class UserBuilder {
     
        private Long id;
        private String username;
        private String password;
        private String email;
        private GlobalRoles role;
        private Set<ProjectMembership> memberships;

        public UserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder username(String username) {
            this.username = username;
            return this;
        }
        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }
        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }
        public UserBuilder role(GlobalRoles role) {
            this.role = role;
            return this;
        }
        public UserBuilder memberships(Set<ProjectMembership> memberships) {
            this.memberships = memberships;
            return this;
        }
        public User build() {
        // Opcional: Validación aquí, por ejemplo:
        if (username == null || password == null || email == null) {
            throw new IllegalStateException("Username, password, y email son campos requeridos.");
        }
        return new User(this);
    }
        
    }
    
}
