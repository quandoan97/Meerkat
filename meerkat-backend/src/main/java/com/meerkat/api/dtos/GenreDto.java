package com.meerkat.api.dtos;

import java.util.UUID;

public class GenreDto {
    private int genreId;
    private String genreName;

    public GenreDto(int genreId, String genreName) {
        this.genreId = genreId;
        this.genreName = genreName;
    }

    public int getGenreId() { return this.genreId; }
    public String getGenreName() { return this.genreName; }

    public void setGenreId(int genreId) { this.genreId = genreId; }
    public void setGenreName(String genreName) { this.genreName = genreName; }

}
