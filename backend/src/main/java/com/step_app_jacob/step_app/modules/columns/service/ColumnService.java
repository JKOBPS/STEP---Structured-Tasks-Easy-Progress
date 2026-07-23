package com.step_app_jacob.step_app.modules.columns.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.step_app_jacob.step_app.modules.columns.dto.ColumnDtoMapper;
import com.step_app_jacob.step_app.modules.columns.dto.ColumnRequestDto;
import com.step_app_jacob.step_app.modules.columns.dto.ColumnResponseDto;
import com.step_app_jacob.step_app.modules.columns.entity.ColumnEntity;
import com.step_app_jacob.step_app.modules.columns.repository.ColumnRepository;
import com.step_app_jacob.step_app.modules.projects.entity.Project;
import com.step_app_jacob.step_app.modules.projects.repository.ProjectRepository;


@Service
public class ColumnService {

    private final ColumnRepository columnRepository;
    private final ProjectRepository projectRepository;

    ColumnService(ColumnRepository columnRepository, ProjectRepository projectRepository) {
        this.columnRepository = columnRepository;
        this.projectRepository = projectRepository;
    }

    //READ---------------
    @Transactional(readOnly = true) //getAll
    public List<ColumnResponseDto> getAllColumns() {
        return columnRepository.findAll().stream().map(col -> ColumnDtoMapper.toDto(col)).toList();
    }

    @Transactional(readOnly = true)
    public List<ColumnResponseDto> findColumnsByProjectId(Long projectId) {

        List<ColumnEntity> columns = columnRepository.findByProject_Id(projectId);

        return columns.stream()
                .map(ColumnDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true) //getAll por nombre del user
    public List<ColumnResponseDto> getAllColumns(User user) {
    
        //Si es admin findAll normal
        if(user.getAuthorities().stream()
            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))){
                return ColumnDtoMapper.toDtoList(columnRepository.findAll());
        }
        //Si no que filtre all por username
        return ColumnDtoMapper.toDtoList(columnRepository.findAllByUserName(user.getUsername()));
    }

    @Transactional(readOnly = true)//Get por Id
    public ColumnResponseDto getColumnById(Long id) {
        ColumnEntity column = columnRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna no encontrada"));
        return ColumnDtoMapper.toDto(column);
    }

    @Transactional(readOnly = true)//Get por Id y usuario
    public ColumnResponseDto getColumnByIdAndUsername(Long id, User user)
     {
        //Si es admin usa el findById normal
        if(user.getAuthorities().stream()
            .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))){
                return ColumnDtoMapper.toDto(columnRepository.findById(id).get());
        }
        //Si no lo es que filtre las id y username
        ColumnEntity column = columnRepository.findByIdAndUserName(id, user.getUsername()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna no encontrada"));
        return ColumnDtoMapper.toDto(column);
     }

    //CREATE---------------
    @Transactional
    public ColumnResponseDto saveColumn(ColumnRequestDto column) {
        ColumnEntity newColumn = ColumnEntity.builder()
            .name(column.getName())
            .project(projectRepository.findById(column.getProjectId()).orElseThrow(()-> new ResponseStatusException( HttpStatus.NOT_FOUND, "Proyecto no encontrado")))
            .build();

        return ColumnDtoMapper.toDto(columnRepository.save(newColumn));

    }
    //UPDATE ---------------
    @Transactional
    public ColumnResponseDto updateColumn(Long id, ColumnRequestDto newColumn) {

        ColumnEntity oldColumn = columnRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna no encontrada"));
        Project newProject = projectRepository.findById(newColumn.getProjectId()).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto al que intenta asignar no encontrado"));


        oldColumn.setName(newColumn.getName());
        oldColumn.setProject(newProject);

        return ColumnDtoMapper.toDto(columnRepository.save(oldColumn));
    }

    //DELETE---------------
    @Transactional
    public ColumnResponseDto deleteColumn(Long id) {
        ColumnEntity columnToDelete = columnRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna no encontrada"));

        columnRepository.delete(columnToDelete);

        return ColumnDtoMapper.toDto(columnToDelete);
    }


}
