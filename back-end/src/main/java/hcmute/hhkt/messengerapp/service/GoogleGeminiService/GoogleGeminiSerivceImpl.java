package hcmute.hhkt.messengerapp.service.GoogleGeminiService;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class GoogleGeminiSerivceImpl implements IGoogleGeminiService{
    @Value("${google-gemini.project-id}")
    private String projectId;
    @Value("${google-gemini.location}")
    private String location;
    @Value("${google-gemini.model-name}")
    private String modelName;
    final String CHECK_BAD_WORD_PROMPT = "Answer with 1 for true or 0 for false - lowercase, no space or dot. Check if the following text contains any offensive, harmful, discriminatory, or otherwise inappropriate content, moderate swearing or joke is acceptable: \n";
    final String CHECK_BAD_WORD_YES_RESPONSE = "1";
    final String CHECK_BAD_WORD_NO_RESPONSE = "0";

    final String MODEL_SAFETY_BLOCK_EXCEPTION = "The response is blocked due to safety reason.";

    private final GenerativeModel geminiFlash;

    @Override
    public boolean checkContainBadWordFilter(String text) {
        try {
            String prompt = CHECK_BAD_WORD_PROMPT + text;
            GenerateContentResponse response = geminiFlash.generateContent(prompt);

            String output = ResponseHandler.getText(response);
            return Objects.equals(output.trim(), CHECK_BAD_WORD_YES_RESPONSE);
        }
        catch (Exception e){
            return e.getMessage().equals(MODEL_SAFETY_BLOCK_EXCEPTION);
        }
    }
}
