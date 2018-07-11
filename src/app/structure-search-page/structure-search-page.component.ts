import { Component, OnInit } from '@angular/core';
import {MolConverterService} from "../tools/marvin-sketcher/services/mol-converter.service";
import {FormControl} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
import {StructureSetterService} from "../tools/marvin-sketcher/services/structure-setter.service";

@Component({
  selector: 'pharos-structure-search-page',
  templateUrl: './structure-search-page.component.html',
  styleUrls: ['./structure-search-page.component.scss']
})
export class StructureSearchPageComponent implements OnInit {
  typeCtrl: FormControl = new FormControl();
  percentCtrl: FormControl = new FormControl();
  smilesCtrl: FormControl = new FormControl();

  constructor(
    private _router : Router,
    private molConverter: MolConverterService,
    private structureSetter: StructureSetterService
    ) {

  }

  ngOnInit() {
    this.typeCtrl.setValue('substructure');
    this.percentCtrl.setValue(.8);
    this.molConverter.smiles$.subscribe(smiles => this.smilesCtrl.setValue(smiles));
  }

  search() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        q: this.smilesCtrl.value,
        type: this.typeCtrl.value,
       // cutoff: this.percentCtrl.value,
        top: 20
      },
      queryParamsHandling: ''
    };
    if(this.typeCtrl.value ==='similarity') {
      navigationExtras.queryParams.cutoff = this.percentCtrl.value;
    }
      this._router.navigate(['/ligands'], navigationExtras);
  }
}
