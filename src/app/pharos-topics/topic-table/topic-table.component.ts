import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../models/topic";

@Component({
  selector: 'pharos-topic-table',
  templateUrl: './topic-table.component.html',
  styleUrls: ['./topic-table.component.css']
})
export class TopicTableComponent implements OnInit {
  @Input() data: Topic[];
  constructor() { }

  ngOnInit() {
    console.log("topic table")
  }

}
