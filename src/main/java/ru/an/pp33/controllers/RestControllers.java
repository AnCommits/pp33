package ru.an.pp33.controllers;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.an.pp33.models.User;
import ru.an.pp33.service.UserService;

@RestController
@RequestMapping("/api/user")
public class RestControllers {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public RestControllers(PasswordEncoder passwordEncoder, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return user;
        }
        throw new RuntimeException("User with " + id + " not found");
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

    @PutMapping("/lock/{id}")
    public void lockUser(@PathVariable long id, @RequestBody String lock) {
        User user = userService.getUserById(id);
        user.setLocked(Boolean.parseBoolean(lock));
        userService.updateUser(user);
    }

    @PostMapping("/new_user")
    public User saveUser(@RequestBody User user) {
        String passwordHash = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordHash);
        userService.saveUser(user);
        return user;
    }
}
