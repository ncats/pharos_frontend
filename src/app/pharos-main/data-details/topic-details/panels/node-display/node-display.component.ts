import {Component, Input} from '@angular/core';

/**
 * todo this is the ranked nodes section, needs to be readded
 */
@Component({
  selector: 'pharos-node-display',
  templateUrl: './node-display.component.html',
  styleUrls: ['./node-display.component.css']
})
export class NodeDisplayComponent {
  /**
   * nodes to display
   */
  @Input() nodes: any;

  /**
   * path for search
   */
  @Input() path: string;

  /**
   * no args constructor
   */
  constructor() { }
}
