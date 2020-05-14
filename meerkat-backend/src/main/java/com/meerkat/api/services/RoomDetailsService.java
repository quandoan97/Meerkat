package com.meerkat.api.services;

import com.meerkat.api.dtos.RoomDto;
import com.meerkat.api.models.Room;
import com.meerkat.api.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RoomDetailsService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private _UserDetailsService userDetailsService;

    public UUID saveRoom(RoomDto roomDto) throws Exception {
        try {

            Room roomToSave = convertDtoToModel(roomDto);
            roomRepository.save(roomToSave);

            UUID savedRoomId = roomToSave.getId();
            UUID hostUserId = roomToSave.getHostId();
            userDetailsService.saveRoomIdToUser(savedRoomId, hostUserId);

            return savedRoomId;

        } catch(Exception e) {
            throw e;
        }
    }

    public List<Room> getAllRooms() throws Exception {
        List<Room> allRooms;
        try {
            allRooms = roomRepository.findAll();
        } catch(Exception e) {
            throw e;
        }
        return allRooms;
    }

    public Room getRoomByRoomId(UUID roomId) throws Exception {
        Room room;
        try {
            room = roomRepository.findById(roomId);
        } catch(Exception e) {
            throw e;
        }
        return room;
    }
    public List<Room> getRoomsByUserId(UUID userId) throws Exception {
        ArrayList<Room> allRoomData = new ArrayList<>();
        try {
            List<UUID> roomIds = userDetailsService.getUserById(userId).getRoomIds();
            for (UUID roomId : roomIds) {
                Room roomData = roomRepository.findById(roomId);
                allRoomData.add(roomData);
            }
        } catch(Exception e) {
            throw e;
        }
        return allRoomData;
    }

    public void setRoomStatus(UUID streamId, Boolean isActive) {
        Room startedStreamRoom = roomRepository.findById(streamId);
        startedStreamRoom.setIsActive(isActive);
        roomRepository.save(startedStreamRoom);
    }

    private static Room convertDtoToModel(RoomDto roomDto) {
        return new Room(roomDto.getHostId(), roomDto.getRoomName(), roomDto.getRoomGenre());
    }
}
