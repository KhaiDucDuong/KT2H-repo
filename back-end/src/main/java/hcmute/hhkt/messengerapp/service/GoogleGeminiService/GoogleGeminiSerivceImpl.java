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
    final String CHECK_BAD_WORD_PROMPT = "Answer with 1 for true or 0 for false - lowercase, no space or dot. Check if the following text contains any bad or swear words: \n";
    final String CHECK_BAD_WORD_YES_RESPONSE = "1";
    final String CHECK_BAD_WORD_NO_RESPONSE = "0";

    @Override
    public boolean checkContainBadWordFilter(String text) {
        try (VertexAI vertexAI = new VertexAI(projectId, location)) {
            GenerativeModel model = new GenerativeModel(modelName, vertexAI);

            String prompt = CHECK_BAD_WORD_PROMPT + text;
            GenerateContentResponse response = model.generateContent(prompt);

            String output = ResponseHandler.getText(response);
            return Objects.equals(output.trim(), CHECK_BAD_WORD_YES_RESPONSE);
        }
        catch (Exception e){
            return true;
        }
    }
}
