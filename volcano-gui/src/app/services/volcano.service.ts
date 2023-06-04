import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class VolcanoService {
  private apiUrl = environment.apiVolcanoData; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getVolcanoData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addVolcanoActivity(activity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/activities`, activity);
  }

  getVolcanoActivities(volcanoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/activities/${volcanoId}`);
  }
}
