import { Component, OnInit } from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

@Component({
  selector: 'pharos-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
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
