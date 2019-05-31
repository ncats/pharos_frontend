import {Component, Input} from '@angular/core';
import {SlideInOutAnimation} from './header-animations';
import {ActivatedRoute, Route} from "@angular/router";

/**
 * Component that contains basic NCATS branded menu, also contains pharos options
 */
@Component({
  selector: 'app-ncats-header',
  templateUrl: './ncats-header.component.html',
  styleUrls: ['./ncats-header.component.scss'],
  animations: [SlideInOutAnimation]
})
export class NcatsHeaderComponent {
  /**
   * show search bar
   */
  @Input() searchBar?: boolean;

  /**
   * toggleable class for the header
   */
  @Input() headerClass?: string;

  /**
   * animation state changed by scrolling
   * @type {string}
   */
  @Input() animationState ? = 'in';

  constructor(private route: ActivatedRoute) {
  }

  isActive(path: string): boolean {
    if (this.route.snapshot.data && this.route.snapshot.data.path) {
      return path === this.route.snapshot.data.path;
    } else if(this.route.snapshot.url && this.route.snapshot.url.length > 0 ) {
      return path === this.route.snapshot.url[0].path;
    } else {
      return false;
    }
  }
}
