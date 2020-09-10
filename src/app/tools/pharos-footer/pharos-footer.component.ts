import { Component } from '@angular/core';
import { version, tcrd_version } from '../../../../package.json';

/**
 * component to show pharos footer
 */
@Component({
  selector: 'app-pharos-footer',
  templateUrl: './pharos-footer.component.html',
  styleUrls: ['./pharos-footer.component.scss']
})

export class PharosFooterComponent {
  version: string = version;
  tcrd_version: string = tcrd_version;
}
