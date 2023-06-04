import { Component, Input } from '@angular/core';
import { VolcanoService } from 'src/app/services/volcano.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-volcano-popup',
  templateUrl: './volcano-popup.component.html',
  styleUrls: ['./volcano-popup.component.css']
})
export class VolcanoPopupComponent {
  @Input() volcano: any;
  newActivity: any = {}; // Object to store the new activity data
  isAddingActivity = false; // Flag to indicate if an activity is being added

  constructor(private volcanoService: VolcanoService) {}

  addVolcanoActivity(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    this.isAddingActivity = true; // Set the flag to indicate activity addition is in progress

    this.volcanoService.addVolcanoActivity(this.newActivity)
      .pipe(finalize(() => this.isAddingActivity = false)) // Set the flag back to false on completion or error
      .subscribe({
        next: (response) => {
          // Activity added successfully, update the local data
          this.volcano.activities.push(response);
          this.newActivity = {}; // Clear the form inputs
        },
        error: (error) => {
          // Handle the error, e.g., display an error message
          console.log('Error adding volcano activity:', error);
        }
      });
  }

  getVolcanoActivities() {
    this.volcanoService.getVolcanoActivities(this.volcano.id)
      .subscribe({
        next: (response) => {
          // Activities retrieved successfully, update the local data
          this.volcano.activities = response;
        },
        error: (error) => {
          // Handle the error, e.g., display an error message
          console.log('Error retrieving volcano activities:', error);
        }
      });
  }
}
