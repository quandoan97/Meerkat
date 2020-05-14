package com.meerkat.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document
public class Room {
    @Id
    private UUID id;
    private UUID hostId;
    private Genre roomGenre;
    private String roomName;
    private List<UUID> memberIds;
    private Boolean isActive;

    public Room(UUID hostId, String roomName, Genre roomGenre){
        this.id = UUID.randomUUID();
        this.hostId = hostId;

        List<UUID> members = new ArrayList<>();
        members.add(hostId);
        this.memberIds = members;

        this.roomName = roomName;
        this.roomGenre = roomGenre;
        this.isActive = false;
    }

    public UUID getId() { return this.id; }
    public UUID getHostId() { return this.hostId; }
    public List<UUID> getMemberIds() { return this.memberIds; }
    public String getRoomName() { return this.roomName; }
    public Genre getRoomGenre() { return this.roomGenre; }
    public Boolean getIsActive() { return this.isActive; }

    public void setHostId(UUID hostId) { this.hostId = hostId; }
    public void setMemberIds(List<UUID> memberIds) { this.memberIds = memberIds; }
    public void setRoomName(String roomName) { this.roomName = roomName; }
    public void setRoomGenre(Genre roomGenre) { this.roomGenre = roomGenre; }
    public void addMemberId(UUID memberId) {
        this.memberIds.add(memberId);
    }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
