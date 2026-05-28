package com.step_app_jacob.step_app;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashTest {
    @Test
    public void printHash() {
        System.out.println("HASH_123456: " + new BCryptPasswordEncoder().encode("123456"));
    }
}
