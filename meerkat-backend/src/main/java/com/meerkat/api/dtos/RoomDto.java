package com.meerkat.api.dtos;

import com.meerkat.api.models.Genre;

import java.util.UUID;

public class RoomDto {
    private String roomName;
    private Genre roomGenre;
    private UUID hostId;

    public RoomDto(String roomName, Genre roomGenre, UUID hostId) {
        this.roomName = roomName;
        this.roomGenre = roomGenre;
        this.hostId = hostId;
    }

    public String getRoomName() { return this.roomName; }
    public Genre getRoomGenre() { return this.roomGenre; }
    public UUID getHostId() { return this.hostId; }

    public void setRoomName(String roomName) { this.roomName = roomName; }
    public void setRoomGenre(Genre roomGenre) { this.roomGenre = roomGenre; }
    public void setHostId(UUID hostId) { this.hostId = hostId; }
}
