import {Component, Inject, OnInit} from '@angular/core';
import {PharosProfileService} from '../../../../../auth/pharos-profile.service';
import {Facet, Field} from '../../../../../models/facet';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {take} from 'rxjs/internal/operators';
import {AngularFirestore} from '@angular/fire/firestore';

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
   * @param db
   * @param pharosProfileService
   * @param {MatDialogRef<TargetSaveModalComponent>} dialogRef
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private pharosConfig: PharosConfig,
    private db: AngularFirestore,
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

    /*if (this.data.etag) {
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
    } else {*/


    /**
     * get target list from saved targets
     *    get target list from list upload
     * see if target already has graph data
     *    if so - proceed
     *    if not - post to api
     *      subscribe to result
     *        save result to firebase
     *
     * save topic as topicName, topicDescription, user, private, targetList, id
     *
     * redirect to topic by id
     */
    // todo make better use of rxjs for this
    this.data.selection.forEach(target => {
      console.log(target);
      this.db.collection('topic-nodes').doc(target)// ref => ref.where('documentid', '==', target))
        .valueChanges().pipe(take(1))
        .subscribe(res => {
          if (!res) {
            console.log("getting new data");
            this.http.post<any>(`${this.pharosConfig.getTopicResolveUrl()}`, target, httpOptions).subscribe(response => {
              console.log(response);
              if (response.content) {
                if (response.content[0].ligands) {
                  response.content[0].ligands = response.content[0].ligands.filter(ligand => !ligand['']);
                  console.log(response.content[0].ligands);
                }
                this.db.collection('topic-nodes')
                  .doc(target)
                  .set({
                    graphData: response.content[0]
                  });
                //this._parseData(res)
              }
            });
          }
        });
    });
     // this.http.post(`${this.pharosConfig.getTopicResolveUrl()}`, this.data.selection.slice(0,10).join(), httpOptions).subscribe(res => {
     //   console.log(res);
       /* ret.value = res['etag'];
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
        this.pharosProfileService.updateProfile(customFacet);*/
     // });
   // });
    this.dialogRef.close(ret);
  }
}

