package com.step_app_jacob.step_app.modules.columns.entity;

import java.util.List;

import com.step_app_jacob.step_app.modules.projects.entity.Project;
import com.step_app_jacob.step_app.modules.tasks.entity.Task;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "columns")
public class ColumnEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "column", orphanRemoval = true)
    private List<Task> tasks;

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ColumnEntity other = (ColumnEntity) obj;
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

    //Builder constructor and method
    private ColumnEntity(ColumnBuilder builder){
        this.name = builder.name;
        this.project = builder.project;
        this.tasks = builder.tasks;
    }

    public static ColumnBuilder builder(){
        return new ColumnBuilder();
    }

    //Builder Class
    public static class ColumnBuilder{

        private String name;
        private Project project;
        private List<Task> tasks;

        public ColumnBuilder name(String name){
            this.name = name;
            return this;
        }
        public ColumnBuilder project(Project project){
            this.project = project;
            return this;
        }
        public ColumnBuilder tasks(List<Task> tasks){
            this.tasks = tasks;
            return this;
        }

        public ColumnEntity build(){

            if (name == null || project == null) {
            throw new IllegalStateException("name, y project son campos requeridos.");
        }
        return new ColumnEntity(this);

        }


    }
    

}
