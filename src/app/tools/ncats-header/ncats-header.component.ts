import {Component, Input} from '@angular/core';

/**Component that contains basic NCATS branded menu, also contains pharos options */
@Component({
  selector: 'app-ncats-header',
  templateUrl: './ncats-header.component.html',
  styleUrls: ['./ncats-header.component.css']
})
export class NcatsHeaderComponent {
  @Input() searchBar = false;
}
