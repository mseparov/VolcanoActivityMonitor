import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterActivityComponent } from './components/register-activity/register-activity.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { VolcanoMapComponent } from './components/volcano-map/volcano-map.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterActivityComponent,
    ActivityLogComponent,
    VolcanoMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
