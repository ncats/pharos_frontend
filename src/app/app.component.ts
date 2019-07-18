import {Component, OnInit, ViewChild} from '@angular/core';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';

/**
 * main app component holder
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('appHeader', {static: true}) header: NcatsHeaderComponent;

  closeSidenav() {
    this.header.sidenav.close();
  }
}
