package com.example.marko.volcanobackend.services;

import com.example.marko.volcanobackend.models.VolcanoActivity;
import com.example.marko.volcanobackend.models.VolcanoData;
import org.postgresql.jdbc.PgArray;
import org.postgresql.util.PGobject;

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
                Object[] activityObjects = (Object[]) activitiesArray.getArray();

                for (Object activityObject : activityObjects) {
                    if (activityObject instanceof PGobject pgObject) {
                        String activityDataString = pgObject.getValue();

                        if (activityDataString != null) {
                            String[] activityFields = activityDataString.substring(1, activityDataString.length() - 1).split(",");

                            if (activityFields.length == 5) {
                                VolcanoActivity volcanoActivity = new VolcanoActivity();
                                volcanoActivity.setActivityId(Integer.parseInt(activityFields[0]));
                                volcanoActivity.setVEI(Integer.parseInt(activityFields[1]));
                                String activityType = activityFields[2].replaceAll("[\"']", "");
                                volcanoActivity.setType(activityType);
                                volcanoActivity.setStart(activityFields[3]);
                                volcanoActivity.setEnd(activityFields[4]);
                                volcanoData.getActivities().add(volcanoActivity);
                            }
                        }
                    }
                }
            }

            volcanoDataList.add(volcanoData);
        }

        statement.close();

        return volcanoDataList;
    }


    public void saveActivityData(VolcanoActivity volcanoActivity, int volcanoId) {
        try {
            String sql = "UPDATE volcanoes SET activities = array_append(activities, CAST(? AS volcano_activity)) WHERE number = ?";
            PreparedStatement statement = this.connection.prepareStatement(sql);

            // Manually construct the activity data string in the desired format
            String activityData = "(" +
                    volcanoActivity.getActivityId() + "," +
                    volcanoActivity.getVEI() + "," +
                    "'" + volcanoActivity.getType() + "'," +
                    "'" + volcanoActivity.getStart() + "'," +
                    "'" + volcanoActivity.getEnd() + "'" +
                    ")";

            // Set the parameters in the prepared statement
            statement.setString(1, activityData);
            statement.setInt(2, volcanoId);

            // Execute the update
            statement.executeUpdate();

            // Close the statement
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deleteActivity(int volcanoId, int activityId) {
        try {
            // First, retrieve the current activities of the volcano
            String selectSql = "SELECT activities FROM volcanoes WHERE number = ?";
            PreparedStatement selectStatement = this.connection.prepareStatement(selectSql);
            selectStatement.setInt(1, volcanoId);
            ResultSet resultSet = selectStatement.executeQuery();
            resultSet.next();
            Array activitiesArray = resultSet.getArray(1);
            Object[] currentActivities = (Object[]) activitiesArray.getArray();

            // Remove the activity with the specified ID from the activities array
            List<Object> updatedActivities = new ArrayList<>();
            for (Object activity : currentActivities) {
                if (activity instanceof PGobject pgObject) {
                    String activityDataString = pgObject.getValue();
                    if (activityDataString != null) {
                        String[] activityFields = activityDataString.substring(1, activityDataString.length() - 1).split(",");
                        int currentActivityId = Integer.parseInt(activityFields[0].trim());
                        if (currentActivityId != activityId) {
                            updatedActivities.add(activity);
                        }
                    }
                }
            }

            // Update the activities array in the database
            String updateSql = "UPDATE volcanoes SET activities = ? WHERE number = ?";
            PreparedStatement updateStatement = this.connection.prepareStatement(updateSql);
            updateStatement.setArray(1, this.connection.createArrayOf("volcano_activity", updatedActivities.toArray()));
            updateStatement.setInt(2, volcanoId);
            updateStatement.executeUpdate();

            // Close the statements
            selectStatement.close();
            updateStatement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void closeConnection() throws SQLException {
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }
}
