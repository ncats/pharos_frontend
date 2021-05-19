import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {MolChangeService} from '../tools/marvin-sketcher/services/mol-change.service';
import {Facet} from '../models/facet';

/**
 * page to search by structure
 */
@Component({
  selector: 'pharos-structure-search-page',
  templateUrl: './structure-search-page.component.html',
  styleUrls: ['./structure-search-page.component.scss']
})

export class StructureSearchPageComponent implements OnInit {
  /**
   * type of structure search to perform
   * @type {FormControl}
   */
  typeCtrl: FormControl = new FormControl('sim');

  /**
   * input smiles value, retrieved by either the text input or structure drawer component
   * @type {FormControl}
   */
  smilesCtrl: FormControl = new FormControl();

  /**
   * add router for navigation
   * @param {Router} _router
   */
  constructor(
    private _router: Router,
    private molChangeService: MolChangeService
    ) {}


  ngOnInit() {
    this.molChangeService.smilesChanged.subscribe(changeObj => {
      if (changeObj.source !== 'smilesCtrl') {
        this.smilesCtrl.setValue(changeObj.newSmiles);
      }
    });
    this.typeCtrl.setValue(this.molChangeService.getSearchType());
    this.molChangeService.searchTypeChanged.subscribe(newType => {
      this.typeCtrl.setValue(newType);
    });
  }

  smilesChanged(event){
    this.molChangeService.updateSmiles(event.target.value, 'smilesCtrl');
  }

  typeChanged(event){
    this.molChangeService.updateSearchType(event);
  }

  /**
   * search via url/api navigation
   */
  search() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        associatedStructure: this.typeCtrl.value + Facet.separator + this.smilesCtrl.value,
      },
      queryParamsHandling: ''
    };
    this._router.navigate(['/ligands'], navigationExtras);
  }
}
