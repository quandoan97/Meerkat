package com.meerkat.api.config;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.JWT;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtUtil {

    private final String SECRET_KEY = "meerkat";
    private final int EXPIRATION_TIME = 1000 * 60 * 60 * 10; //10 hours

    public String extractUsername(String token) {
        try {
            DecodedJWT jwt = decodeToken(token);
            return jwt.getSubject();
        } catch(JWTDecodeException e) {
            throw e;
        }
    }

    public Date extractExpiration(String token) {
        try {
            DecodedJWT jwt = decodeToken(token);
            return jwt.getExpiresAt();
        } catch(JWTDecodeException e) {
            throw e;
        }
    }

    private DecodedJWT decodeToken(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt;
        } catch (JWTDecodeException e){
            //invalid token
            throw e;
        }
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return JWT.create()
                .withSubject(subject)
                .withHeader(claims)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}