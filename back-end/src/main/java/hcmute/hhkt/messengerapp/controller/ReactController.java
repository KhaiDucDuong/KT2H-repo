package hcmute.hhkt.messengerapp.controller;

import hcmute.hhkt.messengerapp.Exception.UnauthorizedRequestException;
import hcmute.hhkt.messengerapp.Response.ResultPaginationResponse;
import hcmute.hhkt.messengerapp.constant.ExceptionMessage;
import hcmute.hhkt.messengerapp.domain.Conversation;
import hcmute.hhkt.messengerapp.domain.ReactEmoji;
import hcmute.hhkt.messengerapp.service.MessageService.IMessageService;
import hcmute.hhkt.messengerapp.service.ReactService.IReactService;
import hcmute.hhkt.messengerapp.util.SecurityUtil;
import hcmute.hhkt.messengerapp.util.annotation.ApiMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/react")
@RequiredArgsConstructor
public class ReactController {
    private final Logger log = LoggerFactory.getLogger(ReactController.class);
    private final IReactService reactService;
    @GetMapping("/{messageId}")
    @PreAuthorize("hasAnyAuthority('USER')")
    @ApiMessage("Fetched messages in conversation")
    public ResponseEntity<?> getMessagesInConversation(@PathVariable String messageId){
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        log.debug("REST request to get messages in conversation {} from user {}", messageId, email);
        UUID parsedId = UUID.fromString(messageId);

        List<ReactEmoji> response = reactService.getEmojiByMessageId(parsedId);
        return ResponseEntity.ok().body(response);
    }
}
