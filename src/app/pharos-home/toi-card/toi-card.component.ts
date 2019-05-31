import {Component, Input, OnInit} from '@angular/core';
import {Topic} from '../../models/topic';

/**
 * card display for specific topics
 */
@Component({
  selector: 'pharos-toi-card',
  templateUrl: './toi-card.component.html',
  styleUrls: ['./toi-card.component.css']
})

export class ToiCardComponent {
  /**
   * topic of interest
   */
  @Input() toi?: Topic;

  /**
   * boolean to show description
   */
  @Input() desc: true;

  /**
   * no args
   */
  constructor() { }

}
