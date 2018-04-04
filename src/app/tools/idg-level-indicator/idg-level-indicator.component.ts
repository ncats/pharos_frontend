import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-idg-level-indicator',
  templateUrl: './idg-level-indicator.component.html',
  styleUrls: ['./idg-level-indicator.component.scss']
})
export class IdgLevelIndicatorComponent implements OnInit {
  @Input() level: string;

  constructor() { }

  ngOnInit() {
  }

}
