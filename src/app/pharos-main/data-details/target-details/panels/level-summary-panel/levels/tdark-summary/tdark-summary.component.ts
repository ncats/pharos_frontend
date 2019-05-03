import {Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../../../models/target';

@Component({
  selector: 'pharos-tdark-summary',
  templateUrl: './tdark-summary.component.html',
  styleUrls: ['./tdark-summary.component.scss']
})
export class TdarkSummaryComponent implements OnInit {
  @Input() target: Target;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
