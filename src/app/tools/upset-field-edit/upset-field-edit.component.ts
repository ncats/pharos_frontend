import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Facet} from '../../models/facet';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'pharos-upset-field-edit',
  templateUrl: './upset-field-edit.component.html',
  styleUrls: ['./upset-field-edit.component.scss']
})
export class UpsetFieldEditComponent implements OnInit {

  facet: Facet;
  selectedValues: string[];
  collapsed = true;

  constructor(
    public _route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpsetFieldEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private changeRef: ChangeDetectorRef)
  { }

  ngOnInit(): void {
    this.facet = this.data.facet;
    this.selectedValues = this.data.selectedValues;
  }

  /**
   * cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close(null);
  }

  saveFields(): void {
    this.dialogRef.close(this.selectedValues);
  }


}
