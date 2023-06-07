import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '@env/environment';
import {VolcanoStore} from "../../stores/volcano.store";
import {Volcano} from "../../models/volcano";
import {BehaviorSubject, Observable} from "rxjs";

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
  
  // Current Volcano
  volcano$!:Observable<Volcano>;

  markerIcon:L.Icon = L.icon({
    iconUrl: '../../assets/volcanoIcon.png', // Replace with the actual path to your marker icon
    iconSize: [30, 30], // Adjust the size of the icon as per your requirements
    iconAnchor: [12, 41], // Adjust the anchor point of the icon as per your requirements
    popupAnchor: [3, -44] // Adjust the anchor point of the popup as per your requirements
  });

  defaultIcon:L.Icon = L.icon({
    iconUrl: '../../assets/defaultIcon.png', // Replace with the actual path to your marker icon
    iconSize: [34, 34], // Adjust the size of the icon as per your requirements
    iconAnchor: [14, 41], // Adjust the anchor point of the icon as per your requirements
    popupAnchor: [3, -44] // Adjust the anchor point of the popup as per your requirements
  });

  /**
   * Creates an instance of VolcanoMapComponent.
   * @param volcanoService The service for fetching volcano data.
   * @param resolver The component factory resolver.
   * @param injector The injector for dynamic component creation.
   */
  constructor(
    private volcanoStore: VolcanoStore,
  ) { 
    this.volcano$ = this.volcanoStore.volcano$;
  }

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
    this.map = L.map("map").setView(
      [environment.mapInitialLatitude, 
      environment.mapInitialLongitude],
      environment.mapInitialZoom
    );
  
    const openStreetMapLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
  
    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          '&copy; <a href="https://www.arcgis.com/">Esri</a>',
      }
    );
  
    openStreetMapLayer.addTo(this.map);
  
    const baseMaps = {
      "OpenStreetMap": openStreetMapLayer,
      "Satellite": satelliteLayer,
    };
  
    L.control.layers(baseMaps).addTo(this.map);
  }
  

  /**
   * Loads the volcano data from the service and calls displayVolcanos(data) function.
   */
  private loadVolcanoData() {
    this.volcanoStore.volcanoes$.subscribe({
      next: (data) => {
        this.displayVolcanos(data);
        console.log(data);
      }
    });
    this.volcanoStore.getVolcanoData();
  }

  /**
   * Displays volcano markers on the map.
   * @param data The volcano data to be displayed.
   */
  private displayVolcanos(data: any) {
    const _this = this;
    data.forEach((volcano: any) => {
      let popup = `
      <div>
        <table style="width: 100%">
          <tr>
            <th style="text-align: center;">Name</th>
            <td style="text-align: center;">${volcano.name}</td>
          </tr>
          <tr>
            <th style="text-align: center;">Location</th>
            <td style="text-align: center;">${volcano.location}</td>
          </tr>
          <tr>
            <th style="text-align: center;">Elevation</th>
            <td style="text-align: center;">${volcano.elevation}</td>
          </tr>
          <tr>
            <th style="text-align: center;">Type</th>
            <td style="text-align: center;">${volcano.type}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">
              <button style="display: inline-block; padding: 8px 16px; font-size: 14px;
              font-weight: 400; text-align: center; text-decoration: none; background-color: #4c6ef5;
              color: #ffffff; border: none; border-radius: 8px; cursor: pointer;
              transition: background-color 0.3s ease;" class="activities submitButton">
              Activities</button>
            </td>
          </tr>
        </table>
    </div>
    `
      const latitude = volcano.latitude;
      const longitude = volcano.longitude;
      const name = volcano.name;

      const marker = L.marker([latitude, longitude], { icon: this.markerIcon }).addTo(this.map);

      // Set the content of the popup
      marker.bindPopup(popup, { minWidth: 100 });

      marker.on('popupopen', (a) => {
        marker.setIcon(this.defaultIcon);
        a.target.getPopup().getElement()
          .querySelector(".activities")
          .addEventListener("click", () => {
            _this.displayPopupData(volcano);
          })

      });

      marker.on('popupclose', () => {
        marker.setIcon(this.markerIcon);
        this.volcanoStore.clearSingleVolcano();
      });


    });
  }

  displayPopupData(volcano: Volcano) {
    this.volcanoStore.pushSingleVolcano(volcano);
  }

}
