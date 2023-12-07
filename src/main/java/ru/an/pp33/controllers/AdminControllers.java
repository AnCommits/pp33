package ru.an.pp33.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.an.pp33.helper.UserUtils;
import ru.an.pp33.models.User;
import ru.an.pp33.service.UserService;

import java.util.List;
import java.util.logging.Logger;

@Controller
@RequestMapping("/admin")
public class AdminControllers {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
//    private final Cache cache;

    private final UserUtils userUtils;

    private final Logger logger = Logger.getLogger(this.getClass().getName());

//    private List<User> usersCached;
//    private User adminCached;

    public AdminControllers(PasswordEncoder passwordEncoder, UserService userService, UserUtils userUtils) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
//        this.cache = cache;
        this.userUtils = userUtils;
    }

    @GetMapping
    public String showUsers(ModelMap model, Authentication authentication) {
        List<User> users = userService.getAllUsers();
//        cache.setUsersCached(userService.getAllUsers());
//        usersCached = userService.getAllUsers();
        long myId = ((User) authentication.getPrincipal()).getId();
        User me = userService.getUserById(myId);
        userUtils.setUsersViewFields(users, me);
//        UserUtils.setUsersAgeAndRoles(usersCached, myId);
//        cache.setAdminCached(userService.getUserById(myId));
//        adminCached = userService.getUserById(myId);
        model.addAttribute("allRolesNames", userUtils.allRolesNames());
        model.addAttribute("users", users);
//        User me = cache.getAdminCached();
//        model.addAttribute("users", usersCached);
        model.addAttribute("my_roles", userUtils.getRolesLine(me));
//        model.addAttribute("my_roles", UserUtils.getRolesLine(adminCached));
        model.addAttribute("my_email", me.getEmail());
//        model.addAttribute("my_email", adminCached.getEmail());
        model.addAttribute("my_id", myId);
        return "admin/admin";
    }

    @GetMapping("/about-user/{id}")
    public String showUser(@PathVariable long id, ModelMap model, Authentication authentication) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
//        model.addAttribute("users", cache.getUsersCached());
//        model.addAttribute("users", usersCached);
        User user = userService.getUserById(id);
        userUtils.setUserAgeAndRoles(user);
        model.addAttribute("user", user);
        long myId = ((User) authentication.getPrincipal()).getId();
        User me = userService.getUserById(myId);
        model.addAttribute("my_roles", userUtils.getRolesLine(me));
//        model.addAttribute("my_roles", UserUtils.getRolesLine(cache.getAdminCached()));
//        model.addAttribute("my_roles", UserUtils.getRolesLine(adminCached));
        model.addAttribute("my_email", me.getEmail());
//        model.addAttribute("my_email", cache.getAdminCached().getEmail());
//        model.addAttribute("my_email", adminCached.getEmail());
        return "admin/about-user";
    }

    @GetMapping("/new-user")
    public String newUser(ModelMap model, Authentication authentication) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
//        model.addAttribute("users", cache.getUsersCached());
//        model.addAttribute("users", usersCached);
        model.addAttribute("allRoles", userUtils.allRoles());
        model.addAttribute("user", new User());
        long myId = ((User) authentication.getPrincipal()).getId();
        User me = userService.getUserById(myId);
//        User me = cache.getAdminCached();
        model.addAttribute("my_roles", userUtils.getRolesLine(me));
//        model.addAttribute("my_roles", UserUtils.getRolesLine(adminCached));
        model.addAttribute("my_email", me.getEmail());
//        model.addAttribute("my_email", adminCached.getEmail());
        return "admin/new-user";
    }

    @PostMapping("/save-user")
    public String saveUser(@ModelAttribute("user") User user, Authentication authentication) {
        String emailFromForm = user.getEmail();
        User userFromDb = userService.getUserByEmail(emailFromForm);
        if (userFromDb == null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            long myId = ((User) authentication.getPrincipal()).getId();
            user.setParentAdminId(myId);
            userService.saveUser(user);
        } else {
            logger.warning("Method saveUser. Email exists.");
        }
        return "redirect:/admin";
    }

//    @PutMapping("/change-ban/{id}")
//    public String changeUserBan(@PathVariable long id, Authentication authentication) {
//        User me = (User) authentication.getPrincipal();
//        long myId = me.getId();
//        if (id == myId) {
//            logger.warning("Method changeUserBan. An attempt of self-locking.");
//            return "redirect:/admin";
//        }
//        User user = userService.getUserById(id);
//        if (userUtils.isAncestor(me, user)) {
//            logger.warning("Method changeUserBan. An attempt of (un)locking a creator.");
//            return "redirect:/admin";
//        }
//        user.setLocked(!user.isLocked());
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }
}
