package hcmute.hhkt.messengerapp.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerationConfig;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class GoogleConfiguration {
    @Value("${google-gemini.service-account-name}")
    private String vertexAiServiceAccountName;
    @Value("${google-gemini.project-id}")
    private String projectId;
    @Value("${google-gemini.location}")
    private String location;
    @Value("${google-gemini.model-name}")
    private String modelName;
    @Bean
    GoogleCredentials vertexAiGoogleCredentials() throws IOException {
        InputStream serviceAccountStream = new ClassPathResource(vertexAiServiceAccountName).getInputStream();
        return GoogleCredentials.fromStream(serviceAccountStream).createScoped("https://www.googleapis.com/auth/cloud-platform");
    }

    @Bean
    VertexAI vertexAI(GoogleCredentials vertexAiGoogleCredentials) throws IOException{
        return new VertexAI.Builder()
        .setProjectId(projectId)
        .setLocation(location)
        .setCredentials(vertexAiGoogleCredentials)
        .build();
    }

    @Bean
    GenerativeModel geminiFlash(VertexAI vertexAI) {
//        final GenerationConfig generationConfig = GenerationConfig.newBuilder()
//                .setMaxOutputTokens(2048)
//                .setTemperature(0.4F)
//                .setTopK(32)
//                .setTopP(1)
//                .build();

        return new GenerativeModel(modelName, vertexAI);
    }
}
