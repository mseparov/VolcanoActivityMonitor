package com.example.marko.volcanobackend.parser;

import com.example.marko.volcanobackend.models.VolcanoData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class XmlParser {

    private final ObjectMapper objectMapper;

    public XmlParser(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<VolcanoData> parseXmlData(String xmlData) {
        List<VolcanoData> volcanoDataList = new ArrayList<>();

        Pattern featurePattern = Pattern.compile("<gml:featureMember>(.*?)</gml:featureMember>");
        Matcher featureMatcher = featurePattern.matcher(xmlData);

        while (featureMatcher.find()) {
            String featureData = featureMatcher.group(1);

            // Extract the required fields from the featureData using regular expressions
            String volcanoName = extractField(featureData, "<GVP-VOTW:Volcano_Name>(.*?)</GVP-VOTW:Volcano_Name>");
            String primaryVolcanoType = extractField(featureData, "<GVP-VOTW:Primary_Volcano_Type>(.*?)</GVP-VOTW:Primary_Volcano_Type>");
            String country = extractField(featureData, "<GVP-VOTW:Country>(.*?)</GVP-VOTW:Country>");
            String vei = extractField(featureData, "<GVP-VOTW:VEI>(.*?)</GVP-VOTW:VEI>");

            // Create a new VolcanoData object with the extracted fields
            VolcanoData volcanoData = new VolcanoData();
            volcanoData.setVolcanoName(volcanoName);
            volcanoData.setPrimaryVolcanoType(primaryVolcanoType);
            volcanoData.setCountry(country);
            volcanoData.setVei(vei);

            // Add the VolcanoData object to the list
            volcanoDataList.add(volcanoData);

            System.out.println(volcanoData.toString());

        }

        return volcanoDataList;
    }

    private String extractField(String data, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(data);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

}