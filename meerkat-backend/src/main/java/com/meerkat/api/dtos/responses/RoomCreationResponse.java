package com.meerkat.api.dtos.responses;

import java.util.UUID;

public class RoomCreationResponse {
    private String message;
    private UUID roomId;

    public RoomCreationResponse(String message, UUID roomId) {
        this.message = message;
        this.roomId = roomId;
    }

    public String getMessage() { return this.message; }
    public UUID getRoomId() { return this.roomId; }


}
