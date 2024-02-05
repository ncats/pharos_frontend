import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {InjectedComponent} from '../../../../../tools/injected-component';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * component that is injected into a generic table
 * implements interface to standardize input and output
 */
@Component({
  selector: 'pharos-injected-radar-chart',
  templateUrl: './injected-radar-chart.component.html',
  styleUrls: ['./injected-radar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjectedRadarChartComponent implements InjectedComponent, OnInit, OnDestroy {

  /**
   * emits click event, whis is broadcast up
   */
  @Output() readonly clickEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * tracks when component is finished attaching
   */
  attached = false;
  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<any[]>(null);

// change data to use getter and setter
  @Input()
  set data(value: any[]) {
      // set the latest value for _data BehaviorSubject
      this._data.next(value);
  }

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  /**
   * initialize default object
   */
  object: any = {};

  /**
   * initialize default container
   */
  container: any = {};

  /**
   * target accession id
   */
  accession: string;

  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

  hgData: any[] = [];

  /**
   * inject change detector ref
   * @param ref
   */
  constructor(
    // todo: this prevents excessive re-injection of the radar chart, but breaks the tooltip
    private ref: ChangeDetectorRef
  ) { }

  /**
   * subscribe to data changes
   */
  ngOnInit() {
    this._data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.hgData = res.map(point => point = {name: point.name.term, value: point.value.term});
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
