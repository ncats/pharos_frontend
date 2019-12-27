import {Component, OnInit} from '@angular/core';
import {MolConverterService} from '../tools/marvin-sketcher/services/mol-converter.service';
import {FormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';

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
  typeCtrl: FormControl = new FormControl('substructure');

  /**
   * percentage of structure overlap control
   * @type {FormControl}
   */
  percentCtrl: FormControl = new FormControl(.8);

  /**
   * input smiles value, retrieved by either the text input or structure drawer component
   * @type {FormControl}
   */
  smilesCtrl: FormControl = new FormControl();

  /**
   * add router for navigation and molconverter to change marvinjs molfile to smiles for search
   * @param {Router} _router
   * @param {MolConverterService} molConverter
   */
  constructor(
    private _router: Router,
    private molConverter: MolConverterService
    ) {}

  /**
   * subscribe to changes to the mol file via molconverter service and set smiles form control
   */
  ngOnInit() {
    this.molConverter.smiles$.subscribe(smiles => this.smilesCtrl.setValue(smiles));
  }

  /**
   * search via url/api navigation
   */
  search() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        q: this.smilesCtrl.value,
        type: this.typeCtrl.value,
        top: 20
      },
      queryParamsHandling: ''
    };
    if (this.typeCtrl.value === 'similarity') {
      navigationExtras.queryParams.cutoff = this.percentCtrl.value;
    }
    this._router.navigate(['/ligands'], navigationExtras);
  }
}
