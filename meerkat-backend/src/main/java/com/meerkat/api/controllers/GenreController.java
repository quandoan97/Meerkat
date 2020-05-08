package com.meerkat.api.controllers;

import com.meerkat.api.models.Genre;
import com.meerkat.api.repositories.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GenreController {
    @Autowired
    private GenreRepository genreRepository;

    @RequestMapping("api/genre/getAll")
    public ResponseEntity getAllGenres() throws Exception{
        try {
            List<Genre> allGenres = genreRepository.findAll();
            return ResponseEntity.ok(genreRepository.findAll());
        } catch(Exception e) {
//            throw new Exception("There was an error processing your request.");
            throw e;
        }
    }
}