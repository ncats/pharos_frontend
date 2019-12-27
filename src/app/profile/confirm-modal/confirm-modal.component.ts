import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {BatchUploadModalComponent} from '../../tools/batch-upload-modal/batch-upload-modal.component';

@Component({
  selector: 'pharos-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BatchUploadModalComponent>,
  ) { }

  ngOnInit() {
  }


  /**
   * confirm and close modal
   */
  confirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close(null);
  }
}
