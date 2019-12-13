import {Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {PharosProfileService} from '../../../../../auth/pharos-profile.service';
import {Facet, Field} from '../../../../../models/facet';

/**
 * interface to track saved targets types
 */
export interface SavedTargets {
  /**
   * name of saved collection
   */
  name: string;
  /**
   * list of saved target strings
   */
  targets: string[];
  /**
   * etag for a saved query/etag
   */
  tag: string;
}

/**
 * modal component that opens when users save target lists
 */
@Component({
  selector: 'pharos-target-save-modal',
  templateUrl: './target-save-modal.component.html',
  styleUrls: ['./target-save-modal.component.scss']
})
export class TargetSaveModalComponent {

  /**
   * target input form
   */
  targetCtrl: FormControl = new FormControl();

  /**
   *
   * add dialog controller
   * @param data
   * @param http
   * @param pharosConfig
   * @param pharosProfileService
   * @param {MatDialogRef<TargetSaveModalComponent>} dialogRef
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private pharosConfig: PharosConfig,
    private pharosProfileService: PharosProfileService,
    public dialogRef: MatDialogRef<TargetSaveModalComponent>
  ) { }

  /**
   * cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close();
  }


  /**
   * submit control value and close modal
   */
  submitList(): void {
    const ret: Field =  new Field({
      name: this.targetCtrl.value,
      value: this.data.selection ? this.data.selection.length : this.data.count,
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    };

    if (this.data.etag) {
      ret.value = this.data.etag;
      let customFacet: Facet = this.data.user.data().savedTargets;
      if (customFacet) {
        customFacet.values.push(ret);
      } else {
        customFacet = {
          facet: 'etag',
          label: 'Custom Lists',
          values: [ret]
        };
      }
     // this.pharosProfileService.updateSavedCollection(customFacet);
    } else {
        this.http.post(`${this.pharosConfig.getApiPath()}targets/resolve`, this.data.selection.join(), httpOptions).subscribe(res => {
          ret.value = res['etag'];
          let customFacet: Facet = this.data.user.data().savedTargets;
          if (customFacet) {
            customFacet.values.push(ret);
          } else {
            customFacet = {
              facet: 'etag',
              label: 'Custom Lists',
              values: [ret]
            };
          }
      //    this.pharosProfileService.updateProfile(customFacet);
        });
      }
    this.dialogRef.close(ret);
  }

}


