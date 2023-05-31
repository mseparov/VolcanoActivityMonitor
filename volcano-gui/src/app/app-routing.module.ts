import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VolcanoMapComponent } from './components/volcano-map/volcano-map.component';

const routes: Routes = [
  { path: '', component: VolcanoMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
