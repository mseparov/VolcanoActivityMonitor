package com.example.marko.volcanobackend.services;

import com.example.marko.volcanobackend.models.VolcanoActivity;
import com.example.marko.volcanobackend.models.VolcanoData;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PostgresManager {
    private final String jdbcUrl;
    private final String username;
    private final String password;

    private Connection connection;
    private static PostgresManager instance;

    private PostgresManager(String jdbcUrl, String username, String password) throws SQLException {
        this.jdbcUrl = jdbcUrl;
        this.username = username;
        this.password = password;
        this.connection = establishConnection();
    }

    public static synchronized PostgresManager getInstance(String jdbcUrl, String username, String password) throws SQLException {
        if (instance == null) {
            instance = new PostgresManager(jdbcUrl, username, password);
        } else {
            if (!instance.jdbcUrl.equals(jdbcUrl) || !instance.username.equals(username) || !instance.password.equals(password)) {
                instance.closeConnection();
                instance = new PostgresManager(jdbcUrl, username, password);
            }
        }
        return instance;
    }

    public Connection establishConnection() throws SQLException {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return DriverManager.getConnection(this.jdbcUrl, this.username, this.password);
    }

    public void saveInitialDataToDatabase(List<VolcanoData> volcanoDataList) {
        try {
            String checkSql = "SELECT COUNT(*) FROM volcanoes WHERE name = ?";
            String insertSql = "INSERT INTO volcanoes (number, name, type, location, latitude, longitude, elevation, activities) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement checkStatement = this.connection.prepareStatement(checkSql);
            PreparedStatement insertStatement = this.connection.prepareStatement(insertSql);

            for (VolcanoData volcanoData : volcanoDataList) {
                checkStatement.setString(1, volcanoData.getName());
                ResultSet resultSet = checkStatement.executeQuery();
                resultSet.next();
                int count = resultSet.getInt(1);

                if (count == 0) {
                    insertStatement.setInt(1, volcanoData.getNumber());
                    insertStatement.setString(2, volcanoData.getName());
                    insertStatement.setString(3, volcanoData.getType());
                    insertStatement.setString(4, volcanoData.getLocation());
                    insertStatement.setDouble(5, volcanoData.getLatitude());
                    insertStatement.setDouble(6, volcanoData.getLongitude());
                    insertStatement.setInt(7, volcanoData.getElevation());

                    Object[] activitiesArray = volcanoData.getActivities().toArray();
                    Array activitiesSqlArray = this.connection.createArrayOf("volcano_activity", activitiesArray);
                    insertStatement.setArray(8, activitiesSqlArray);

                    insertStatement.executeUpdate();
                }
            }

            checkStatement.close();
            insertStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<VolcanoData> getAllVolcanoData() throws SQLException {
        List<VolcanoData> volcanoDataList = new ArrayList<>();

        String sql = "SELECT * FROM volcanoes";
        PreparedStatement statement = this.connection.prepareStatement(sql);
        ResultSet resultSet = statement.executeQuery();

        while (resultSet.next()) {
            VolcanoData volcanoData = new VolcanoData();
            volcanoData.setNumber(resultSet.getInt("number"));
            volcanoData.setName(resultSet.getString("name"));
            volcanoData.setType(resultSet.getString("type"));
            volcanoData.setLocation(resultSet.getString("location"));
            volcanoData.setElevation(resultSet.getInt("elevation"));
            volcanoData.setLatitude(resultSet.getDouble("latitude"));
            volcanoData.setLongitude(resultSet.getDouble("longitude"));

            Array activitiesArray = resultSet.getArray("activities");

            if (activitiesArray != null) {
                Object[] activities = (Object[]) activitiesArray.getArray();
                for (Object activity : activities) {
                    Object[] activityData = (Object[]) activity;
                    VolcanoActivity volcanoActivity = new VolcanoActivity();
                    volcanoActivity.setVEI((int) activityData[0]);
                    volcanoActivity.setType((String) activityData[1]);
                    volcanoActivity.setStart(activityData[2].toString());
                    volcanoActivity.setEnd(activityData[3].toString());
                    volcanoData.getActivities().add(volcanoActivity);
                }
            }

            volcanoDataList.add(volcanoData);
        }

        statement.close();

        return volcanoDataList;
    }

    public void closeConnection() throws SQLException {
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }
}
