import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'pharos-molecular-definition-panel',
  templateUrl: './molecular-definition-panel.component.html',
  styleUrls: ['./molecular-definition-panel.component.css']
})
export class MolecularDefinitionPanelComponent extends DynamicPanelComponent implements OnInit {
  properties: any;

  constructor(private _http: HttpClient) {
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
         if (this.data.properties && this.data.properties.length > 0) {
           this._http.get<any>(this.data.properties[0].href + '?view=full').subscribe(res => {
             this.properties = res;
           });
         }
      });
  }
}
