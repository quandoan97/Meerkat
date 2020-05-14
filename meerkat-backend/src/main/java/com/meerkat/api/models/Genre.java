package com.meerkat.api.models;

import com.meerkat.api.dtos.GenreDto;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class Genre {
    private int genreId;
    private String genreName;

    public Genre(){ }

    public Genre(int genreId, String genreName) {
        this.genreId = genreId;
        this.genreName = genreName;
    }

    public static Genre createFromDto(GenreDto dto) {
        return new Genre(dto.getGenreId(), dto.getGenreName());
    }

    public int getGenreId() { return this.genreId; }
    public String getGenreName() { return this.genreName; }

    public void setGenreId(int genreId) { this.genreId = genreId; }
    public void setGenreName(String genreName) { this.genreName = genreName; }

    public static List<Genre> convertDtosToGenres(List<GenreDto> dtos) {
        List<Genre> genres = new ArrayList<>();
        for(GenreDto dto : dtos) {
            genres.add(createFromDto(dto));
        }
        return new ArrayList<>(genres);
    }
}