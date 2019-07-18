import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../../../../models/topic';

/**
 * card display for specific topics
 */
@Component({
  selector: 'pharos-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})

export class TopicCardComponent {
  /**
   * topic of interest
   */
  @Input() topic?: Topic;

  /**
   * boolean to show description
   */
  @Input() desc: true;

  /**
   * no args
   */
  constructor() {
  }

}
