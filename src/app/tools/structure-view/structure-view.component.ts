import {Component, Input, OnInit} from '@angular/core';
import {PharosConfig} from "../../../config/pharos-config";
import {BehaviorSubject} from "rxjs/index";
import {takeWhile} from "rxjs/internal/operators";
import {PharosProperty} from "../../models/pharos-property";

/**
 * displays a structure only from either a url or a smiles string
 */
@Component({
  selector: 'pharos-structure-view',
  templateUrl: './structure-view.component.html',
  styleUrls: ['./structure-view.component.scss']
})
export class StructureViewComponent implements OnInit {

  /**
   * image url
   */
  @Input() url: string;

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<PharosProperty>(null);

  /**
   * set the value of the data on change
   * @param {PharosProperty} value
   */
  @Input()
  set data(value: PharosProperty) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  /**
   * get the data value
   * @return {PharosProperty}
   */
  get data(): PharosProperty {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  /**
   * grab config to fetch the image urls
   * @param {PharosConfig} pharosConfig
   */
  constructor(
    private pharosConfig: PharosConfig
  ){
  }

  /**
   * get data from parent by subscription
   * set as smiles
   */
  ngOnInit() {
    // now we can subscribe to it
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeWhile(() => !this.url)
      )
      .subscribe(x => {
        if(!this.url) {
          this.url = `${this.pharosConfig.getApiPath()}render/${this.parseSmiles(this.data.term)}?size=150`;
        }
      });
  }

  /**
   * url encode smiles for structure rendering
   * @param smiles
   * @return {string}
   */
  private parseSmiles(smiles: any): string {
    //  console.log(smiles);
    const parsed = smiles
      .replace(/[;]/g, '%3B')
      .replace(/[#]/g, '%23')
      .replace(/[@]/g, '%40')
      .replace(/[+]/g, '%2B')
      .replace(/[\\]/g, '%5C')
      .replace(/[\[]/g, '%5B')
      .replace(/[\]]/g, '%5D')
      .replace(/[|]/g, '%7C');
    return parsed;
  }
}
