import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {OrthologSerializer} from '../../../../../../models/ortholog';
import {DynamicPanelComponent} from '../../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../../../../models/pharos-property';
import {PharosApiService} from '../../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Target} from '../../../../../../models/target';
import {PageEvent} from '@angular/material/paginator';
import {TargetComponents} from "../../../../../../models/target-components";
import {NavSectionsService} from "../../../../../../tools/sidenav-panel/services/nav-sections.service";

/**
 * displays orthologs available for a target
 */
@Component({
  selector: 'pharos-ortholog-panel',
  templateUrl: './ortholog-panel.component.html',
  styleUrls: ['./ortholog-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OrthologPanelComponent extends DynamicPanelComponent implements OnInit {
@Input() data: any;
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
    label: 'Species',
    sortable: true
  }),
    new PharosProperty( {
      name: 'source',
      label: 'Source',
      externalLink: true
    })
  ];



  /**
   * no args constructor
   * calls super object
   */
  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private changeRef: ChangeDetectorRef,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
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
      this.pharosApiService.getComponentPage(this._route.snapshot, pageParams,TargetComponents.Component.Orthologs).subscribe(res => {
        const tempArr = res.data.targets.orthologs
          .map(ortholog => orthologSerializer.fromJson(ortholog))
          .map(ortho => orthologSerializer._asProperties(ortho));
        this.targetProps.orthologs = tempArr;
        this.loadingComplete();
        this.changeRef.markForCheck();
      });
    }
}
