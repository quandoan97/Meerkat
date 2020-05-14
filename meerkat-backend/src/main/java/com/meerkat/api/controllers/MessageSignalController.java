package com.meerkat.api.controllers;

import com.meerkat.api.models.Room;
import com.meerkat.api.models.StreamMessage;
import com.meerkat.api.repositories.RoomRepository;
import com.meerkat.api.services.RoomDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.UUID;

@Controller
public class MessageSignalController {
    @Autowired
    private RoomDetailsService roomDetailsService;

    @MessageMapping("/streams/start/{streamId}")
    @SendTo("/topic/rooms/{streamId}")
    public StreamMessage signalStreamStart(@DestinationVariable UUID streamId){
        roomDetailsService.setRoomStatus(streamId, true);
        return new StreamMessage(streamId, "start stream");
    }

    @MessageMapping("/streams/stop/{streamId}")
    @SendTo("/topic/rooms/{streamId}")
    public StreamMessage signalStreamStop(@DestinationVariable UUID streamId) {
        roomDetailsService.setRoomStatus(streamId, false);
        return new StreamMessage(streamId, "stop stream");
    }

    @MessageMapping("/streams/chat/{streamId}")
    @SendTo("/topic/rooms/{streamId}")
    public StreamMessage sendChatMessage(@DestinationVariable UUID streamId, @Payload StreamMessage chatMessage) {
        return new StreamMessage(streamId, chatMessage.getMessageType(), chatMessage.getMessageContent(), chatMessage.getSenderUsername());
    }

    @MessageMapping("/streams/join/{streamId}")
    @SendTo("/topic/rooms/{streamId}")
    public StreamMessage onStreamJoin(@DestinationVariable UUID streamId, @Payload StreamMessage message) throws Exception {
        StreamMessage joinMessage =
                new StreamMessage(
                        streamId,"join message inactive",message.getSenderUsername() + " has joined the chat.", message.getSenderUsername());
        try {
            Room joinedRoom = roomDetailsService.getRoomByRoomId(streamId);
            if(joinedRoom.getIsActive())
                joinMessage.setMessageType("join message active");
        } catch(Exception e) {
            throw e;
        }
        return joinMessage;
    }
}
