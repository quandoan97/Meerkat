package com.meerkat.api.services;

import com.meerkat.api.dtos.UserDto;
import com.meerkat.api.models.User;
import com.meerkat.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class _UserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userToLoad = userRepository.findByUsername(username);
        if(userToLoad == null) {
            throw new UsernameNotFoundException("User was not found.");
        }
        return convertFromModel(userToLoad);
    }

    private UserDetails convertFromModel(User user) {
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    public User registerNewUser(UserDto userDto) throws Exception {
        //checks if username is already in DB
        User queriedUser = userRepository.findByUsername(userDto.getUsername());
        if(queriedUser != null){
            throw new Exception("This username is already taken.");
        }

        UUID id = UUID.randomUUID();
        String username = userDto.getUsername();
        String email = userDto.getEmail();
        String password = userDto.getPassword();

        return new User(id, username, email, password);
    }
}
