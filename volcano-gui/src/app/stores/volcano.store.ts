import {Injectable} from "@angular/core";

import {Volcano} from "../models/volcano";
import {Activity} from "../models/activity";
import {BehaviorSubject, Observable} from "rxjs";
import {VolcanoService} from "../services/volcano.service";
import { ActivityService } from "../services/activity.service";
import { mockVolcanoData } from '@env/mock-data';
import {error} from "ol/console";

@Injectable({
  providedIn: 'root'
})
export class VolcanoStore {

  private volcanoesSubject:BehaviorSubject<Volcano[]> = new BehaviorSubject<Volcano[]>([]);
  public readonly volcanoes$:Observable<Volcano[]> = this.volcanoesSubject.asObservable();
  private volcanoSubject:BehaviorSubject<Volcano> = new BehaviorSubject<Volcano>(new Volcano());
  public readonly volcano$:Observable<Volcano> = this.volcanoSubject.asObservable();

  constructor(private volcanoService:VolcanoService, private activityService:ActivityService) {
  }

  getVolcanoData():Observable<Volcano[]> {
    const observable = this.volcanoService.getVolcanoData();
    observable.subscribe({
      next: (volcanos) => {
        this.volcanoesSubject.next(volcanos);
      },
      error: (error) => {
        this.volcanoesSubject.next(mockVolcanoData)
      }
    });
    return observable;
  }

  pushVolcanoActivity(activity: Activity) {
    // Generate a unique ID for the activity
    const activityId = this.generateActivityId();
    activity.activityId = activityId;

    const observable = this.activityService.pushVolcanoActivity(activity);
    observable.subscribe({
      next: () => {
        // Retrieve the updated volcano data after the activity is successfully pushed
        this.getVolcanoData().subscribe({
          next: (volcanoes) => {
            const volcano = volcanoes.find(v => v.number === activity.volcanoId);
            if (volcano) {
              this.pushSingleVolcano(volcano);
            }
          },
          error: (error) => {
            // Handle the error, e.g., display an error message
            console.log('Error retrieving updated volcano data:', error);
          }
        });
      },
      error: (error) => {
        // Handle the error, e.g., display an error message
        console.log('Error pushing volcano activity:', error);
      }
    });
    return observable;
  }

  deleteVolcanoActivity(volcanoId: number, activityId: number) {
    const observable = this.activityService.deleteVolcanoActivity(volcanoId, activityId);
  
    observable.subscribe({
      next: () => {
        // Retrieve the updated volcano data after the activity is successfully deleted
        this.getVolcanoData().subscribe({
          next: (volcanoes) => {
            const volcano = volcanoes.find(v => v.number === volcanoId);
            if (volcano) {
              // Remove the deleted activity from the volcano object
              volcano.activities = volcano.activities.filter(a => a.activityId !== activityId);
              this.pushSingleVolcano(volcano);
            }
          },
          error: (error) => {
            // Handle the error, e.g., display an error message
            console.log('Error retrieving updated volcano data:', error);
          }
        });
      },
      error: (error) => {
        // Handle the error, e.g., display an error message
        console.log('Error deleting volcano activity:', error);
      }
    });
  
    return observable;
  }
  
  
  
  pushSingleVolcano(volcano: Volcano) {
    this.volcanoSubject.next(volcano);
  }
  
  clearSingleVolcano() {
    this.volcanoSubject.next(new Volcano());
  }

  getSingleVolcano(): Volcano {
    let volcano = new Volcano();
    this.volcano$.subscribe(res => {
      volcano = res
    });
    return volcano;
  }

  validateActivityData(activity: Activity): boolean {
    // Check if any required field is null or empty
    if (!activity.type || !activity.vei || !activity.end || !activity.start) {
      return false;
    }
    return true;
  }

  private generateActivityId(): number {
    // Generate a unique activity ID using a random number
    return Math.floor(Math.random() * 1000000);
  }

}
