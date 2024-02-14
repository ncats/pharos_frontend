import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Facet} from '../../models/facet';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FacetTableComponent} from '../../pharos-main/data-list/filter-panel/facet-table/facet-table.component';
import {MatCardSubtitle} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  standalone: true,
  imports: [
    CommonModule, FlexLayoutModule, MatExpansionModule, MatIcon, MatButtonModule, FacetTableComponent,
    MatCardSubtitle, MatDialogActions, MatToolbar, MatTooltipModule
  ],
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
