import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Target} from '../../../../../models/target';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import { MatDialog } from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

/**
 * displays illumination progress for a target
 */
@Component({
  selector: 'pharos-level-summary',
  templateUrl: './level-summary-panel.component.html',
  styleUrls: ['./level-summary-panel.component.scss']
})
export class LevelSummaryPanelComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * target displayed
   */
  @Input() target: Target;

  /**
   * properties object of target
   */
  @Input() targetProps: any;

  /**
   * fetch services
   * @param {NavSectionsService} navSectionsService
   * @param {ChangeDetectorRef} changeRef
   */
 constructor(private changeRef: ChangeDetectorRef,
             public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  /**
   * set objects from data
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
          this.targetProps = this.data.targetsProps;
          this.loadingComplete();
          this.changeRef.markForCheck();
      });
  }

  /**
   * unsubscribe from data
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
