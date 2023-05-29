import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterActivityComponent } from './components/register-activity/register-activity.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterActivityComponent,
    ActivityLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
