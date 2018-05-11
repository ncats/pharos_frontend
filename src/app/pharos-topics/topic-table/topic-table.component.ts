import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../../models/topic';
import {DynamicPanelComponent} from '../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-topic-table',
  templateUrl: './topic-table.component.html',
  styleUrls: ['./topic-table.component.css']
})
export class TopicTableComponent extends DynamicPanelComponent implements OnInit {
  //@Input() data: Topic[];
  constructor() {
    super();
  }

  ngOnInit() {
    console.log('topic table');
  }

}
