import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../../../models/topic";
import {takeUntil} from "rxjs/operators";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";

@Component({
  selector: 'pharos-topic-header',
  templateUrl: './topic-header.component.html',
  styleUrls: ['./topic-header.component.css']
})
export class TopicHeaderComponent extends DynamicPanelComponent implements OnInit {
  @Input() topic: Topic;

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        console.log(this.data);
        if(Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
        }
      });
  }
}
