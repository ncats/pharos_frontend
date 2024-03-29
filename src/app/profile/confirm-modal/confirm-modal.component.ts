import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [FlexLayoutModule, MatButtonModule, MatIconModule],
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
