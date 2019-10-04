import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';

/**
 * sequence search page
 */
@Component({
  selector: 'pharos-sequence-search-page',
  templateUrl: './sequence-search-page.component.html',
  styleUrls: ['./sequence-search-page.component.scss']
})

export class SequenceSearchPageComponent {
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
    private _router: Router
  ) {}



  /**
   * grab form values and submit via url/api navigation
   */
  search() {
   /* const navigationExtras: NavigationExtras = {
      queryParams: {
        q: this.sequenceCtrl.value,
        type: 'sequence',
        identity: this.percentCtrl.value,
        top: 20
      },
      queryParamsHandling: ''
    };
    this._router.navigate(['/targets'], navigationExtras);*/
  }
}
