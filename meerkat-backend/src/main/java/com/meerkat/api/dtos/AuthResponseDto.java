package com.meerkat.api.dtos;

import com.meerkat.api.models.User;

public class AuthResponseDto {
    private String jwt;
    private User userData;

    public AuthResponseDto(String jwt, User userData) {
        this.jwt = jwt;
        this.userData = userData;
    }

    public String getJwt() { return this.jwt; }
    public User getUserData() { return this.userData; }
}
