import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {CentralStorageService} from '../pharos-services/central-storage.service';
import {PharosApiService} from '../pharos-services/pharos-api.service';

/**
 * sequence search page
 */
@Component({
  selector: 'pharos-sequence-search-page',
  templateUrl: './sequence-search-page.component.html',
  styleUrls: ['./sequence-search-page.component.scss']
})

export class SequenceSearchPageComponent implements OnInit {
  /**
   * form control to adjust overlap percentage
   * @type {FormControl}
   */
  percentCtrl: FormControl = new FormControl(.5);

  /**
   * form control to retrieve the searched sequence value
   * @type {FormControl}
   */
  sequenceCtrl: FormControl = new FormControl();

  /**
   * add router to navigate on form submit
   * @param {Router} _router
   */
  constructor(
    private _router: Router,
    private centralStorageService: CentralStorageService,
    private pharosApiService: PharosApiService
  ) {
  }

  ngOnInit(): void {
    this.centralStorageService.sequenceChanged.subscribe(seq => {
      this.initialize(seq);
    });
    this.initialize(this.centralStorageService.getField('sequence'));
  }

  initialize(sequence: string) {
    this.sequenceCtrl.setValue(sequence);
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
    this._router.navigate(['/targets'], navigationExtras);
  }
  results: any;
  runBlast() {
    const variables = {sequence: this.sequenceCtrl.value.trim()};
    this.pharosApiService.adHocQuery(this.pharosApiService.blastpSearch(), variables).toPromise().then((results: any) => {
        this.results = results;
    });
  }
}
