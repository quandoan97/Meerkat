package com.meerkat.api.models;


import java.util.Date;
import java.util.UUID;

public class StreamMessage {
    private UUID streamId;
    private String senderUsername, messageType, messageContent = "None";
    private Date timestamp;

    public StreamMessage() { }

    public StreamMessage(UUID streamId, String messageType) {
        this.streamId = streamId;
        this.messageType = messageType;
        this.timestamp = new Date();
    }

    public StreamMessage(UUID streamId, String messageType, String messageContent, String senderUsername) {
        this.streamId = streamId;
        this.messageType = messageType;
        this.messageContent = messageContent;
        this.senderUsername = senderUsername;
        this.timestamp = new Date();
    }

    public UUID getStreamId() { return this.streamId; }
    public String getMessageType() { return this.messageType; }
    public String getMessageContent() { return this.messageContent; }
    public String getSenderUsername() { return this.senderUsername; }
    public Date getTimestamp() { return this.timestamp; }

    public void setStreamId(UUID streamId) { this.streamId = streamId; }
    public void setMessageType(String messageType) { this.messageType = messageType; }
    public void setMessageContent(String messageContent) { this.messageContent = messageContent; }
    public void setSenderUsername(String senderUsername) { this.senderUsername = senderUsername; }
}
