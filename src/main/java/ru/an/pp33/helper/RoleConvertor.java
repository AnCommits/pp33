package ru.an.pp33.helper;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.an.pp33.models.Role;

@Component
public class RoleConvertor implements Converter<String, Role> {
    @Override
    public Role convert(String name) {
        return new Role(name);
    }
}
