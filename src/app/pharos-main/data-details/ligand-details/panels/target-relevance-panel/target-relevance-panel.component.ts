import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PharosProperty} from '../../../../../models/pharos-property';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PageData} from '../../../../../models/page-data';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {environment} from '../../../../../../environments/environment';

/**
 * shows what targets the ligand was tested on
 */
@Component({
  selector: 'pharos-target-relevance-panel',
  templateUrl: './target-relevance-panel.component.html',
  styleUrls: ['./target-relevance-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TargetRelevancePanelComponent extends DynamicTablePanelComponent implements OnInit {
  /**
   * ligand object
   */
  @Input() ligand: Ligand;
  isDev = false;
  ligandProps: any;

  /**
   * table config fields
   * @type {PharosProperty[]}
   */
  fields: PharosProperty[] = [
    /*    new PharosProperty( {
          name: 'target.symbol',
          label: 'IDG Target',
          sortable: true
        }),
        new PharosProperty( {
          name: 'target.idgTdl',
          label: 'IDG Development Level',
          sortable: true,
          customComponent: IDG_LEVEL_TOKEN
        }),
        new PharosProperty({
          name: 'targetFamily',
          label: 'Target Family',
          sortable: true
        }),*/
    new PharosProperty({
      name: 'type',
      label: 'Activity Type'
    }),
    new PharosProperty({
      name: 'value',
      label: 'Activity Value -log(M)'
    }),
    new PharosProperty({
      name: 'moa',
      label: 'Mechanism of Action'
    }),
    new PharosProperty({
      name: 'reference',
      label: 'Activity Reference'
    }),
    new PharosProperty({
      name: 'pmids',
      label: 'Publications (PubMed IDs)'
    })
  ];

  /**
   * page data object to track pagination
   */
  pageData: PageData;

  activitiesTargetDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  /**
   * subscribe to data changes and map data to PharosProperty objects for table display
   */
  ngOnInit() {
    this.isDev = !environment.production;
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data && this.data.ligands) {
          this.ligand = this.data.ligands;
          this.ligandProps = this.data.ligandsProps;
          this.loadingComplete();
          this.activitiesTargetDataSource.data = this.ligandProps.activities;
          this.activitiesTargetDataSource.paginator = this.paginator;
          this.changeRef.markForCheck();
        }
      });
  }
}
