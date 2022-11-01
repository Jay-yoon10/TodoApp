package toDoList.demo.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import toDoList.demo.model.User;
import toDoList.demo.repository.UserRepository;

@Slf4j
@Service

public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User create(final User user){
        if(user == null || user.getEmail() == null){
            throw new RuntimeException("Invalid arguments");
        }
        final String email = user.getEmail();
        if(userRepository.existsByEmail(email)){
            log.warn("Email already exists {}", email);
            throw new RuntimeException("Email already exists");
        }

        return userRepository.save(user);
    }

    public User getByCredentials(final String email, final String password, final PasswordEncoder passwordEncoder){
        final User originalUser = userRepository.findByEmail(email);

        if(originalUser != null && passwordEncoder.matches(password, originalUser.getPassword())){
            return originalUser;
        }
    return null;
    }

}
