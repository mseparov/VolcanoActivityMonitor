package com.example.marko.volcanobackend.models;

import java.util.ArrayList;
import java.util.List;

public class VolcanoData {
    private int number;
    private String name;
    private String location;
    private double latitude;
    private double longitude;
    private int elevation;
    private String type;
    private List<VolcanoActivity> activities = new ArrayList<>();

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getElevation() {
        return elevation;
    }

    public void setElevation(int elevation) {
        this.elevation = elevation;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<VolcanoActivity> getActivities() {
        return activities;
    }

    public void setActivities(List<VolcanoActivity> activities) {
        this.activities = activities;
    }

    @Override
    public String toString() {
        return "VolcanoData{" +
                "number=" + number +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", elevation=" + elevation +
                ", type='" + type + '\'' +
                ", activities=" + activities +
                '}';
    }
}
