import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-target-list-panel',
  templateUrl: './target-list-panel.component.html',
  styleUrls: ['./target-list-panel.component.css']
})
export class TargetListPanelComponent extends DynamicPanelComponent implements OnInit {
  properties: any;
  _facetMap = new Map();

  constructor(private _http: HttpClient) {
    super();
  }

  ngOnInit() {
    console.log(this);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
    //  .subscribe(x => {

       /* if (this.data.links && this.data.links.length > 0) {
          this.data.links.forEach(link => {
            const fields = this._facetMap.get(link.kind);
            if (fields) {
              fields.push(link);
              this._facetMap.set(link.kind, fields);
            } else {
              this._facetMap.set(link.kind, [link]);
            }
          });
          console.log(this._facetMap);
        }
      });*/
  }
}
