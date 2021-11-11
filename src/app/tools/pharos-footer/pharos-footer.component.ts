import { Component } from '@angular/core';
import package_info from '../../../../package.json';

/**
 * component to show pharos footer
 */
@Component({
  selector: 'app-pharos-footer',
  templateUrl: './pharos-footer.component.html',
  styleUrls: ['./pharos-footer.component.scss']
})

export class PharosFooterComponent {
  version: string = package_info.version;
  tcrd_version: string = package_info.tcrd_version;
}
