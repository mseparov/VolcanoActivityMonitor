import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, publishLast, refCount, share} from 'rxjs';
import { environment } from '@env/environment';
import {Volcano} from "../models/volcano";
import {Activity} from "../models/activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = environment.apiVolcanoData; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  pushVolcanoActivity(activity:Activity): Observable<any> {
    return this.http.post(`${this.apiUrl}/volcanoes/activities`, activity).pipe(share({
      resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
  }

  deleteVolcanoActivity(volcanoId: number, activityId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/volcanoes/${volcanoId}/activities/${activityId}`, { responseType: 'text' }).pipe(share({
      resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
  }

}
