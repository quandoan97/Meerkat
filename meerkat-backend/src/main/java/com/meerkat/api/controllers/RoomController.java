package com.meerkat.api.controllers;

import com.meerkat.api.dtos.RoomDto;
import com.meerkat.api.dtos.responses.RoomCreationResponse;
import com.meerkat.api.dtos.responses.RoomsResponse;
import com.meerkat.api.models.Room;
import com.meerkat.api.services.RoomDetailsService;
import com.meerkat.api.services._UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class RoomController {
    @Autowired
    RoomDetailsService roomDetailsService;

    @Autowired
    _UserDetailsService userDetailsService;

    @PostMapping("/api/room/create")
    public ResponseEntity createRoom(@RequestBody RoomDto roomDto) throws Exception {
        try {
            UUID savedRoomId = roomDetailsService.saveRoom(roomDto);
            return ResponseEntity.ok(new RoomCreationResponse("The room was succesfully created.", savedRoomId));

        } catch(Exception e) {
            throw e;
        }
    }

    @GetMapping("/api/room/getAll")
    public ResponseEntity getAllRooms() throws Exception {
        List<Room> allRooms;
        try {
            allRooms = roomDetailsService.getAllRooms();
        } catch (Exception e) {
            throw e;
        }
        return ResponseEntity.ok(new RoomsResponse(allRooms));
    }

    @GetMapping("/api/room/getByUserId")
    public ResponseEntity getRoomsByUser(@RequestParam UUID id) throws Exception {
        List<Room> allUserRooms;
        try {
            allUserRooms = roomDetailsService.getRoomsByUserId(id);
        } catch(Exception e) {
            throw e;
        }
        return ResponseEntity.ok(new RoomsResponse(allUserRooms));
    }

    @GetMapping("/api/room/getByRoomId")
    public ResponseEntity getRoomsById(@RequestParam UUID id) throws Exception {
        Room room;
        try {
            room = roomDetailsService.getRoomByRoomId(id);
        } catch(Exception e) {
            throw e;
        }
        return ResponseEntity.ok(room);
    }

}
