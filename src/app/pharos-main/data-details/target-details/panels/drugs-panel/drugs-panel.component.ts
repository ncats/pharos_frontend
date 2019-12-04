import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy,
  OnInit, Output, ViewChild, ViewChildren
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Ligand, LigandSerializer} from '../../../../../models/ligand';
import {PageData} from '../../../../../models/page-data';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {BehaviorSubject} from 'rxjs';
import {DiseaseSerializer} from '../../../../../models/disease';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';

/**
 * panel to generically display drugs as a pageable list of drug cards
 */
@Component({
  selector: 'pharos-drugs-panel',
  templateUrl: './drugs-panel.component.html',
  styleUrls: ['./drugs-panel.component.scss']
})
export class DrugsPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  @Output() selfDestruct: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * target object
   */
  @Input() target: Target;

  /**
   * data source used to page the ligand list
   * @type {MatTableDataSource<Ligand>}
   */
  dataSource: MatTableDataSource<Ligand> = new MatTableDataSource<Ligand>();

  /**
   * most of these dependencies handle the pagination of the data
   *
   * calls super object constructor
   * sets default structure url
   *
   * @param {NavSectionsService} navSectionsService
   * @param {HttpClient} _http
   * @param _route
   * @param pharosApiService
   * @param changeRef
   * @param {PharosConfig} pharosConfig
   */
  constructor(
    private navSectionsService: NavSectionsService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    private pharosConfig: PharosConfig) {
    super();
  }

  /**
   * todo pagination might still be a little slow, as the first load is not paginated
   * subscribe to data changes and set data when it arrives
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target.drugs && this.target.drugs.length === 0) {
          this.loading = false;
          this.navSectionsService.removeSection(this.field);
          this.ngUnsubscribe.next();
          this.ngUnsubscribe.complete();
          this.changeRef.detectChanges();
          this.selfDestruct.next('true');
        }
        this.loading = false;
      });
  }

  /**
   * paginate ligand list datasource
   * @param event
   */
  paginate(event: PageEvent) {
    this.loading = true;
    const ligandSerializer = new LigandSerializer();
    const pageParams = {
      ligandstop: event.pageSize,
      ligandsskip: event.pageIndex * event.pageSize,
    };
    this.pharosApiService.fetchMore(this._route.snapshot.data.path, pageParams).valueChanges.subscribe(res => {
      console.log(res);
      this.target.ligands = res.data.targets.ligands.map(lig => ligandSerializer.fromJson(lig));
      this.loading = false;
      this.changeRef.markForCheck();
    });
  }

  /**
   * checks to see if the display section is within view
   * @param {string} fragment
   */
  active() {
    this.navSectionsService.setActiveSection(this.field);
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
