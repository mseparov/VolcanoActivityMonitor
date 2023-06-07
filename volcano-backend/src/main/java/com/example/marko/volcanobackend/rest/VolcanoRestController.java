package com.example.marko.volcanobackend.rest;

import com.example.marko.volcanobackend.models.VolcanoActivity;
import com.example.marko.volcanobackend.models.VolcanoData;
import com.example.marko.volcanobackend.services.PostgresManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

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

    @PostMapping("/activities")
    public ResponseEntity<Object> addVolcanoActivity(@RequestBody VolcanoActivity activity) {
        try {
            // Create a PostgresManager instance
            PostgresManager postgresManager = PostgresManager.getInstance(jdbcUrl, username, password);

            System.out.println(activity);
            System.out.println(activity.getVolcanoId());

            // Call the function in the PostgresManager to add the activity
            postgresManager.saveActivityData(activity, activity.getVolcanoId());

            // Return a success response
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (SQLException e) {
            e.printStackTrace();
            // Return an error response if an exception occurs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding volcano activity.");
        }
    }

    @DeleteMapping("/{volcanoId}/activities/{activityId}")
    public ResponseEntity<Object> deleteVolcanoActivity(@PathVariable int volcanoId, @PathVariable int activityId) {
        try {
            // Create a PostgresManager instance
            PostgresManager postgresManager = PostgresManager.getInstance(jdbcUrl, username, password);

            // Call the function in the PostgresManager to delete the activity
            postgresManager.deleteActivity(volcanoId, activityId);

            // Return a success response
            return ResponseEntity.ok("Activity deleted successfully");
        } catch (SQLException e) {
            e.printStackTrace();
            // Return an error response if an exception occurs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting volcano activity.");
        }
    }



}
