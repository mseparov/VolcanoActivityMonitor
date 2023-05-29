import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '@env/environment';


@Component({
  selector: 'app-volcano-map',
  templateUrl: './volcano-map.component.html',
  styleUrls: ['./volcano-map.component.css']
})
export class VolcanoMapComponent implements OnInit {

  map!: L.Map;

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = L.map("map").setView([environment.mapInitialLatitude, environment.mapInitialLongitude], environment.mapInitialZoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}