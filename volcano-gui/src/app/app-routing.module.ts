import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterActivityComponent } from './components/register-activity/register-activity.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { VolcanoMapComponent } from './components/volcano-map/volcano-map.component';

const routes: Routes = [
  { path: '', component: VolcanoMapComponent },
  { path: 'register-activity', component: RegisterActivityComponent },
  { path: 'activity-log', component: ActivityLogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
