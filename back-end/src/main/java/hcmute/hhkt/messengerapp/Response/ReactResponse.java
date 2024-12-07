package hcmute.hhkt.messengerapp.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import hcmute.hhkt.messengerapp.domain.Message;
import hcmute.hhkt.messengerapp.domain.ReactEmoji;
import hcmute.hhkt.messengerapp.dto.ReactEmojiDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Getter
@Setter
@Builder
public class ReactResponse {
    @JsonProperty("id")
    private UUID id;
    @JsonProperty("emoji")
    private String emoji;

    @JsonProperty("user_id")
    private String user_id;

    @JsonProperty("message_id")
    private String message_id;

    @JsonProperty("is_deleted")
    private Boolean is_deleted;

    public static ReactResponse fromReactEmoji(ReactEmoji reactEmoji) {
        return ReactResponse.builder()
                .id(reactEmoji.getId())
                .emoji(reactEmoji.getEmoji())
                .user_id(String.valueOf(reactEmoji.getUser().getId()))
                .message_id(String.valueOf(reactEmoji.getMessage().getId()))
                .is_deleted(true)
                .build();
    }
    public static List<ReactResponse> fromReactEmojiList(List<ReactEmoji> emojiList){
        return emojiList.stream().map(ReactResponse::fromReactEmoji).toList();
    }
}
