import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../../../../models/topic';

/**
 * toolbar for topics
 */
@Component({
  selector: 'pharos-topic-header',
  templateUrl: './topic-header.component.html',
  styleUrls: ['./topic-header.component.css']
})

export class TopicHeaderComponent implements OnInit {

  /**
   * topic object that is passed in by the topic list
   */
  @Input() topic: Topic;

  /**
   * no args
   */
  constructor() { }

  /**
   * nothing yet
   */
  ngOnInit() {
  }

}
