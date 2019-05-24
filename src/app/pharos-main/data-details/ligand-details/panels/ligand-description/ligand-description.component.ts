import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-ligand-description',
  templateUrl: './ligand-description.component.html',
  styleUrls: ['./ligand-description.component.scss']
})
export class LigandDescriptionComponent extends DynamicPanelComponent implements OnInit {
  description: string;

  ligand: any;

  constructor() {
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
      .subscribe(x => {
        console.log(this.data);
        if(this.ligand) {
          this.description = this.ligand.description;
        }
      });
  }
}
