package hcmute.hhkt.messengerapp.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import hcmute.hhkt.messengerapp.domain.ReactEmoji;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReactEmojiDTO {
    @JsonProperty("id")
    private String id;

    @JsonProperty("emoji")
    private String emoji;

    @JsonProperty("user_id")
    private String user_id;

    @JsonProperty("message_id")
    private String message_id;

    @JsonProperty("is_deleted")
    private Boolean is_deleted;

    public static ReactEmojiDTO fromReactEmoji(ReactEmoji reactEmoji) {
        return ReactEmojiDTO.builder()
                .id(String.valueOf(reactEmoji.getId()))
                .emoji(reactEmoji.getEmoji())
                .user_id(String.valueOf(reactEmoji.getUser().getId()))
                .message_id(String.valueOf(reactEmoji.getMessage().getId()))
                .build();
    }
}
