import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PharosProperty} from '../../../../../models/pharos-property';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PageData} from '../../../../../models/page-data';
import {IDG_LEVEL_TOKEN} from '../../../disease-details/target-list-panel/target-list-panel.component';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Target} from '../../../../../models/target';

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
    new PharosProperty( {
      name: 'type',
      label: 'Activity Type'
    }),
    new PharosProperty( {
      name: 'value',
      label: 'Activity Value'
    }),
    new PharosProperty( {
      name: 'moa',
      label: 'Mechanism of Action'
    }),
    new PharosProperty( {
      name: 'reference',
      label: 'Activity Reference'
    }),
    new PharosProperty( {
      name: 'pubs',
      label: 'Publications'
    })
    ];

  /**
   * array of data shown in the table
   * @type {any[]}
   */
    tableArr: any[] = [];

  /**
   * page data object to track pagination
   */
  pageData: PageData;

  targets: any[] = [];

  activities: any[];

  activitiesTargetDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private changeRef: ChangeDetectorRef
  ) {
    super();
  }

  /**
   * subscribe to data changes and map data to PharosProperty objects for table display
   */
  ngOnInit() {
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
          this.loading = false;
          this.activitiesTargetDataSource.data = this.ligandProps.activities;
           /* [...this.ligand.activitiesMap.values()]
            .sort((a, b) => b.activities.length - a.activities.length);*/
          this.activitiesTargetDataSource.paginator = this.paginator;
          this.changeRef.markForCheck();
        }
      });

    /*this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if (this.data.targetRelevance && this.data.targetRelevance.length > 0) {
          this.tableArr = [];
          this.data.targetRelevance.forEach(target => {
            const data = {
              target: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target')[0]),
              developmentLevel: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Development Level')[0]),
              targetFamily: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target Family')[0]),
              activity: new PharosProperty(target.properties
                .filter(prop => prop.label === 'Ligand Activity' || prop.label === 'Pharmalogical Action')[0])
            };
            data['developmentLevelValue'] = new PharosProperty(
              target.properties.filter(prop => prop.label === data.activity.term)[0] ?
                target.properties.filter(prop => prop.label === data.activity.term)[0] :
                data.activity
            );
           // data['developmentLevelValue'].term = `p${data['developmentLevelValue'].term}`;
            data.target.internalLink = ['/targets', data.target.term as string];
            if (data.activity && data.activity.label !== 'Pharmalogical Action') {
              data.activity.term = `p${data.activity.term}`;
            }

            if (data.activity && data.activity.label === 'Pharmalogical Action') {
            delete data['developmentLevelValue'];
            }
              this.targets.push(data);
          });
          this.pageData = new PageData(
            {
              top: 10,
              skip: 0,
              total: this.targets.length,
              count: 10
            });
          this.tableArr = this.targets
            .slice(this.pageData.skip, this.pageData.top);
      }
      });*/
  }

  page(event) {
    this.tableArr = this.targets.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

}
