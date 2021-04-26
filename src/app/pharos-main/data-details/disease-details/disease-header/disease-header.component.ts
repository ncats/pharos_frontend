import {Component, Input, OnInit} from '@angular/core';
import {FieldSelectionDialogComponent} from '../../../../tools/field-selection-dialog/field-selection-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from '../../../../tools/sidenav-panel/services/nav-sections.service';
import {takeUntil} from 'rxjs/operators';
import {Disease} from '../../../../models/disease';

@Component({
  selector: 'pharos-disease-header',
  templateUrl: './disease-header.component.html',
  styleUrls: ['./disease-header.component.scss']
})
export class DiseaseHeaderComponent extends DynamicPanelComponent implements OnInit {
  /**
   * disease object
   */
  @Input() disease: Disease;

  constructor(
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
  }

  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.disease = this.data.diseases;
      });
  }

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: 1, model: 'Disease', route: this._route, batch: this.disease.name},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
