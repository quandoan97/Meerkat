package com.meerkat.api.repositories;

import com.meerkat.api.models.Genre;
import com.meerkat.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GenreRepository extends MongoRepository<Genre, String>{
    List<Genre> findAll();

    @Override
    <S extends Genre> S save(S entity);
}
