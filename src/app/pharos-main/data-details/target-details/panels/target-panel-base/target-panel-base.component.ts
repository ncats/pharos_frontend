import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-target-panel-base',
  templateUrl: './target-panel-base.component.html',
  styleUrls: ['./target-panel-base.component.scss']
})
export class TargetPanelBaseComponent extends DynamicPanelComponent implements OnInit {
  /**
   * target to display
   */
  @Input() target: Target;
  @Input() child: TargetPanelBaseComponent;

  constructor(public navSectionsService: NavSectionsService,
              private changeRef: ChangeDetectorRef) {
    super(navSectionsService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target) {
          const hasData = this.child?.hasData ? this.child.hasData.bind(this.child) : this.hasData;
          if (hasData()) {
            this.navSectionsService.showSection(this.child?.field);
            this.initialize();
          } else {
            this.navSectionsService.hideSection(this.child?.field);
          }
        }
        this.loadingComplete();
        this.changeRef.markForCheck();
      });
  }

  hasData(): boolean {
    return true;
  }

  /**
   * initialize panel data, call super.initialize(this) from child class
   */
  initialize(): void {
  }
}
