import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {OrthologSerializer} from '../../../../../models/ortholog';
import {PharosProperty} from '../../../../../models/pharos-property';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Target} from '../../../../../models/target';
import {TargetComponents} from '../../../../../models/target-components';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {GenericTableComponent} from '../../../../../tools/generic-table/generic-table.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * displays orthologs available for a target
 */
@Component({
  standalone: true,
  imports: [
      CommonModule, FlexLayoutModule,
    TargetPanelBaseComponent,
    MatPaginator,
    GenericTableComponent
  ],
  selector: 'pharos-ortholog-panel',
  templateUrl: './ortholog-panel.component.html',
  styleUrls: ['./ortholog-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OrthologPanelComponent extends TargetPanelBaseComponent implements OnInit {
  /**
   * target to display
   */
  @Input() target: Target;

  @Input() targetProps: any;

  /**
   * list of table fields to display
   */
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'species',
      label: 'Species'
    }),
    new PharosProperty({
      name: 'name',
      label: 'Name'
    }),
    new PharosProperty({
      name: 'dbid',
      label: 'Source ID'
    }),
    new PharosProperty({
      name: 'geneid',
      label: 'Gene ID'
    }),
    new PharosProperty( {
      name: 'OMA',
      label: 'OMA',
      width: '4vw',
      checkbox: true
    }),
    new PharosProperty( {
      name: 'EggNOG',
      label: 'EggNOG',
      width: '4vw',
      checkbox: true
    }),
    new PharosProperty( {
      name: 'Inparanoid',
      label: 'Inparanoid',
      width: '4vw',
      checkbox: true
    })
  ];
  /**
   * list of table fields to display
   */
  shortFields: PharosProperty[] = [
    new PharosProperty({
      name: 'species',
      label: 'Species'
    }),
    new PharosProperty({
      name: 'name',
      label: 'Name'
    }),
    new PharosProperty( {
      name: 'OMA',
      label: 'OMA',
      width: '4vw',
      checkbox: true
    }),
    new PharosProperty( {
      name: 'EggNOG',
      label: 'EggNOG',
      width: '4vw',
      checkbox: true
    }),
    new PharosProperty( {
      name: 'Inparanoid',
      label: 'Inparanoid',
      width: '4vw',
      checkbox: true
    })
  ];


  /**
   * no args constructor
   * calls super object
   */
  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService)
{
  super(changeRef, dynamicServices);
  }

  /**
   * subscribe to data changes and create orthologs
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(x => {
      this.target = this.data.targets;
      this.targetProps = this.data.targetsProps;
      this.loadingComplete();
      this.changeRef.markForCheck();
    });
  }

  /**
   * paginate ortholog list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loadingStart();
    const orthologSerializer = new OrthologSerializer();
    const pageParams = {
      orthologstop: event.pageSize,
      orthologsskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, TargetComponents.Component.Orthologs)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
      const tempArr = res.data.targets.orthologs
        .map(ortholog => orthologSerializer.fromJson(ortholog))
        .map(ortho => orthologSerializer._asProperties(ortho));
      this.targetProps.orthologs = tempArr;
      this.loadingComplete(false);
      this.changeRef.markForCheck();
    });
  }

  hasData() {
    return this && this.target && (this.target.orthologCounts > 0);
  }

  count(): number {
    return this.target?.orthologCounts;
  }
}
