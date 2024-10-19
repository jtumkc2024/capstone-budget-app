package restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import restservice.models.User;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> executeQuery() {
        String sql = "SELECT * FROM User";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        return results.stream()
                .map(this::mapToUser)
                .collect(Collectors.toList());
    }

    private User mapToUser(Map<String, Object> row) {
        User user = new User();
        user.setUserId((Long) row.get("user_id"));
        user.setUsername((String) row.get("username"));
        user.setPassword((String) row.get("password"));
        user.setEmail((String) row.get("email"));
        return user;
    }

    public int getUserCount() {
        String sql = "SELECT COUNT(*) FROM User";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
}