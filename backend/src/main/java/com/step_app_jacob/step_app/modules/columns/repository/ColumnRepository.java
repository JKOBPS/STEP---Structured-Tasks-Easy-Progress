package com.step_app_jacob.step_app.modules.columns.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.step_app_jacob.step_app.modules.columns.entity.ColumnEntity;

public interface ColumnRepository extends JpaRepository<ColumnEntity, Long>{

    public int countByProjectId(Long projectId);

    List<ColumnEntity> findByProject_Id(Long projectId);

    @Query("SELECT c FROM ColumnEntity c JOIN c.project p JOIN p.memberships u WHERE u.id = :userId")
    List<ColumnEntity> findAllByUserId(@Param("userId") Long userId);

    //Busca todas las columnas de los proyectos donde se encuentra el usuario
    @Query("SELECT c FROM ColumnEntity c " +
           "JOIN c.project p " +
           "JOIN p.memberships m " +
           "WHERE m.user.username = :name")
    List<ColumnEntity> findAllByUserName(@Param("name") String name);

    //Filtra por columna id si el usuario pertenece al proyecto donde se encuentra la columna
    @Query("SELECT c FROM ColumnEntity c " +
       "JOIN c.project p " +
       "JOIN p.memberships m " +
       "WHERE m.user.username = :username " + 
       "AND c.id = :columnId")                
    Optional<ColumnEntity> findByIdAndUserName(
        @Param("columnId") Long columnId, 
        @Param("username") String username
    );

    @Query("SELECT c.project.id FROM ColumnEntity c WHERE c.id = :columnId")
    Long findProjectIdByColumnId(@Param("columnId") Long columnId);
    

}
