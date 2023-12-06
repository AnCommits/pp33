package ru.an.pp33.controllers;

import org.springframework.security.core.Authentication;
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
    public void updateUser(@RequestBody User user, Authentication authentication) {
//        long myId = ((User) authentication.getPrincipal()).getId();
//        user.setParentAdminId(myId);
        if ((user.getPassword().length()) < 50) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userService.updateUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.removeUserById(id);
    }
}
