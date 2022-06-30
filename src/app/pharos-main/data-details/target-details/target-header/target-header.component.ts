import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../models/target';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {FieldSelectionDialogComponent} from '../../../../tools/field-selection-dialog/field-selection-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';
import {JsonldService} from '../../../../pharos-services/jsonld.service';

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetHeaderComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;

  /**
   * no args constructor
   * call super object constructor
   */
  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService,
    private jsonldService: JsonldService
  ) {
    super(dynamicServices);
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
       this.target = this.data.targets;
       if (this.target) {
         this.jsonldService.insertSchema(this.jsonldService.targetSchema(this.target));
         this.jsonldService.insertSchema(this.jsonldService.ratingSchema(this.target.idgTDL), 'structured-data-tdl');
       }
       this.changeRef.markForCheck();
      });
  }

  getHeaderClass(): string {
    if (this.target) {
      return this.target.idgTDL.toLowerCase() + '-header';
    }
  }

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: 1, model: 'Target', route: this._route, batch: this.target.preferredSymbol},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
