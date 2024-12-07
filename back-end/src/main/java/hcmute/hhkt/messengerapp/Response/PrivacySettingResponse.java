package hcmute.hhkt.messengerapp.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import hcmute.hhkt.messengerapp.domain.PrivacySetting;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PrivacySettingResponse {
    @JsonProperty("use_bad_word_filter")
    private boolean useBadWordFilter;

    public static PrivacySettingResponse fromPrivacySetting(PrivacySetting privacySetting){
        return PrivacySettingResponse.builder()
                .useBadWordFilter(privacySetting.isUseBadWordFilter())
                .build();
    }
}
