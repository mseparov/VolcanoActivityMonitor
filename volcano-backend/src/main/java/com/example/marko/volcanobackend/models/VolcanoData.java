package com.example.marko.volcanobackend.models;

public class VolcanoData {
    private String volcanoName;
    private String primaryVolcanoType;
    private String country;
    private String vei;
    private String activityType;
    private String activityStart;
    private String activityEnd;

    public String getVolcanoName() {
        return volcanoName;
    }

    public void setVolcanoName(String volcanoName) {
        this.volcanoName = volcanoName;
    }

    public String getPrimaryVolcanoType() {
        return primaryVolcanoType;
    }

    public void setPrimaryVolcanoType(String primaryVolcanoType) {
        this.primaryVolcanoType = primaryVolcanoType;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getVei() {
        return vei;
    }

    public void setVei(String vei) {
        this.vei = vei;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getActivityStart() {
        return activityStart;
    }

    public void setActivityStart(String activityStart) {
        this.activityStart = activityStart;
    }

    public String getActivityEnd() {
        return activityEnd;
    }

    public void setActivityEnd(String activityEnd) {
        this.activityEnd = activityEnd;
    }
}
