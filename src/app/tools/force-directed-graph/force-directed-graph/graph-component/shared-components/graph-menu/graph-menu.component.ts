import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {
  MatCheckboxChange, MatSliderChange,
  MatSlideToggleChange
} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-graph-menu',
  templateUrl: './graph-menu.component.html',
  styleUrls: ['./graph-menu.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class GraphMenuComponent implements OnInit {

  _settings: any = {
    fade: false
  };

  subGraphTypeCtrl: FormControl = new FormControl();
  activeGraph = 'nscs';

  @Output()
  readonly optionsChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly close: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
    this.subGraphTypeCtrl.valueChanges.subscribe(val => {
      this._settings = {
        fade: false
      };
      this._settings.data = this.activeGraph;
      this._settings.subgraph = val;
      this.optionsChange.emit(this._settings);
  });
  }

  setActiveGraph(val: string) {
   // this.resetScale(0,0);
    this.activeGraph = val;
    this._settings.data = val;
    this._settings.subgraph = null;
    this.optionsChange.emit(this._settings);
  }

  sliderChange(change: MatSliderChange, field: string) {
    this._settings[field] = change.value;
    this.optionsChange.emit(this._settings);

  }

  resetScale(a: number, b: number) {
    this.subGraphTypeCtrl.reset();
    this._settings = {
      fade: false,
      hESC_NSC_Fold_Change: [a, b],
      reset: true
    };
    // this._settings.subgraph = null;
    this.optionsChange.emit(this._settings);
    this._settings['reset'] = false;
  }

  setFilterType(change: MatSlideToggleChange) {
    this._settings.fade = change.checked;
    this.optionsChange.emit(this._settings);
  }

  noData(change: MatCheckboxChange) {
    this._settings['no_data'] = change.checked;
    this.optionsChange.emit(this._settings);
  }

  closeMenu(): void {
    this.close.emit(true);
  }
}
