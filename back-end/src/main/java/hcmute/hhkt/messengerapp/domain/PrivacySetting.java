package hcmute.hhkt.messengerapp.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name ="privacy_settings")
public class PrivacySetting {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private UUID id;

    @Builder.Default
    @Column(name="use_bad_word_filter")
    private boolean useBadWordFilter = false;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
