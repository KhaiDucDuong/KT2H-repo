package hcmute.hhkt.messengerapp.service.PrivacySettingService;

import hcmute.hhkt.messengerapp.constant.ExceptionMessage;
import hcmute.hhkt.messengerapp.domain.PrivacySetting;
import hcmute.hhkt.messengerapp.domain.User;
import hcmute.hhkt.messengerapp.dto.PrivacySettingDTO;
import hcmute.hhkt.messengerapp.repository.PrivacySettingRepository;
import hcmute.hhkt.messengerapp.service.UserService.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrivacySettingServiceImpl implements IPrivacySettingService {
    private final PrivacySettingRepository privacySettingRepository;
    private final IUserService userService;

    @Override
    public PrivacySetting findByUser(User user) {
        PrivacySetting privacySetting = privacySettingRepository.getPrivacySettingByUser(user);
        if(privacySetting == null){
            privacySetting = PrivacySetting.builder()
                    .user(user)
                    .build();
            privacySetting = privacySettingRepository.save(privacySetting);
        }
        return privacySetting;
    }

    @Override
    public PrivacySetting updatePrivacySetting(PrivacySetting privacySetting, PrivacySettingDTO privacySettingDTO) {
        if(privacySetting == null) throw new IllegalArgumentException(ExceptionMessage.PRIVACY_SETTING_DOES_NOT_EXIST);

//        boolean newUseBadWordFilter = privacySettingDTO.getUseBadWordFilter().equals("yes");
        privacySetting.setUseBadWordFilter(privacySettingDTO.isUseBadWordFilter());
        return privacySettingRepository.save(privacySetting);
    }
}
