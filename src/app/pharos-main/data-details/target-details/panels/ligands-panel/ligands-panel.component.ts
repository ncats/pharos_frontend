import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Ligand, LigandSerializer} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from '../../../../../../config/pharos-config';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {TargetComponents} from "../../../../../models/target-components";
import {Facet} from "../../../../../models/facet";

/**
 * panel to generically display ligands as a pageable list of ligand cards
 */
@Component({
  selector: 'pharos-ligands-panel',
  templateUrl: './ligands-panel.component.html',
  styleUrls: ['../drugs-panel/drugs-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandsPanelComponent extends DynamicPanelComponent implements OnInit {

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
   * reference to Facet class for use in the html
   */
  Facet = Facet;

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
        if (this.target.ligands) {
          if (this.target.ligands.length === 0) {
            this.navSectionsService.hideSection(this.field);
          } else {
            this.navSectionsService.showSection(this.field);
          }
        }
        this.changeRef.markForCheck();
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
    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, TargetComponents.Component.Ligands).subscribe(res => {
      this.target.ligands = res.data.targets.ligands.map(lig => ligandSerializer.fromJson(lig));
      this.loading = false;
      this.changeRef.markForCheck();
    });
  }

  /**
   * checks to see if the display section is within view
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
