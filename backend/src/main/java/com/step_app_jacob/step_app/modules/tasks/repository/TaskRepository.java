package com.step_app_jacob.step_app.modules.tasks.repository;

import java.util.List;

import com.step_app_jacob.step_app.modules.columns.entity.ColumnEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.step_app_jacob.step_app.modules.tasks.entity.Task;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long>{


    @Query("SELECT t FROM Task t WHERE t.column.project.id = :projectId")
    List<Task> findTasksByProjectId(@Param("projectId") Long projectId);

    List<Task> findAllByAndAssignedTo_Username(String username);

    Optional<Task> findByIdAndAssignedTo_Username(Long id, String username);

    @Query("SELECT t FROM Task t WHERE LOWER(t.title) LIKE LOWER (CONCAT('%', :name, '%')) AND t.assignedTo.username = :username")
    public List<Task> findByTitleAndUsername(@Param("name") String name, @Param("username") String username);

    @Query("SELECT t.column.id FROM Task t WHERE t.id = :taskId")
    Optional<Long> findColumnIdByTaskId(@Param("taskId")Long taskId);
    
}
