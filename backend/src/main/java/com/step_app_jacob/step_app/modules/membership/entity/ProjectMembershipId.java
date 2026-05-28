package com.step_app_jacob.step_app.modules.membership.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
//Id compuesta, convertible a bytes (Serializable) para viajar por la red/cache...
public class ProjectMembershipId implements Serializable { 
    private Long userId;
    private Long projectId;

}
