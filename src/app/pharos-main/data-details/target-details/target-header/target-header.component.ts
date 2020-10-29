import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Target} from '../../../../models/target';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from "../../../../tools/sidenav-panel/services/nav-sections.service";

@Component({
  selector: 'pharos-target-header',
  templateUrl: './target-header.component.html',
  styleUrls: ['./target-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetHeaderComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;

  @Input() data: any;
  /**
   * no args constructor
   * call super object constructor
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
       this.target = this.data.targets;
       this.changeRef.markForCheck();
      });
  }

  getHeaderClass(): string {
    if (this.target) {
      return this.target.idgTDL.toLowerCase() + '-header';
    }
  }
}
