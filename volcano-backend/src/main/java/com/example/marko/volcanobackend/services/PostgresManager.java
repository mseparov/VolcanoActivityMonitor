package com.example.marko.volcanobackend.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class PostgresManager {
    private final String jdbcUrl;
    private final String username;
    private final String password;

    public PostgresManager(String jdbcUrl, String username, String password) {
        this.jdbcUrl = jdbcUrl;
        this.username = username;
        this.password = password;
    }

    public Connection establishConnection() throws SQLException {
        try {
            // Load the PostgreSQL JDBC driver
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        // Create a connection to the PostgreSQL server
        return DriverManager.getConnection(jdbcUrl, username, password);
    }
}