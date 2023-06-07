import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, publishLast, refCount, share} from 'rxjs';
import { environment } from '@env/environment';
import {Volcano} from "../models/volcano";
import {Activity} from "../models/activity";

@Injectable({
  providedIn: 'root'
})
export class VolcanoService {
  private apiUrl = environment.apiVolcanoData; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getVolcanoData(): Observable<Volcano[]> {
    return this.http.get<Volcano[]>(`${this.apiUrl}/volcanoes`).pipe(share({
      resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
  }

}
