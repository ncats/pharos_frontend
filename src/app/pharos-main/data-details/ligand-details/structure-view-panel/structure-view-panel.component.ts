import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {EnvironmentVariablesService} from "../../../../pharos-services/environment-variables.service";

@Component({
  selector: 'pharos-structure-view-panel',
  templateUrl: './structure-view-panel.component.html',
  styleUrls: ['./structure-view-panel.component.css']
})
export class StructureViewPanelComponent extends DynamicPanelComponent implements OnInit {
  imageUrl:string;
  private _STRUCTUREURLBASE: string;

  constructor(
    private environmentVariablesService: EnvironmentVariablesService
  ) {
    super();
  }

  ngOnInit() {
    this._STRUCTUREURLBASE = this.environmentVariablesService.getStructureImageUrl();
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if(this.data.structure && this.data.structure.length > 0) {
          this.imageUrl = this._STRUCTUREURLBASE + this.data.structure[0].refid + '.svg'
        }
      });
  }

  setSmiles(){
    console.log(this);
    console.log(this.data.structure.smiles);
  }

}
