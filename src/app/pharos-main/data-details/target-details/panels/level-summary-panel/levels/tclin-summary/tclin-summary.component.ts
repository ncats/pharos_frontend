import {Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../../../../models/target';

@Component({
  selector: 'pharos-tclin-summary',
  templateUrl: './tclin-summary.component.html',
  styleUrls: ['./tclin-summary.component.scss']
})
export class TclinSummaryComponent implements OnInit {
  @Input() target: Target;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
