import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'pharos-batch-upload-modal',
  templateUrl: './batch-upload-modal.component.html',
  styleUrls: ['./batch-upload-modal.component.scss']
})
export class BatchUploadModalComponent implements OnInit {
  targetCtrl: FormControl = new FormControl();


  constructor(
    public dialogRef: MatDialogRef<BatchUploadModalComponent>
  ) { }
  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  submitList() {
      this.dialogRef.close(this.targetCtrl.value ? this.targetCtrl.value.trim().split(/[\t\n,;]+/) : null);
  }

}
