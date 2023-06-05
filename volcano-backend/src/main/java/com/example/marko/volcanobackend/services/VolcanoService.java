package com.example.marko.volcanobackend.services;

import com.example.marko.volcanobackend.models.VolcanoData;
import com.example.marko.volcanobackend.parser.XmlParser;
import com.example.marko.volcanobackend.services.PostgresManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.logging.Logger;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class VolcanoService {
    private static final Logger logger = Logger.getLogger(VolcanoService.class.getName());

    @Autowired
    private Environment environment;

    @Autowired
    private XmlParser xmlParser;

    @PostConstruct
    public void volcanoDataOnStartup() {
        // Get data from the environment file
        String apiUrl = environment.getProperty("volcano.api.url");
        String jdbcUrl = environment.getProperty("postgresql.jdbcUrl");
        String username = environment.getProperty("postgresql.username");
        String password = environment.getProperty("postgresql.password");

        // Fetch the XML data from the API
        String xmlData = fetchDataFromApi(apiUrl);

        // Parse the XML data
        try {
            // Parse the string XML data and return a list of pojo objects representing volcanoes
            List<VolcanoData> volcanoDataList = xmlParser.parseXmlData(xmlData);

            // Save the JSON data to the database or perform other operations
            // Create a PostgresManager instance
            PostgresManager postgresManager = PostgresManager.getInstance(jdbcUrl, username, password);
            postgresManager.saveInitialDataToDatabase(volcanoDataList);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String fetchDataFromApi(String apiUrl) {
        // Create an instance of HttpClient
        HttpClient httpClient = HttpClient.newHttpClient();

        // Create an instance of HttpRequest
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Accept", "application/xml")
                .build();

        // Send the GET request and receive the response
        HttpResponse<String> response;
        try {
            response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }

        // Get the response body
        String responseBody = response.body();

        // Print the response body
        //System.out.println("Response Body:");
        //System.out.println(responseBody);

        return responseBody;
    }


}
