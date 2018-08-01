import { Component, OnInit } from '@angular/core';
import {MolConverterService} from '../tools/marvin-sketcher/services/mol-converter.service';
import {FormControl} from '@angular/forms';
import {StructureSetterService} from '../tools/marvin-sketcher/services/structure-setter.service';
import {NavigationExtras, Router} from '@angular/router';
import {MatSliderChange} from '@angular/material';

@Component({
  selector: 'pharos-sequence-search-page',
  templateUrl: './sequence-search-page.component.html',
  styleUrls: ['./sequence-search-page.component.scss']
})
export class SequenceSearchPageComponent implements OnInit {
  percentCtrl: FormControl = new FormControl();
  sequenceCtrl: FormControl = new FormControl();

  constructor(
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.percentCtrl.setValue(.5);
  }

  search() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        q: this.sequenceCtrl.value,
        type: 'sequence',
        identity: this.percentCtrl.value,
        top: 20
      },
      queryParamsHandling: ''
    };
    this._router.navigate(['/targets'], navigationExtras);
  }
}
