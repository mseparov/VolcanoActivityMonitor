import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {VolcanoStore} from "../../stores/volcano.store";
import {BehaviorSubject, Observable} from "rxjs";
import {Volcano} from "../../models/volcano";
import {Activity} from "../../models/activity";

@Component({
  selector: 'app-volcano-popup',
  templateUrl: './volcano-popup.component.html',
  styleUrls: ['./volcano-popup.component.css']
})
export class VolcanoPopupComponent {
  volcano$: Observable<Volcano | undefined>; // Update the type to include undefined
  newActivity: any = {}; // Object to store the new activity data

  constructor(private volcanoStore: VolcanoStore) {
    this.volcano$ = this.volcanoStore.volcano$;
  }

  addVolcanoActivity(newActivity: Activity) {
    if (this.volcanoStore.validateActivityData(newActivity)) {
      newActivity.volcanoId = this.volcanoStore.getSingleVolcano()?.number;
      console.log(newActivity);
      this.volcanoStore.pushVolcanoActivity(newActivity);
      // Reset the form fields
      this.newActivity = {};
    } else {
      console.log(newActivity);
      // Handle validation error, e.g., display an error message to the user
      console.error('Invalid activity data');
    }
  }

  deleteVolcanoActivity(activity: Activity) {
    activity.volcanoId = this.volcanoStore.getSingleVolcano()?.number;
    if (activity.volcanoId) {
      console.log(activity, activity.volcanoId)
      this.volcanoStore.deleteVolcanoActivity(activity.volcanoId, activity.activityId);
    } else {
      console.log('Invalid volcano ID');
    }
  }
}