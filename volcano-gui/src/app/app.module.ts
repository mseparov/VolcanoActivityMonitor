import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VolcanoMapComponent } from './components/volcano-map/volcano-map.component';
import { VolcanoPopupComponent } from './components/volcano-popup/volcano-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    VolcanoMapComponent,
    VolcanoPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
