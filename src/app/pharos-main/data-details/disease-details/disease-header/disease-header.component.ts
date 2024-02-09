import {Component, Input, OnInit} from '@angular/core';
import {FieldSelectionDialogComponent} from '../../../../tools/field-selection-dialog/field-selection-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {Disease} from '../../../../models/disease';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';
import {JsonldService} from '../../../../pharos-services/jsonld.service';
import {MatDialog} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatTooltip, MatIcon, MatButtonModule],
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
        this.disease = this.data.diseases;
        this.jsonldService.insertSchema(this.jsonldService.diseaseSchema(this.disease));
      });
  }

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: 1, model: 'Disease', route: this._route, batch: this.disease.name},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
