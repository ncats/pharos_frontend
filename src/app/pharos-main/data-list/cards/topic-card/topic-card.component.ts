import {Component, Input} from '@angular/core';

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
  @Input() topic?: any;

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
