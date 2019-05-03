import {Component, OnInit} from '@angular/core';
import {LoadingService} from './pharos-services/loading.service';

/**
 * main app component holder
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
