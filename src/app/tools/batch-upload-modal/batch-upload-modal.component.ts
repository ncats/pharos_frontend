import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

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

  cancel(){
    //this.dialogRef.close();
  }

  submitList() {
    const tempValues = this.targetCtrl.value;
    console.log(tempValues);
    const ret = tempValues.trim().split(/[\t\n,;]+/);
     this.dialogRef.close(ret);
  }

}
