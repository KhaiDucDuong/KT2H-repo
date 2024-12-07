package hcmute.hhkt.messengerapp.service.ReactService;

import hcmute.hhkt.messengerapp.domain.Message;
import hcmute.hhkt.messengerapp.domain.ReactEmoji;
import hcmute.hhkt.messengerapp.dto.MessageDTO;
import hcmute.hhkt.messengerapp.dto.ReactEmojiDTO;

import java.util.List;
import java.util.UUID;

public interface IReactService {
    ReactEmoji updateMessageWithReaction(ReactEmojiDTO reactEmojiDTO);
    List<ReactEmoji> getEmojiByMessageId(UUID id);
}
