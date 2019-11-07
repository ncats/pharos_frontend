import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../../../app/models/target';
import {PageData} from '../../../../../../app/models/page-data';
import {map, zipAll} from 'rxjs/operators';
import {from} from 'rxjs/index';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DiseaseSerializer} from '../../../../../models/disease';
import {PageEvent} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';

/**
 * shows a list of protein to protein interactions for a target
 */
@Component({
  selector: 'pharos-protein-protein-panel',
  templateUrl: './protein-protein-panel.component.html',
  styleUrls: ['./protein-protein-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProteinProteinPanelComponent extends DynamicPanelComponent implements OnInit {
  /**
   * parent target
   */
  targets: Target[];

  /**
   * list of all targets
   * @type {any[]}
   */
  ppis: any = {};

  /**
   * parent target
   */
  @Input() target: Target;

  targetProps: any;

  /**
   * pagination data for target table
   */
  targetPageData: PageData;

  /**
   * @param pharosApiService
   * @param _route
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private navSectionsService: NavSectionsService
  ) {
    super();
  }

  /**
   * this gets all ppi targets
   */
  ngOnInit() {
    console.log(this);
    this.target = this.data.targets;
    // todo: there is randomly a uniprot object field here
    this.ppis = {
      targets: this.data.targets.ppis.map(ppi => ppi.target),
      targetsProps: this.data.targetsProps.ppis
    };




    this.targetPageData = new PageData({
      top: 10,
      skip: 0,
      count: 10,
      total: this.target.ppiCount
    });
    this.loading = false;
    /*this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.targets = [];
       if (this.data.interactions && this.data.interactions.content.length > 0 ) {
         this.ngUnsubscribe.next();
         from(this.data.interactions.content[0].objects.map(obj => {
           return this.http.get<Target>(obj.href);
         })).pipe(
           zipAll()
         ).subscribe(res => {
           this.allTargets = res as Target[];
           this.targetPageData = new PageData({
             top: 10,
             skip: 0,
             count: 10,
             total: this.allTargets.length
           });
           this.targets = this.allTargets.slice(this.targetPageData.skip, this.targetPageData.top);
           }
         );
       }
       this.loading = false;
      });
*/
  }

  /**
   * paginate the list of targets
   * @param event
   */
  paginate(event: PageEvent) {
    this.loading = true;
    const targetSerializer = new TargetSerializer();
    const pageParams = {
      diseasetop: event.pageSize,
      diseaseskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.fetchMore(this._route.snapshot.data.path, pageParams).valueChanges.subscribe(res => {
      this.target.ppis = res.data.targets.ppis;
      this.targetProps = res.data.targets
        .map(target => targetSerializer.fromJson(target))
      .map(ppi => targetSerializer._asProperties(ppi));
    });
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
