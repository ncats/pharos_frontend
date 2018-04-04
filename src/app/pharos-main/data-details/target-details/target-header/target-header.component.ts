import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../models/target";

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.css']
})
export class TargetHeaderComponent implements OnInit {
@Input() target: Target;
  constructor() { }

  ngOnInit() {
  }

}
