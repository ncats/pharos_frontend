import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';

/**
 * displays description of ligand
 */
@Component({
  selector: 'pharos-ligand-description',
  templateUrl: './ligand-description.component.html',
  styleUrls: ['./ligand-description.component.scss']
})
export class LigandDescriptionComponent extends DynamicPanelComponent implements OnInit {
  /**
   * ligand description
   */
  description: string;

  /**
   * ligand object
   */
  ligand: any;

  /**
   * no args constructor
   */
  constructor() {
    super();
  }

  /**
   * set data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if (this.ligand) {
          this.description = this.ligand.description;
        }
      });
  }
}
