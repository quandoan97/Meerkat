package com.meerkat.api.repositories;

import com.meerkat.api.models.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.UUID;

public interface RoomRepository extends MongoRepository<Room, String>{
    Room findById(UUID roomId);
    List<Room> findByHostId(UUID hostId);
    List<Room> findAll();

    @Override
    <S extends Room> S save(S entity);
}
