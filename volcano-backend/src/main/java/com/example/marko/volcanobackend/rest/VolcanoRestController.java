package com.example.marko.volcanobackend.rest;

import com.example.marko.volcanobackend.models.VolcanoData;
import com.example.marko.volcanobackend.services.PostgresManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.PostConstruct;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/volcanoes")
public class VolcanoRestController {

    @Autowired
    private Environment environment;

    private String jdbcUrl;
    private String username;
    private String password;

    @PostConstruct
    public void init() {
        // Get data from the environment file
        jdbcUrl = environment.getProperty("postgresql.jdbcUrl");
        username = environment.getProperty("postgresql.username");
        password = environment.getProperty("postgresql.password");
    }

    @GetMapping
    public ResponseEntity<Object> getVolcanoData() {
        try {
            // Retrieve all volcano data from the PostgresManager
            // Create a PostgresManager instance
            PostgresManager postgresManager = PostgresManager.getInstance(jdbcUrl, username, password);
            List<VolcanoData> volcanoDataList = postgresManager.getAllVolcanoData();

            // Return the retrieved data as the response
            return ResponseEntity.ok(volcanoDataList);

        } catch (SQLException e) {
            e.printStackTrace();
            // Return an error response if an exception occurs
            return ResponseEntity.status(500).body("Error fetching volcano data from the database.");
        }
    }
}
