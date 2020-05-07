package com.meerkat.api.repositories;

import com.meerkat.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByUsername(String username);
    public User findByEmail(String email);
    public List<User> findUsersByUsername(String username);

    @Override
    <S extends User> S save(S entity);
}
