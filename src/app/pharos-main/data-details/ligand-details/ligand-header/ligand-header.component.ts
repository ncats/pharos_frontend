import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ligand} from '../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FieldSelectionDialogComponent} from '../../../../tools/field-selection-dialog/field-selection-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';

/**
 * displays ligand header component
 */
@Component({
  selector: 'pharos-ligand-header',
  templateUrl: './ligand-header.component.html',
  styleUrls: ['./ligand-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandHeaderComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * ligand to be displayed
   */
  @Input() ligand: Ligand;

  /**
   * no args constructor
   */
  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private changeRef: ChangeDetectorRef,
    private metaService: UnfurlingMetaService,
    private router: Router,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.metaService.destroyCanonicalURL();
        }
      });

    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (this.data && this.data.ligands) {
          this.ligand = this.data.ligands;

          const newDescription = this.ligand.description;
          const newTitle = 'Pharos: ' + this.ligand.name;
          this.metaService.setMetaData({description: newDescription, title: newTitle});
          this.metaService.createCanonicalURL(['ligands', (this.ligand.isdrug ? this.ligand.name : this.ligand.ligid)]);
          this.changeRef.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.metaService.destroyCanonicalURL();
    super.ngOnDestroy();
  }

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: 1, model: 'Ligand', route: this._route, batch: this.ligand.ligid},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
