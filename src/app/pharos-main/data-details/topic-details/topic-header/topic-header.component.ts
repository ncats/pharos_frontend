import {Component, Input, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';

/**
 * shows topic header and info
 */
@Component({
  selector: 'pharos-topic-header',
  templateUrl: './topic-header.component.html',
  styleUrls: ['./topic-header.component.css']
})
export class TopicHeaderComponent extends DynamicPanelComponent implements OnInit {

  /**
   * topic being displayed
   */
  @Input() topic: any;

  /**
   * no args constructor
   * calls super object constructor
   */
  constructor() {
    super();
  }

  /**
   * fetch topic data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
        }
      });
  }
}
