package com.example.marko.volcanobackend.models;

public class VolcanoActivity {

    private Integer activityId;
    private Integer volcanoId; // Optional volcano ID
    private int VEI;
    private String type;
    private String start;
    private String end;

    public Integer getVolcanoId() {
        return volcanoId;
    }

    public void setVolcanoId(Integer volcanoId) {
        this.volcanoId = volcanoId;
    }

    public int getVEI() {
        return VEI;
    }

    public void setVEI(int VEI) {
        this.VEI = VEI;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }

    @Override
    public String toString() {
        return "VolcanoActivity{" +
                "activityId=" + activityId +
                "volcanoId=" + volcanoId +
                ", VEI=" + VEI +
                ", type='" + type + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }
}
