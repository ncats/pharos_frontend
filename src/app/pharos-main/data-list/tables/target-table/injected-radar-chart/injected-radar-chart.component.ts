import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {InjectedComponent} from '../../../../../tools/injected-component';
import {PharosProperty} from '../../../../../models/pharos-property';
import {BehaviorSubject, Subject} from 'rxjs/index';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-injected-radar-chart',
  templateUrl: './injected-radar-chart.component.html',
  styleUrls: ['./injected-radar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjectedRadarChartComponent implements InjectedComponent, OnInit {

  @Output() readonly clickEvent: EventEmitter<any> = new EventEmitter<any>();

  attached = false;
  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<PharosProperty>(null);

// change data to use getter and setter
  @Input()
  set data(value: any) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }

  object: any = {};
  container: any = {};
  imageUrl: string;
  accession: string;

  /**
   * Behaviour subject to allow extending class to unsubscribe on destroy
   * @type {Subject<any>}
   */
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    // todo: this prevents excessive re-injection of the radar chart, but breaks the tooltip
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._data
      .subscribe(res => {
      this.accession = this.object.accession.term;
    });
  }
}
