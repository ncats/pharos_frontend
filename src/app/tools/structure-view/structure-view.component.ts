import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {PharosConfig} from '../../../config/pharos-config';
import {BehaviorSubject, takeWhile} from 'rxjs';
import {PharosProperty} from '../../models/pharos-property';
import {environment} from "../../../environments/environment";
import {CommonModule} from '@angular/common';

/**
 * displays a structure only from either a url or a smiles string
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'pharos-structure-view',
  templateUrl: './structure-view.component.html',
  styleUrls: ['./structure-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StructureViewComponent implements OnInit, OnChanges {

  /**
   * image url
   */
  @Input() url: string;

  @Input() smiles: string;

  @Input() size = 150;

  @Input() rounded = false;

  @Input() ligandName;

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
   * @param {ChangeDetectorRef} ref
   */
  constructor(
    private pharosConfig: PharosConfig,
  //  private ref: ChangeDetectorRef
  ) {
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
        if (!this.url && (this.data && this.data.term)) {
          if (this.data.term === '') {
            this.url = null;
          } else {
            this.url = `${environment.rendererUrl}?standardize=true&size=${this.size}&structure=${encodeURIComponent(this.smiles)}`;
          }
        }
      });
    if (this.smiles) {
      this.url = `${environment.rendererUrl}?standardize=true&size=${this.size}&structure=${encodeURIComponent(this.smiles)}`;
    }
  }

  ngOnChanges(change: any) {
    if (change.smiles && !change.smiles.firstChange || change.size && !change.size.firstChange) {
      this.url = `${environment.rendererUrl}?standardize=true&size=${this.size}&structure=${encodeURIComponent(this.smiles)}`;
    }
  }

  /**
   * url encode smiles for structure rendering
   * @param smiles
   * @return {string}
   */
  private parseSmiles(smiles: any): string {
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
