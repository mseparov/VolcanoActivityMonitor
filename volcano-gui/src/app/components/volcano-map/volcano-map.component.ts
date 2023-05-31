import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '@env/environment';
import { mockVolcanoData } from '@env/mock-data';
import { VolcanoService } from 'src/app/services/volcano.service';

/**
 * Component responsible for displaying a map with volcano markers.
 */
@Component({
  selector: 'app-volcano-map',
  templateUrl: './volcano-map.component.html',
  styleUrls: ['./volcano-map.component.css']
})
export class VolcanoMapComponent implements OnInit {

  map!: L.Map;

  // Mock data
  volcanoes = mockVolcanoData;

  /**
   * Creates an instance of VolcanoMapComponent.
   * @param volcanoService The service for fetching volcano data.
   */
  constructor(private volcanoService: VolcanoService) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.initializeMap();
    this.loadVolcanoData();
  }


    /**
   * Initializes the Leaflet map.
   */
    private initializeMap() {
      this.map = L.map("map").setView([environment.mapInitialLatitude, environment.mapInitialLongitude], environment.mapInitialZoom);
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  

  /**
   * Loads the volcano data from the service and calls displayVolcanos(data) function.
   */
  private loadVolcanoData() {
    this.volcanoService.getVolcanoData().subscribe({
      next: (data) => {
        this.displayVolcanos(data);
      },
      error: (error) => {
        console.log("Couldn't get volcano data...", error);
        this.displayVolcanos(mockVolcanoData)
      }
    });
  }

  /**
   * Displays volcano markers on the map.
   * @param data The volcano data to be displayed.
   */
  private displayVolcanos(data: any) {
    data.forEach((volcano: any) => {
      const latitude = volcano.latitude;
      const longitude = volcano.longitude;
      const name = volcano.name;
  
      const markerIcon = L.icon({
        iconUrl: '../../assets/volcanoIcon.png', // Replace with the actual path to your marker icon
        iconSize: [25, 25], // Adjust the size of the icon as per your requirements
        iconAnchor: [12, 41], // Adjust the anchor point of the icon as per your requirements
        popupAnchor: [1, -34] // Adjust the anchor point of the popup as per your requirements
      });
  
      const marker = L.marker([latitude, longitude], { icon: markerIcon }).addTo(this.map);
      marker.bindPopup(name);
    
    
    // Create the content for the popup
    const popupContent = `
    <app-volcano-popup [volcano]="volcano"></app-volcano-popup>
  `;
  
    // Set the content of the popup
    marker.bindPopup(popupContent, { minWidth: 300 }); // Adjust the minWidth as per your requirements
  });

  }

}
