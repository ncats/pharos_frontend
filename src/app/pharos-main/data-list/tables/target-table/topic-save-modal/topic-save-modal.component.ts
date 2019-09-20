import {Component, Inject, OnInit} from '@angular/core';
import {PharosProfileService} from '../../../../../auth/pharos-profile.service';
import {Facet, Field} from '../../../../../models/facet';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pharos-topic-save-modal',
  templateUrl: './topic-save-modal.component.html',
  styleUrls: ['./topic-save-modal.component.scss']
})

/**
 * modal component that opens when users save topic lists
 */
export class TopicSaveModalComponent {

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
    public dialogRef: MatDialogRef<TopicSaveModalComponent>
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
    const ret: Field = {
      label: this.targetCtrl.value,
      count: this.data.selection ? this.data.selection.length : this.data.count,
    };

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
          name: 'etag',
          label: 'Custom Lists',
          values: [ret]
        };
      }
      this.pharosProfileService.updateProfile(customFacet);
    } else {
      this.http.post(`${this.pharosConfig.getApiPath()}targets/resolve`, this.data.selection.join(), httpOptions).subscribe(res => {
        ret.value = res['etag'];
        let customFacet: Facet = this.data.user.data().savedTargets;
        if (customFacet) {
          customFacet.values.push(ret);
        } else {
          customFacet = {
            name: 'etag',
            label: 'Custom Lists',
            values: [ret]
          };
        }
        this.pharosProfileService.updateProfile(customFacet);
      });
    }
    this.dialogRef.close(ret);
  }

}

