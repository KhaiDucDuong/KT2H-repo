package hcmute.hhkt.messengerapp.service.ReactService;

import hcmute.hhkt.messengerapp.domain.ReactEmoji;
import hcmute.hhkt.messengerapp.dto.ReactEmojiDTO;
import hcmute.hhkt.messengerapp.repository.ReactRepository;
import hcmute.hhkt.messengerapp.service.AccountService.IAccountService;
import hcmute.hhkt.messengerapp.service.MessageService.IMessageService;
import hcmute.hhkt.messengerapp.service.UserService.IUserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class ReactServiceImpl implements IReactService {
    private final IUserService userService;
    private final IMessageService messageService;
    private final IAccountService accountService;
    private final ReactRepository reactRepository;

    //public ReactServiceImpl(ReactRepository reactRepository) {
    //    this.reactRepository = reactRepository;
    //}

    @Override
    @Transactional
    public ReactEmoji updateMessageWithReaction(ReactEmojiDTO reactEmojiDTO) {
        ReactEmoji.ReactEmojiBuilder reactEmojiBuilder = ReactEmoji.builder()
                .emoji(reactEmojiDTO.getEmoji());
        ReactEmoji reactEmoji = reactEmojiBuilder.build();
        // Liên kết với cuộc trò chuyện nếu có
        if (!StringUtils.isBlank(String.valueOf(reactEmojiDTO.getMessage_id()))) {
            reactEmoji.setMessage(messageService.findMessageById(UUID.fromString(reactEmojiDTO.getMessage_id())));
        }
        if (!StringUtils.isBlank(String.valueOf(reactEmojiDTO.getUser_id()))) {
            reactEmoji.setUser(userService.findById(UUID.fromString(reactEmojiDTO.getUser_id())));
        }
        reactEmoji.setIs_deleted(false);
        return reactRepository.save(reactEmoji);
    }

    @Override
    public List<ReactEmoji> getEmojiByMessageId(UUID id) {
        return (List<ReactEmoji>) reactRepository.findReactEmojiByMessage_Id(id);
    }
}
