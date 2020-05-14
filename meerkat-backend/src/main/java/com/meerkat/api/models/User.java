package com.meerkat.api.models;

import com.meerkat.api.dtos.GenreDto;
import com.meerkat.api.dtos.UserDto;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document
public class User {
    @Id
    private UUID id;
    private String username ,firstName, lastName, email, password;
    private List<Genre> favoriteGenres;

    //TODO: add functionality for these
//    private String biography;
//    private String profilePicDataUrl;
    private List<UUID> friendIds, roomIds;

    public User(String username, String firstName, String lastName, String email, String password, List<Genre> favoriteGenres) {
        this.id = UUID.randomUUID();
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.favoriteGenres = favoriteGenres;
        this.friendIds = new ArrayList<UUID>();
        this.roomIds = new ArrayList<UUID>();
    }

    public UUID getId() { return this.id; }
    public String getUsername() { return this.username; }
    public String getEmail() { return this.email; }
    public String getPassword() { return this.password; }
    public String getfirstName(){return this.firstName; }
    public String getlastName(){return this.lastName; }
    public List<Genre> getFavoriteGenres() { return this.favoriteGenres; }
    public List<UUID> getFriendIds() { return this.friendIds; }
    public List<UUID> getRoomIds() { return this.roomIds; }

    public void setId(UUID id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setfirstName(String firstName){this.firstName = firstName;}
    public void setlastName(String lastName){this.lastName = lastName; }

    public void addRoomId(UUID roomId) {
        this.roomIds.add(roomId);
    }
}
