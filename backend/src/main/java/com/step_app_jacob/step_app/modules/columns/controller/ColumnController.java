package com.step_app_jacob.step_app.modules.columns.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.step_app_jacob.step_app.modules.columns.dto.ColumnRequestDto;
import com.step_app_jacob.step_app.modules.columns.dto.ColumnResponseDto;
import com.step_app_jacob.step_app.modules.columns.service.ColumnService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/columns")
public class ColumnController {

    @Autowired
    ColumnService columnService;

    //READ
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<ColumnResponseDto> getAllColumns(@AuthenticationPrincipal User user) {
        return columnService.getAllColumns(user);
    }

    //Columnas por ID de Proyecto
    @GetMapping("/search/project/{projectId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<ColumnResponseDto>> getColumnsByProject(@PathVariable Long projectId) {

        return new ResponseEntity<>(columnService.findColumnsByProjectId(projectId), HttpStatus.OK);

    }

    @GetMapping("/search/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ColumnResponseDto getColumnById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return columnService.getColumnByIdAndUsername(id, user);
    }

    //CREATE
    @PostMapping("/create")
    @PreAuthorize("@projectSecurity.hasProjectPermission(authentication.name, #column.projectId, 'OWNER') or hasRole('ADMIN')")
    public ColumnResponseDto createColumn(@Valid @RequestBody ColumnRequestDto column) {
        return columnService.saveColumn(column);
    }
    
    //UPDATE
    @PutMapping("/update/{id}")
    @PreAuthorize("@projectSecurity.hasProjectPermission(authentication.name, #column.projectId, 'MEMBER') or hasRole('ADMIN')")
    public ColumnResponseDto updateColumn(@PathVariable Long id, @Valid @RequestBody ColumnRequestDto column) {
        return columnService.updateColumn(id, column);
    }

    //DELETE
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("@projectSecurity.hasColumnPermission(authentication.name, #id, 'OWNER') or hasRole('ADMIN')")
    public ColumnResponseDto deleteColumn(@PathVariable Long id) {
        return columnService.deleteColumn(id);
    }

}
