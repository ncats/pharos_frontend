import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PageData} from '../../../../../models/page-data';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {ExploreListButtonComponent} from '../../../../../tools/explore-list-button/explore-list-button.component';
import {TargetRelevanceTableComponent} from './target-relevance-table/target-relevance-table.component';

/**
 * shows what targets the ligand was tested on
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, ComponentHeaderComponent, ExploreListButtonComponent,
    TargetRelevanceTableComponent],
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
   * page data object to track pagination
   */
  pageData: PageData;

  activitiesTargetDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  /**
   * subscribe to data changes and map data to PharosProperty objects for table display
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (this.data && this.data.ligands) {
          this.ligand = this.data.ligands;
          this.ligandProps = this.data.ligandsProps;
          if (isPlatformBrowser(this.platformID)) {
            this.loadingComplete();
          }
          this.activitiesTargetDataSource.data = this.ligandProps.activities;
          this.activitiesTargetDataSource.paginator = this.paginator;
          this.changeRef.markForCheck();
        }
      });
  }
}
