import {Component, Inject} from '@angular/core';
import {PharosProfileService} from '../../../../../auth/pharos-profile.service';
import {Field} from '../../../../../models/facet';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatInputModule} from '@angular/material/input';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormField,
    MatInputModule, MatDialogModule],
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
  targetCtrl: UntypedFormControl = new UntypedFormControl();

  /**
   *
   * add dialog controller
   * @param data
   * @param http
   * @param db
   * @param pharosProfileService
   * @param {MatDialogRef<TargetSaveModalComponent>} dialogRef
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
   // private db: AngularFirestore,
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
    const ret: Field = new Field({
      name: this.targetCtrl.value,
      value: this.data.selection ? this.data.selection.length : this.data.count,
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    };
    this.dialogRef.close(ret);
  }
}

