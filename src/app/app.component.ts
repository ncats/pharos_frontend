import {Component, OnInit, AfterViewInit, ViewChild, Input, ChangeDetectorRef} from '@angular/core';
import {NcatsHeaderComponent} from './tools/ncats-header/ncats-header.component';
import {LoadingService} from './pharos-services/loading.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
/**
 * main app component holder
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('appHeader', {static: true}) header: NcatsHeaderComponent;
  @Input() loading = true;

  constructor (
    // private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.router);
    this.router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.loading = true;
        }
        if (e instanceof NavigationEnd) {
          this.loading = false;
        }
      });
  }

  ngAfterViewInit() {
  }
  closeSidenav() {
    this.header.sidenav.close();
  }
}
