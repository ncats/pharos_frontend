import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from '@angular/common/http';
import {Target, TargetSerializer} from '../../../../../../app/models/target';
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
   * @param changeRef
   */
  constructor(
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private navSectionsService: NavSectionsService,
    private changeRef: ChangeDetectorRef
  ) {
    super();
  }

  /**
   * this gets all ppi targets
   */
  ngOnInit() {
    console.log(this.data);
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

  skip() {
    console.log("table still paginated);");
  }
  /**
   * paginate the list of targets
   * @param event
   */
  paginate(event: PageEvent) {
    console.log(event);
    this.loading = true;
    const targetSerializer = new TargetSerializer();
    const pageParams = {
      ppistop: event.pageSize,
      ppisskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.fetchMore(this._route.snapshot.data.path, pageParams).valueChanges.subscribe(res => {
      console.log(res);
      const retArr = [];
      const retprops = [];
      /*console.log(res.data.targets.ppis.forEach(ppi => {
        retArr.push(targetSerializer.fromJson(ppi));
        retprops.push(targetSerializer._asProperties(ppi));
      }));
  console.log(retArr);
  console.log(retprops);
  this.ppis = {
          trbs: retArr.map(tgt => tgt.target)
      };*/
    /* const target: Target = targetSerializer.fromJson(res.data.targets);
      console.log(target);
      const targetProps =  targetSerializer._asProperties(target);*/
     /* this.ppis = {
        targets: target.ppis,
        targetsProps: res.data.targets.ppis
      };*/
      console.log(this.ppis);
      this.loading = false;
     // this.changeRef.markForCheck();

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
