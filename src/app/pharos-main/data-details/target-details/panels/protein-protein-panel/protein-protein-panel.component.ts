import { Component, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../../../app/models/target';
import {PageData} from '../../../../../../app/models/page-data';
import {map, zipAll} from 'rxjs/operators';
import {from} from 'rxjs/index';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';

/**
 * shows a list of protein to protein interactions for a target
 */
@Component({
  selector: 'pharos-protein-protein-panel',
  templateUrl: './protein-protein-panel.component.html',
  styleUrls: ['./protein-protein-panel.component.css']
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
  allTargets: Target[] = [];

  /**
   * pagination data for target table
   */
  targetPageData: PageData;

  /**
   * set up sidenav service nad http calls to fetch full target data
   * @param {NavSectionsService} navSectionsService
   * @param {HttpClient} http
   */
  constructor(
    private navSectionsService: NavSectionsService,
    private http: HttpClient
  ) {
    super();
  }

  /**
   * this gets all ppi targets, then retrieves the full target object for additional details
   * todo: this may not be needed anymore to show the target info
   * should page first, then retrieve the target info
   */
  ngOnInit() {
    this._data
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

  }

  /**
   * paginate the list of targets
   * @param $event
   */
  paginateTargets($event) {
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
