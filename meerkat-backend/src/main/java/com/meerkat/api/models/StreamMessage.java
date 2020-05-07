package com.meerkat.api.models;


public class StreamMessage {
    private String streamId, messageType;
    public StreamMessage(String streamId, String messageType){
        this.streamId = streamId;
        this.messageType = messageType;
    }

    public String getStreamId() { return this.streamId; }
    public String getMessageType() { return this.messageType; }

    public void setStreamId(String streamId) { this.streamId = streamId; }
    public void setMessageType(String messageType) { this.messageType = messageType; }
}
