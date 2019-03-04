import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../../../../models/target";

@Component({
  selector: 'pharos-tbio-summary',
  templateUrl: './tbio-summary.component.html',
  styleUrls: ['./tbio-summary.component.scss']
})
export class TbioSummaryComponent implements OnInit {
  @Input() target: Target;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this);
  }

}
