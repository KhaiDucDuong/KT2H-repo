package hcmute.hhkt.messengerapp.service.PrivacySettingService;

import hcmute.hhkt.messengerapp.domain.PrivacySetting;
import hcmute.hhkt.messengerapp.domain.User;
import hcmute.hhkt.messengerapp.dto.PrivacySettingDTO;

import java.util.UUID;

public interface IPrivacySettingService {
    PrivacySetting findByUser(User user);
    PrivacySetting updatePrivacySetting(PrivacySetting privacySetting, PrivacySettingDTO privacySettingDTO);
}
