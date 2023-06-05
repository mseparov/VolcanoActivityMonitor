import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '@env/environment';
import { mockVolcanoData } from '@env/mock-data';
import { VolcanoService } from 'src/app/services/volcano.service';
import { VolcanoPopupComponent } from 'src/app/components/volcano-popup/volcano-popup.component';

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
    private volcanoService: VolcanoService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

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
    this.volcanoService.getVolcanoData().subscribe({
      next: (data) => {
        this.displayVolcanos(data);
        console.log(data);
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

      const marker = L.marker([latitude, longitude], { icon: this.markerIcon }).addTo(this.map);

      // Create an instance of VolcanoPopupComponent and pass the volcano data
      const componentFactory = this.resolver.resolveComponentFactory(VolcanoPopupComponent);
      const component = componentFactory.create(this.injector);
      component.instance.volcano = volcano;
      component.changeDetectorRef.detectChanges();

      // Get the HTML content of the component
      const content = component.location.nativeElement.innerHTML;

      // Set the content of the popup
      marker.bindPopup(content, { minWidth: 450 });

      marker.on('popupopen', () => {
        marker.setIcon(this.defaultIcon);
      });

      marker.on('popupclose', () => {
        marker.setIcon(this.markerIcon);
      });
      

    });
  }
}
