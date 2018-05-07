import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../../models/topic";

@Component({
  selector: 'pharos-topic-header',
  templateUrl: './topic-header.component.html',
  styleUrls: ['./topic-header.component.css']
})
export class TopicHeaderComponent implements OnInit {
  @Input() topic : Topic;
  constructor() { }

  ngOnInit() {
  }

}
