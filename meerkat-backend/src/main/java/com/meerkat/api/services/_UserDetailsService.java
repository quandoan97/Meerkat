package com.meerkat.api.services;

import com.meerkat.api.dtos.UserDto;
import com.meerkat.api.models.Genre;
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

    public User getUserByUsername(String username) throws Exception {
        User user;
        try {
            user = userRepository.findByUsername(username);
        } catch(Exception e) {
            throw e;
        }
        return user;
    }

    public User getUserById(UUID userId) throws Exception {
        User user;
        try {
            user = userRepository.findById(userId);
        } catch(Exception e) {
            throw e;
        }
        return user;
    }

    public void saveRoomIdToUser(UUID roomId, UUID userId) throws Exception {
        User user = userRepository.findById(userId);
        user.addRoomId(roomId);
        userRepository.save(user);
    }

    private UserDetails convertFromModel(User user) {
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    private User convertDtoToModel(UserDto userDto) {
        return new User( userDto.getUsername(), userDto.getFirstName(),
                userDto.getLastName(), userDto.getEmail(), userDto.getPassword(), Genre.convertDtosToGenres(userDto.getFavoriteGenres()) );
    }

    public User registerNewUser(UserDto userDto) throws Exception {
        //checks if username is already in DB
        User queriedUser = userRepository.findByUsername(userDto.getUsername());
        if(queriedUser != null){
            throw new Exception("This username is already taken.");
        }

        return convertDtoToModel(userDto);
    }
}
