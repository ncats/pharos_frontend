import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';

/**
 * spinner to be used for data/page loading
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'pharos-loading-spinner',
  templateUrl: './pharos-loading-spinner.component.html',
  styleUrls: ['./pharos-loading-spinner.component.scss']
})
/**
 * spinner to be used for data/page loading
 */
export class PharosLoadingSpinnerComponent {
  /**
   * tracks whether or not to show the PHAROS text or just the spinnet
   */
  @Input() showText = true;
}
