import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../../models/target";

@Component({
  selector: 'pharos-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.css']
})
export class TargetCardComponent implements OnInit {
  @Input() target?: Target;

  constructor() { }

  ngOnInit() {
  }

}
