import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {OrthologSerializer} from '../../../../../models/ortholog';
import {PharosProperty} from '../../../../../models/pharos-property';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Target} from '../../../../../models/target';
import {PageEvent} from '@angular/material/paginator';
import {TargetComponents} from '../../../../../models/target-components';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {TargetPanelBaseComponent} from '../target-panel-base/target-panel-base.component';

/**
 * displays orthologs available for a target
 */
@Component({
  selector: 'pharos-ortholog-panel',
  templateUrl: './ortholog-panel.component.html',
  styleUrls: ['./ortholog-panel.component.css'],
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
    public navSectionsService: NavSectionsService,
    changeRef: ChangeDetectorRef)
{
  super(navSectionsService, changeRef);
  }

  /**
   * subscribe to data changes and create orthologs
   */
  ngOnInit() {
    this.target = this.data.targets;
    this.targetProps = this.data.targetsProps;
    this.loadingComplete();
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
    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, TargetComponents.Component.Orthologs).subscribe(res => {
      const tempArr = res.data.targets.orthologs
        .map(ortholog => orthologSerializer.fromJson(ortholog))
        .map(ortho => orthologSerializer._asProperties(ortho));
      this.targetProps.orthologs = tempArr;
      this.loadingComplete();
      this.changeRef.markForCheck();
    });
  }

  hasData() {
    return this && this.target && (this.target.orthologCounts > 0);
  }

  count(): number {
    return this.target.orthologCounts;
  }

}
