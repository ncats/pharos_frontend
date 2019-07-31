import {Component, OnInit, AfterViewInit, ViewChild, Input} from '@angular/core';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import {LoadingService} from './pharos-services/loading.service'
/**
 * main app component holder
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('appHeader', {static: true}) header: NcatsHeaderComponent;
  @Input() loading: boolean;

  constructor (
    private loadingService: LoadingService
  ){}

  ngAfterViewInit(){
    this.loadingService.loading$.subscribe(res => this.loading = res);
  }
  closeSidenav() {
    this.header.sidenav.close();
  }
}
