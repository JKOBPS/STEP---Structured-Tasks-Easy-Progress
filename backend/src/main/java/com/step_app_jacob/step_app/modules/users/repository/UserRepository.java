package com.step_app_jacob.step_app.modules.users.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.step_app_jacob.step_app.modules.users.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER (:username)")
    public List<User> findAllByUsername(@Param("username") String username);

    public Optional<User> findByUsername(String username);
}
