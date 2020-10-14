import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Target} from '../../../../../models/target';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {UnfurlingMetaService} from "../../../../../pharos-services/unfurling-meta.service";
import {NavigationEnd, Router} from "@angular/router";

/**
 * displays the description of a target
 */
@Component({
  selector: 'pharos-gene-summary',
  templateUrl: './gene-summary.component.html',
  styleUrls: ['./gene-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneSummaryComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  /**
   * target to display
   */
  @Input() target: Target;

  /**
   * truncated description text
   */
  truncatedDescription: string;

  /**
   * boolean to show full or truncated description
   */
  fullDescription = true;

  /**
   * set mobile breakpoints
   * @param breakpointObserver
   * @param metaService
   * @param changeRef
   */
  constructor(private breakpointObserver: BreakpointObserver,
              private metaService: UnfurlingMetaService,
              private changeRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformID: Object,
              private router: Router) {
    super();
  }

  /**
   * subscribe to data changes
   */
  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.metaService.destroyCanonicalURL();
        }
      });
    this.setterFunction();
  }

  /**
   * concatanate description from various sources, and truncate if too long
   */
  setterFunction() {
    this.fullDescription = true;
    this.truncatedDescription = null;
    if (this.target.description && this.target.description.length > 1000) {
      this.fullDescription = false;
      this.truncatedDescription = this.target.description.slice(0, 1000);
    }
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.fullDescription = false;
      if (this.target.description && this.target.description.length > 500) {
        this.truncatedDescription = this.target.description.slice(0, 500);
      }
    }

    let newTitle = `Pharos: ${this.target.name} (${this.target.idgTDL})`;
    this.metaService.setMetaData({description: this.target.description || '', title: newTitle});
    this.metaService.createCanonicalURL(['targets', (this.target.accession)]);
    this.changeRef.markForCheck();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.metaService.destroyCanonicalURL();
  }
}
