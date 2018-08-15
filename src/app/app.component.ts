import {Component, HostListener, OnInit} from '@angular/core';
import {LoadingService} from './pharos-services/loading.service';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;
  title = 'Pharos';

  constructor(
    private loadingService: LoadingService) {
  }
  ngOnInit() {
    this.loadingService.loading$.subscribe(res => this.loading = res);
  }
}
