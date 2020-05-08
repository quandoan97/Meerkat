package com.meerkat.api.dtos;

import java.util.List;

public class UserDto {
    private String username, email, password, firstName, lastName;
    private List<GenreDto> favoriteGenres;

    public UserDto(String username, String email, String password, String firstName, String lastName, List<GenreDto> favoriteGenres) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.favoriteGenres = favoriteGenres;
    }

    public String getUsername() { return this.username; }
    public String getEmail() { return this.email; }
    public String getPassword() { return this.password; }
    public String getFirstName() {return this.firstName; }
    public String getLastName() {return this.lastName; }
    public List<GenreDto> getFavoriteGenres() {return this.favoriteGenres; }

    public void setUsername(String username){
        this.username = username;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setFirstName(String firstName){ this.firstName = firstName; }
    public void setLastName(String lastName){ this.lastName = lastName; }

}
