package ru.an.pp33.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.an.pp33.helper.UserUtils;
import ru.an.pp33.models.User;

@Controller
@RequestMapping("/user")
public class UserControllers {

    @GetMapping
    public String showUser(ModelMap model, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        UserUtils.setUserAgeAndRoles(user);
        model.addAttribute("user", user);
        model.addAttribute("my_roles", UserUtils.getRolesLine(user));
        model.addAttribute("my_email", user.getEmail());
        return "/user/user";
    }
}
