package com.example.marko.volcanobackend.models;

public class VolcanoActivity {
    private int VEI;
    private String type;
    private String start;
    private String end;

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

    @Override
    public String toString() {
        return "Activity{" +
                "VEI=" + VEI +
                ", type='" + type + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }
}
