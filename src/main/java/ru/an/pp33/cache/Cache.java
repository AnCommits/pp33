package ru.an.pp33.cache;

import lombok.Data;
import org.springframework.stereotype.Component;
import ru.an.pp33.models.User;

import java.util.List;

@Data
@Component
public class Cache {
    private List<User> usersCached;
    private User adminCached;
}
