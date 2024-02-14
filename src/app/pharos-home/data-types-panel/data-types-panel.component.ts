import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

/**
 * shows a panel of different data types
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule],
  selector: 'pharos-data-types-panel',
  templateUrl: './data-types-panel.component.html',
  styleUrls: ['./data-types-panel.component.scss']
})
export class DataTypesPanelComponent {

}
