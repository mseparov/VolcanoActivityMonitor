package com.example.marko.volcanobackend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/volcanoes")
public class VolcanoRestController {

    @Autowired
    private Environment environment;

    @GetMapping
    public ResponseEntity<Object> getVolcanoData() {

        return ResponseEntity.ok("Data fetched from the database");
    }

}
