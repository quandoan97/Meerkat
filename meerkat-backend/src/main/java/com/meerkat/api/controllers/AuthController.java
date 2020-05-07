package com.meerkat.api.controllers;

import com.meerkat.api.config.JwtUtil;
import com.meerkat.api.dtos.AuthResponseDto;
import com.meerkat.api.dtos.UserDto;
import com.meerkat.api.repositories.UserRepository;
import com.meerkat.api.services._UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private _UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/auth/register")
    public ResponseEntity register(@RequestBody UserDto newUserDto) throws Exception {
        try {
            userRepository.save(userDetailsService.registerNewUser(newUserDto));
            return login(newUserDto);
        } catch(Exception e) {
            throw e;
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity login (@RequestBody UserDto userDto) throws Exception {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));
        } catch(BadCredentialsException e){
            throw new Exception("Incorrect username or password.");
        } catch (Exception e) {
            throw new Exception("There was an error authenticating your credentials.");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(userDto.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponseDto(jwt));

    }
}