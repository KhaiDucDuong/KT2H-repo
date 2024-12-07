package hcmute.hhkt.messengerapp.controller;

import hcmute.hhkt.messengerapp.Response.MessageResponse;
import hcmute.hhkt.messengerapp.Response.ReactResponse;
import hcmute.hhkt.messengerapp.Response.UserStatusResponse;
import hcmute.hhkt.messengerapp.constant.ExceptionMessage;
import hcmute.hhkt.messengerapp.domain.Conversation;
import hcmute.hhkt.messengerapp.domain.Message;
import hcmute.hhkt.messengerapp.domain.ReactEmoji;
import hcmute.hhkt.messengerapp.domain.User;
import hcmute.hhkt.messengerapp.domain.enums.UserDefaultStatus;
import hcmute.hhkt.messengerapp.domain.enums.UserStatus;
import hcmute.hhkt.messengerapp.dto.MessageDTO;
import hcmute.hhkt.messengerapp.dto.ReactEmojiDTO;
import hcmute.hhkt.messengerapp.dto.UpdateStatusDTO;
import hcmute.hhkt.messengerapp.service.ConversationService.IConversationService;
import hcmute.hhkt.messengerapp.service.MessageService.IMessageService;
import hcmute.hhkt.messengerapp.service.ReactService.IReactService;
import hcmute.hhkt.messengerapp.service.UserService.IUserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class StompSocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final Logger log = LoggerFactory.getLogger(StompSocketController.class);
    private final IConversationService conversationService;
    private final IMessageService messageService;
    private final IUserService userService;
    private final IReactService reactService;
    @MessageMapping("/private-message")
    public void receivePrivateMessage(@Payload MessageDTO messageDTO) {
        log.debug("Stomp private message from {}", messageDTO.getSenderId());
        UUID conversationId = UUID.fromString(messageDTO.getConversationId());
        Conversation conversation = conversationService.findById(conversationId);
        User toUser;

        // Xác định người nhận dựa trên ID của người gửi
        if (UUID.fromString(messageDTO.getSenderId()).equals(conversation.getCreator().getId())) {
            toUser = conversation.getTarget();
        } else if (UUID.fromString(messageDTO.getSenderId()).equals(conversation.getTarget().getId())) {
            toUser = conversation.getCreator();
        } else {
            throw new IllegalArgumentException(ExceptionMessage.INVALID_MESSAGE_SENDER);
        }

        // Tạo và lưu tin nhắn với các loại tin nhắn được gửi đồng thời
        Message message = messageService.createMessage(messageDTO);
        MessageResponse response = MessageResponse.fromMessage(message);

        // Gửi thông điệp cho cả người nhận và người gửi
        simpMessagingTemplate.convertAndSendToUser(toUser.getId().toString(), "/private", response);
        simpMessagingTemplate.convertAndSendToUser(response.getSenderId().toString(), "/private", response);
        log.debug("Sending private message from {} to {} with content {}", messageDTO.getSenderId(), toUser.getId(), message.getMessage());
    }

    @MessageMapping("/react-message")
    @Transactional
    public void reactMessage(@Payload ReactEmojiDTO reactEmojiDTO) {

        log.debug("Received reaction: {}", reactEmojiDTO);

        // Xác định message để thả react
        String messageId = reactEmojiDTO.getMessage_id();
        Message message = messageService.findMessageById(UUID.fromString(messageId));
        if (message == null) {
            throw new IllegalArgumentException(ExceptionMessage.INVALID_MESSAGE_SENDER);
        }
        String userID = reactEmojiDTO.getUser_id();
        User user =userService.findById(UUID.fromString(userID));
        if (user == null) {
            throw new IllegalArgumentException(ExceptionMessage.INVALID_USER);
        }

        // Lưu hoặc cập nhật phản ứng
        ReactEmoji reactEmoji = reactService.updateMessageWithReaction(reactEmojiDTO);
        // Tạo phản hồi từ react đã lưu
        ReactResponse response = ReactResponse.fromReactEmoji(reactEmoji);

        // Gửi thông báo real-time tới tất cả user trong conversation
        Conversation conversation = message.getConversation();
        UUID creatorId = conversation.getCreator().getId();
        UUID targetId = conversation.getTarget().getId();

        simpMessagingTemplate.convertAndSendToUser(creatorId.toString(), "/update-message", response);
        simpMessagingTemplate.convertAndSendToUser(targetId.toString(), "/update-message", response);

        log.debug("Reaction sent to conversation {} with emoji {}", conversation.getId(), reactEmoji.getEmoji());
    }

    @MessageMapping("/delete-react-message")
    @Transactional
    public void deleteReactMessage(@Payload ReactEmojiDTO reactEmojiDTO) {

        log.debug("Received reaction: {}", reactEmojiDTO);

        // Xác định message để thả react
        String messageId = reactEmojiDTO.getMessage_id();
        Message message = messageService.findMessageById(UUID.fromString(messageId));
        if (message == null) {
            throw new IllegalArgumentException(ExceptionMessage.INVALID_MESSAGE_SENDER);
        }
        String userID = reactEmojiDTO.getUser_id();
        User user =userService.findById(UUID.fromString(userID));
        if (user == null) {
            throw new IllegalArgumentException(ExceptionMessage.INVALID_USER);
        }

        // Lưu hoặc cập nhật phản ứng
        ReactEmoji reactEmoji = reactService.updateMessageWithReaction(reactEmojiDTO);
        // Tạo phản hồi từ react đã lưu
        ReactResponse response = ReactResponse.fromReactEmoji(reactEmoji);

        // Gửi thông báo real-time tới tất cả user trong conversation
        Conversation conversation = message.getConversation();
        UUID creatorId = conversation.getCreator().getId();
        UUID targetId = conversation.getTarget().getId();

        simpMessagingTemplate.convertAndSendToUser(creatorId.toString(), "/update-message", response);
        simpMessagingTemplate.convertAndSendToUser(targetId.toString(), "/update-message", response);

        log.debug("Reaction sent to conversation {} with emoji {}", conversation.getId(), reactEmoji.getEmoji());
    }

    @MessageMapping("/user/status")
    public void updateUserStatus(@Payload UpdateStatusDTO updateStatusDTO, StompHeaderAccessor stompHeaderAccessor
    ) {
        String email = Objects.requireNonNull(stompHeaderAccessor.getUser()).getName();
        log.debug("Stomp message to update user status from {}", email);
        User user = userService.findUserByEmail(email);
        if(user == null){
            throw new IllegalArgumentException(ExceptionMessage.USER_NOT_EXIST);
        }

        UserStatus newStatus = UserStatus.valueOf(updateStatusDTO.getStatus());
        userService.updateUserStatus(user, newStatus);


        if(user.getDefaultStatus() == UserDefaultStatus.ONLINE) {
            UserStatusResponse response = UserStatusResponse.fromUser(user, user.getStatus());
            simpMessagingTemplate.convertAndSend("/user/" + user.getId().toString() + "/status", response);
            log.debug("Sending message to topic {} about user new status {}", "/user/" + user.getId().toString() + "/status", response.getStatus());
        }
    }
}
