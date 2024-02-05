import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {ResolverService} from '../../pharos-services/resolver.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

/**
 * modal component for batch search/upload
 */
@Component({
  selector: 'pharos-batch-upload-modal',
  templateUrl: './batch-upload-modal.component.html',
  styleUrls: ['./batch-upload-modal.component.scss']
})

/**
 * batch upload modal class
 */
export class BatchUploadModalComponent implements OnInit {

  @Input() nameable = false;

  saveToProfile = false;

  /**
   * target input form
   */
  targetListCtrl: UntypedFormControl = new UntypedFormControl();
  collectionNameCtrl: UntypedFormControl = new UntypedFormControl();
  descriptionCtrl: UntypedFormControl = new UntypedFormControl();
  models: string;

  /**
   * add dialog controller
   * @param data
   * @param dialogRef
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BatchUploadModalComponent>,
    private changeRef: ChangeDetectorRef,
    public resolverService: ResolverService
  ) {

  }

  ngOnInit() {
    this.nameable = this.data.nameable;
    this.targetListCtrl.setValue(this.data.selection);
    this.saveToProfile = this.data.saveToProfile;
    this.models = this.data.models;
    this.changeRef.detectChanges();
  }

  /**
   * cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close(null);
  }


  /**
   * submit control value and close modal
   */
  submitList(): void {
    let retArr;
    if (Array.isArray(this.targetListCtrl.value)) {
      retArr = this.targetListCtrl.value.map(val => val = val.trim());
    } else {
      retArr = this.targetListCtrl.value.trim().split(/[\t\n,;]+/).map(val => val.trim());
    }

    this.dialogRef.close({
        targetList: retArr,
        collectionName: this.collectionNameCtrl.value,
        description: this.descriptionCtrl.value,
        saveList: this.nameable && this.collectionNameCtrl.value && (this.collectionNameCtrl.value.length > 0),
        models: this.models.toLowerCase()
  });
  }

}
