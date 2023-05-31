import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-volcano-popup',
  templateUrl: './volcano-popup.component.html',
  styleUrls: ['./volcano-popup.component.css']
})
export class VolcanoPopupComponent {

  @Input() volcano: any;

}
