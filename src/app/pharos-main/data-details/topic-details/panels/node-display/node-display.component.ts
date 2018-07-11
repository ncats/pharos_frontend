import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-node-display',
  templateUrl: './node-display.component.html',
  styleUrls: ['./node-display.component.css']
})
export class NodeDisplayComponent implements OnInit {
  @Input() nodes: any[];
  constructor() { }

  ngOnInit() {
  }

}
