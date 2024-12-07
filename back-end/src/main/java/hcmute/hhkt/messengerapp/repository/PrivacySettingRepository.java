package hcmute.hhkt.messengerapp.repository;

import hcmute.hhkt.messengerapp.domain.PrivacySetting;
import hcmute.hhkt.messengerapp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PrivacySettingRepository extends JpaRepository<PrivacySetting, UUID> {
    PrivacySetting getPrivacySettingByUser(User user);
}
