import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {CentralStorageService} from '../pharos-services/central-storage.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FeatureTrackingService} from '../pharos-services/feature-tracking.service';

/**
 * sequence search page
 */
@Component({
  selector: 'pharos-sequence-search-page',
  templateUrl: './sequence-search-page.component.html',
  styleUrls: ['./sequence-search-page.component.scss']
})

export class SequenceSearchPageComponent implements OnInit, OnDestroy {
  @ViewChild('sequenceField', {static: true}) sequenceField: ElementRef;

  protected ngUnsubscribe: Subject<any> = new Subject();
  /**
   * form control to adjust overlap percentage
   * @type {FormControl}
   */
  percentCtrl: UntypedFormControl = new UntypedFormControl(.5);

  /**
   * form control to retrieve the searched sequence value
   * @type {FormControl}
   */
  sequenceCtrl: UntypedFormControl = new UntypedFormControl();
  maxLength = 2000;
  truncated = false;

  /**
   * add router to navigate on form submit
   * @param {Router} _router
   */
  constructor(
    private _router: Router,
    private centralStorageService: CentralStorageService,
    private featureTrackingService: FeatureTrackingService
  ) {
  }

  ngOnInit(): void {
    this.centralStorageService.sequenceChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(seq => {
      this.initialize(seq);
    });
    this.sequenceField.nativeElement.addEventListener('paste', (event) => {
      const paste = event.clipboardData?.getData('text');
      console.log(paste);
      console.log(paste.length);
      if (paste.length > this.maxLength) {
        this.truncated = true;
      } else {
        this.truncated = false;
      }
    })
    this.initialize(this.centralStorageService.getField('sequence'));
  }

  initialize(sequence: string) {
    if (sequence.length > this.maxLength) {
      this.sequenceCtrl.setValue(sequence.slice(0, this.maxLength));
      this.truncated = true;
    } else {
      this.sequenceCtrl.setValue(sequence);
      this.truncated = false;
    }
  }

  change(event: any) {
    this.truncated = false;
  }

  /**
   * grab form values and submit via url/api navigation
   */
  search() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        sequence: this.sequenceCtrl.value,
      },
      queryParamsHandling: ''
    };
    this.featureTrackingService.trackFeature('Sequence Search');
    this._router.navigate(['/analyze/targets'], navigationExtras);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
