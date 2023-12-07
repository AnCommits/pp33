package ru.an.pp33.init;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.an.pp33.models.Role;
import ru.an.pp33.models.User;
import ru.an.pp33.service.UserService;

import javax.annotation.PostConstruct;
import java.util.*;

@Component
public class InitDataBase {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public InitDataBase(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Method creates and puts an admin in the table in case the table is empty.
     */
    @PostConstruct
    public void initUsers() {
        if (userService.countUsers() == 0) {
            initAdmin1();
            initHead();
            initManufactureMaster();
            initRepairMaster();

//            initManufacturer1();
//            initManufacturer2();
//            initRepairer1();
//            initTrainee1();
        }
    }

    public void initAdmin1() {
        Set<Role> roles = new LinkedHashSet<>();
        roles.add(new Role("ADMIN"));
        roles.add(new Role("USER"));
        User user = new User("Абрам", "Абрамов","1",
                passwordEncoder.encode("1"),
                null, roles, false);
        userService.saveUser(user);
    }

    public void initHead() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("MASTER"));
        roles.add(new Role("MANUFACTURE"));
        roles.add(new Role("REPAIR"));
        roles.add(new Role("USER"));
        User user = new User("Степан", "Степанов", "s",
                passwordEncoder.encode("s"),
                new GregorianCalendar(1991, Calendar.FEBRUARY, 12), roles, false);
        userService.saveUser(user);
    }

    public void initManufactureMaster() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("MASTER"));
        roles.add(new Role("MANUFACTURE"));
        roles.add(new Role("USER"));
        User user = new User("Кирилл", "Кириллов", "k",
                passwordEncoder.encode("k"),
                new GregorianCalendar(2000, Calendar.JANUARY, 1), roles, false);
        userService.saveUser(user);
    }

    public void initRepairMaster() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("MASTER"));
        roles.add(new Role("REPAIR"));
        roles.add(new Role("USER"));
        User user = new User("Петр", "Петров", "p",
                passwordEncoder.encode("p"),
                new GregorianCalendar(2000, Calendar.JANUARY, 1), roles, false);
        userService.saveUser(user);
    }

    public void initManufacturer1() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("MANUFACTURE"));
        roles.add(new Role("USER"));
        User user = new User("Григорий", "Григорьев", "g",
                passwordEncoder.encode("g"),
                new GregorianCalendar(2000, Calendar.JANUARY, 1), roles, false);
        userService.saveUser(user);
    }

    public void initManufacturer2() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("MANUFACTURE"));
        roles.add(new Role("USER"));
        User user = new User("Дима", "Дмитриев", "d",
                passwordEncoder.encode("d"),
                new GregorianCalendar(2000, Calendar.JANUARY, 1), roles, false);
        userService.saveUser(user);
    }

    public void initRepairer1() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("REPAIR"));
        roles.add(new Role("USER"));
        User user = new User("Борис", "Борисов", "b",
                passwordEncoder.encode("b"),
                new GregorianCalendar(2000, Calendar.JANUARY, 1), roles, false);
        userService.saveUser(user);
    }

    public void initTrainee1() {
        Set<Role> roles = new HashSet<>();
        roles.add(new Role("USER"));
        User user = new User("Антон", "Антонов", "a",
                passwordEncoder.encode("a"),
                new GregorianCalendar(2000, Calendar.JANUARY, 1), roles, false);
        userService.saveUser(user);
    }
}
