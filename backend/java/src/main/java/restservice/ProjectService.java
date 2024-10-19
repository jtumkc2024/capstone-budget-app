package restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import restservice.models.Project;

import java.util.Date;
import java.util.List;

@Service
public class ProjectService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProjectService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Project> getProjectsByUserId(String userId) {
        String sql = "SELECT * FROM Project WHERE user_id = ?";
        return jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) -> {
            Project project = new Project();
            project.setProjectId(rs.getLong("project_id"));
            project.setUserId(rs.getLong("user_id"));
            project.setProjectTitle(rs.getString("project_title"));
            project.setProjectDescription(rs.getString("project_description"));
            project.setRenewable(rs.getInt("renewable"));
            project.setPriority(rs.getInt("priority"));
            project.setDeadline(rs.getDate("deadline"));
            return project;
        });
    }
}
