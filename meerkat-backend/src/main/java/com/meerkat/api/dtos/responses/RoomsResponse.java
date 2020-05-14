package com.meerkat.api.dtos.responses;

import com.meerkat.api.models.Room;

import java.util.List;

public class RoomsResponse {
    List<Room> rooms;

    public RoomsResponse(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Room> getRooms() { return this.rooms; }
    public void setRooms(List<Room> rooms) { this.rooms = rooms; }
}
