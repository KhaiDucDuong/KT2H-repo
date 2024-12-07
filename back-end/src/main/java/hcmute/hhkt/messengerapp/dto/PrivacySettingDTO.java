package hcmute.hhkt.messengerapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivacySettingDTO {
    @JsonProperty("use_bad_word_filter")
    @NotNull(message = "Invalid bad word filter data")
    private boolean useBadWordFilter;
}
