//package ru.an.pp33.helper;
//
//import org.springframework.stereotype.Component;
//import ru.an.pp33.constants.RolesType;
//import ru.an.pp33.models.Role;
//import ru.an.pp33.models.User;
//import ru.an.pp33.service.UserService;
//
//import java.time.LocalDate;
//import java.time.Period;
//import java.time.ZoneId;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//@Component
//public class UserUtils {
//    private final UserService userService;
//
//    public UserUtils(UserService userService) {
//        this.userService = userService;
//    }

//    public void setUsersViewFields(List<User> users, User admin) {
//        users.forEach(this::setUserAgeAndRoles);
//        users.forEach(u -> u.setDescendant(isAncestor(u, admin)));
//    }

//    public void setUserAgeAndRoles(User user) {
//        setUserAgeAndBirthdate(user);
//        setUserRolesNames(user);
//    }

//    public void setUserAgeAndBirthdate(User user) {
//        int age;
//        String birthdateAsString;
//        if (user.getBirthdate() == null) {
//            age = -1;
//            birthdateAsString = "";
//        } else {
//            LocalDate localBirthdate = LocalDate.ofInstant(user.getBirthdate().toInstant(), ZoneId.systemDefault());
//            age = Period.between(localBirthdate, LocalDate.now()).getYears();
//            birthdateAsString = localBirthdate.toString();
//        }
//        user.setAge(age);
//        user.setBirthdateAsString(birthdateAsString);
//    }

//    public void setUserRolesNames(User user) {
//        List<Role> roles = new ArrayList<>(user.getRoles());
//        roles.sort(Role.roleComparator);
//        user.setRolesNames(roles.stream().map(Role::getName).toList());
//    }

//    public List<Role> allRoles() {
//        return Arrays.stream(RolesType.values()).map(r -> new Role(r.name())).toList();
//    }

//    public List<String> allRolesNames() {
//        return Arrays.stream(RolesType.values()).map(Enum::name).toList();
//    }

//    public String getRolesLine(User user) {
//        StringBuilder rolesLine = new StringBuilder();
//        user.getRoles().stream()
//                .sorted(Role.roleComparator)
//                .map(Role::getName)
//                .forEach(r -> rolesLine.append(r).append(", "));
//        return rolesLine.isEmpty()
//                ? "-"
//                : rolesLine.substring(0, rolesLine.length() - 2);
//    }

//    /**
//     * Returns true, if user2 or his creator created user1
//     */
//    public boolean isAncestor(User user1, User user2) {
//        long parentAdminId1 = user1.getParentAdminId();
//        if (parentAdminId1 == 0) {
//            return false;
//        }
//        if (parentAdminId1 == user2.getId()) {
//            return true;
//        }
//        User user = userService.getUserById(parentAdminId1);
//        if (user == null) {
//            return false;
//        }
//        return isAncestor(user, user2);
//    }
//}
