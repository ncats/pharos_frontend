import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../../../../models/target";

@Component({
  selector: 'pharos-tchem-summary',
  templateUrl: './tchem-summary.component.html',
  styleUrls: ['./tchem-summary.component.scss']
})
export class TchemSummaryComponent implements OnInit {
  @Input() target: Target;
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
