import {Component, Input} from '@angular/core';
import {SlideInOutAnimation} from './header-animations';

/**
 * Component that contains basic NCATS branded menu, also contains pharos options
 */
@Component({
  selector: 'app-ncats-header',
  templateUrl: './ncats-header.component.html',
  styleUrls: ['./ncats-header.component.css'],
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
}
