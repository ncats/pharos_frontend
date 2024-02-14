import { Component } from '@angular/core';
import package_info from '../../../../package.json';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * component to show pharos footer
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  selector: 'app-pharos-footer',
  templateUrl: './pharos-footer.component.html',
  styleUrls: ['./pharos-footer.component.scss']
})

export class PharosFooterComponent {
  version: string = package_info.version;
  tcrd_version: string = package_info.tcrd_version;
}
