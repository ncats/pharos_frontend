import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * shows a quick list of pharos features, would be a lot cooler if the image was a gif
 * // todo make image a gif
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  selector: 'pharos-about-panel',
  templateUrl: './about-panel.component.html',
  styleUrls: ['./about-panel.component.scss']
})
export class AboutPanelComponent {}
