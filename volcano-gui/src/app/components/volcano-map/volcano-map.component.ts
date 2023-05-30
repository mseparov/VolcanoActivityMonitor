import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '@env/environment';
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
      }
    });
  }

  /**
   * Displays volcano markers on the map.
   * @param data The volcano data to be displayed.
   */
  private displayVolcanos(data: any) {
    data.records.forEach((record: any) => {
      const coordinates = record.fields.coordinates;
      const name = record.fields.name;
  
      const marker = L.marker([coordinates[0], coordinates[1]]).addTo(this.map);
      marker.bindPopup(name);
    });
  }

}
