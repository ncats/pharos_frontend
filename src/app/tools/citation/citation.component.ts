import { Component, OnInit, Input } from '@angular/core';
import {PropertyDisplayComponent} from '../generic-table/components/property-display/property-display.component';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    PropertyDisplayComponent,
    MatIcon
  ],
  selector: 'pharos-citation',
  templateUrl: './citation.component.html',
  styleUrls: ['./citation.component.scss']
})
export class CitationComponent implements OnInit {
  @Input() citation;
  @Input() full = false;
  constructor() { }
  get authors() {
    return this.citation.author.map(o => o.name).join(', ');
  }
  ngOnInit(): void {
  }

}
