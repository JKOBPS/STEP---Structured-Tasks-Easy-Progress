package com.step_app_jacob.step_app.modules.tasks.dto.taskdto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDto {

    private Long taskId;
    private String title;
    private String description;
    private String priority;
    private String dueDate;
    private Long assignedToUserId;
    private Long assignedToColumnId;
    private int percentage;

}
