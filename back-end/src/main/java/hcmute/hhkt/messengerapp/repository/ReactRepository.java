package hcmute.hhkt.messengerapp.repository;

import hcmute.hhkt.messengerapp.domain.Message;
import hcmute.hhkt.messengerapp.domain.ReactEmoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ReactRepository extends JpaRepository<ReactEmoji, UUID> {
    ReactEmoji findReactEmojiByMessage_Id (UUID uuid);
}
