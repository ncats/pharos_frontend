import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {OrthologSerializer} from '../../../../../../models/ortholog';
import {DynamicPanelComponent} from '../../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../../../../models/pharos-property';
import {PharosApiService} from '../../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {Target} from '../../../../../../models/target';
import {PageEvent} from '../../../../../../tools/pharos-paginator/pharos-paginator.component';

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
    private changeRef: ChangeDetectorRef
  ) {
    super();
  }

  /**
   * subscribe to data changes and create orthologs
   */
  ngOnInit() {
    console.log(this);
    this.target = this.data.targets;
    this.targetProps = this.data.targetsProps;
/*    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.setterFunction();
        }
      });*/
  }

  /**
   * parse data to serialize orthologs
   */
  setterFunction(): void {
     /* this.orthologs = [];
      const temp: Ortholog[] = [];
      this.data.forEach(obj => {
        // create new object to get PharosProperty class properties
        const newObj: Ortholog = this.orthologSerializer.fromJson(obj);
        // get source label
        const labelProp: PharosProperty =
          new PharosProperty(newObj.properties.filter(prop => prop.label === 'Ortholog Species')[0]);
        const dataSources: PharosProperty[] =
          newObj.properties.filter(prop => prop.label === 'Data Source').map(lab => new PharosProperty(lab));
        this.orthologs.push({species: labelProp, source: dataSources});
      });
      this.orthoPageData = new PageData(
        {
          top: 10,
          skip: 0,
          total: this.orthologs.length,
          count: 10
        });
    this.tableArr = this.orthologs
      .slice(this.orthoPageData.skip, this.orthoPageData.top);*/
    }

    /**
     * paginate ortholog list datasource
     * @param event
     */
    paginate(event: PageEvent) {
      this.loading = true;
      const orthologSerializer = new OrthologSerializer();
      const pageParams = {
        orthologstop: event.pageSize,
       orthologsskip: event.pageIndex * event.pageSize,
      };
      this.pharosApiService.fetchMore(this._route.snapshot.data.path, pageParams).valueChanges.subscribe(res => {
        console.log(res);
        const tempArr = res.data.targets.orthologs
          .map(ortholog => orthologSerializer.fromJson(ortholog))
          .map(ortho => orthologSerializer._asProperties(ortho));
        this.targetProps.orthologs = tempArr;
        this.loading = false;
        this.changeRef.markForCheck();
      });
    }
}
