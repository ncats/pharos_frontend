import {Component, Input} from '@angular/core';

@Component({
  selector: 'pharos-node-display',
  templateUrl: './node-display.component.html',
  styleUrls: ['./node-display.component.css']
})
export class NodeDisplayComponent {
  @Input() nodes: any;
  @Input() path: string;

  /**
   * no args constructor
   */
  constructor() { }
}
