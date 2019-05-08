import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

/**
 * modal component for batch search/target upload
 */
@Component({
  selector: 'pharos-batch-upload-modal',
  templateUrl: './batch-upload-modal.component.html',
  styleUrls: ['./batch-upload-modal.component.scss']
})
export class BatchUploadModalComponent {
  /**
   * target input form
   */
  targetCtrl: FormControl = new FormControl();

  /**
   * add dialog controller
   * @param dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<BatchUploadModalComponent>
  ) { }

  /**
   * cancel and close modal
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * submit control value and close modal
   */
  submitList() {
      this.dialogRef.close(this.targetCtrl.value ? this.targetCtrl.value.trim().split(/[\t\n,;]+/) : null);
  }

}
