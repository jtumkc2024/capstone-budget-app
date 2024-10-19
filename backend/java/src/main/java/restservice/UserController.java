package restservice;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import restservice.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173") // Replace with your React app's URL
@RestController
public class UserController {

    private final UserService _userService;

    public UserController(UserService userService){
        this._userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return _userService.executeQuery();
    }

    @GetMapping("/userCount")
    public int getUserCount(){
        return _userService.getUserCount();
    }
}