import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterActivityComponent } from './components/register-activity/register-activity.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register-activity', component: RegisterActivityComponent },
  { path: 'activity-log', component: ActivityLogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
