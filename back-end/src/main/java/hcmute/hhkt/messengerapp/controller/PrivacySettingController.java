package hcmute.hhkt.messengerapp.controller;

import hcmute.hhkt.messengerapp.Response.PrivacySettingResponse;
import hcmute.hhkt.messengerapp.constant.ExceptionMessage;
import hcmute.hhkt.messengerapp.domain.PrivacySetting;
import hcmute.hhkt.messengerapp.domain.User;
import hcmute.hhkt.messengerapp.dto.PrivacySettingDTO;
import hcmute.hhkt.messengerapp.service.GoogleGeminiService.GoogleGeminiSerivceImpl;
import hcmute.hhkt.messengerapp.service.PrivacySettingService.IPrivacySettingService;
import hcmute.hhkt.messengerapp.service.UserService.IUserService;
import hcmute.hhkt.messengerapp.util.SecurityUtil;
import hcmute.hhkt.messengerapp.util.annotation.ApiMessage;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/privacySettings")
@RequiredArgsConstructor
public class PrivacySettingController {
    private final Logger log = LoggerFactory.getLogger(PrivacySettingController.class);
    private final IPrivacySettingService privacySettingService;
    private final IUserService userService;
    private final GoogleGeminiSerivceImpl googleGeminiSerivce;

    @GetMapping("")
    @ApiMessage("Fetched user's private setting")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<?> getUserPrivateSetting(){
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        log.debug("Api request to get user privacy setting from {}", email);

        User user = userService.findUserByEmail(email);
        if(user == null){
            throw new IllegalArgumentException(ExceptionMessage.USER_NOT_EXIST);
        }

        PrivacySetting privacySetting = privacySettingService.findByUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(PrivacySettingResponse.fromPrivacySetting(privacySetting));
    }

    @PutMapping("")
    @ApiMessage("Updated user's private setting")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<?> updateUserPrivateSetting(@Valid @RequestBody PrivacySettingDTO privacySettingDTO){
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        log.debug("Api request to update user privacy setting from {}", email);

        User user = userService.findUserByEmail(email);
        PrivacySetting privacySetting = privacySettingService.findByUser(user);

        privacySetting = privacySettingService.updatePrivacySetting(privacySetting, privacySettingDTO);
        return ResponseEntity.status(HttpStatus.OK).body(PrivacySettingResponse.fromPrivacySetting(privacySetting));
    }

    @GetMapping("/{text}")
    public ResponseEntity<?> testGemini(@PathVariable String text){
        boolean result = googleGeminiSerivce.checkContainBadWordFilter(text);
        String response = result ? "YES" : "NO";
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
