import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';

@Component({
  selector: 'pharos-target-facet-panel',
  templateUrl: './target-facet-panel.component.html',
  styleUrls: ['./target-facet-panel.component.css']
})
export class TargetFacetPanelComponent extends DynamicPanelComponent implements OnInit {
  keys: string[];

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        this.setterFunction();
      });
  }

    setterFunction(): void {
    if (this.data) {
console.log(this);
this.keys = Object.keys(this.data);
    }
    }
}
