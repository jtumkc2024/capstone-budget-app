package restservice.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;
    private Long userId;
    private String projectTitle;
    private String projectDescription;
    private int renewable;
    private int priority;
    private Date deadline;

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }
    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }
    public void setRenewable(int renewable) {
        this.renewable = renewable;
    }
    public void setPriority(int priority) {
        this.priority = priority;
    }
    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Long getProjectId() {
        return projectId;
    }
    public Long getUserId() {
        return userId;
    }
    public String getProjectTitle() {
        return projectTitle;
    }
    public String getProjectDescription() {
        return projectDescription;
    }
    public int getRenewable() {
        return renewable;
    }
    public int getPriority() {
        return priority;
    }
    public String getDeadline() {
        return deadline.toString();
    }
}
