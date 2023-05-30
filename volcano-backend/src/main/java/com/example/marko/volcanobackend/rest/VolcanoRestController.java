package com.example.marko.volcanobackend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/volcanoes")
public class VolcanoRestController {

    @Autowired
    private Environment environment;

    @GetMapping
    public ResponseEntity<Object> getVolcanoData() {
        String apiUrl = environment.getProperty("volcano.api.url");

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);
        return response;
    }

}
