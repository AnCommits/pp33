package ru.an.pp33.controllers;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.an.pp33.constants.RolesType;
import ru.an.pp33.models.User;
import ru.an.pp33.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/admin/api")
public class AdminRestControllers {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public AdminRestControllers(PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @GetMapping("/get-all-users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/all-roles")
    public List<String> getAllRoles() {
        return RolesType.allRolesNames;
    }

    @PutMapping("/lock/{id}")
    public void lockUser(@PathVariable long id, @RequestBody String lock) {
        User user = userService.getUserById(id);
        user.setLocked(Boolean.parseBoolean(lock));
        userService.updateUser(user);
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody User user) {
        if (!userService.getUserById(user.getId()).getPassword().equals(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userService.updateUser(user);
        return user.getPassword();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.removeUserById(id);
    }

    @PostMapping("/save-user")
    public User saveUser(@RequestBody User user) {
        String passwordHash = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordHash);
        userService.saveUser(user);
        return user;
    }

//    @GetMapping("/admin/get-all-users")
//    public ResponseEntity<List<User>> getAllUsersAnMyId(Authentication authentication) {
//        HttpHeaders headers = new HttpHeaders();
////        headers.add("my-id", "1");
//        headers.add("my-id", String.valueOf(((User) authentication.getPrincipal()).getId()));
//        return new ResponseEntity<>(userService.getAllUsers(), headers, HttpStatus.OK);
//    }

//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable long id) {
//        User user = userService.getUserById(id);
//        if (user != null) {
//            return user;
//        }
//        throw new RuntimeException("User with " + id + " not found");
//    }
}
