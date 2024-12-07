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
@Table(name ="react")
public class ReactEmoji extends AbstractDateAuditingEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id", referencedColumnName = "id")
    private Message message;

    @Column(name = "emoji", unique = false, columnDefinition = "TEXT")
    private String emoji;

    @Column(name = "is_deleted", unique = false, columnDefinition = "TEXT")
    private Boolean is_deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
