package com.meerkat.api.repositories;

import com.meerkat.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends MongoRepository<User, String> {
    User findById(UUID id);
    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findUsersByUsername(String username);

    @Override
    <S extends User> S save(S entity);
}
