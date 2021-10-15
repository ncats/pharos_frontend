import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from '@angular/router';
import {MolChangeService} from '../tools/marvin-sketcher/services/mol-change.service';
import {Facet} from '../models/facet';
import {ResolverService} from '../pharos-services/resolver.service';
import {UnfurlingMetaService} from '../pharos-services/unfurling-meta.service';
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
  resolverCtrl: FormControl = new FormControl();
  resolverIsUp = false;

  /**
   * add router for navigation
   * @param {Router} _router
   */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private molChangeService: MolChangeService,
    public resolverService: ResolverService,
    private metaService: UnfurlingMetaService
  ) {
  }


  ngOnInit() {
    this._router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
        }
      });

    this.resolverIsUp = this.resolverService.resolverIsUp;
    this.molChangeService.smilesChanged.subscribe(changeObj => {
      if (changeObj.source !== 'smilesCtrl') {
        this.smilesCtrl.setValue(changeObj.newSmiles);
      }
      if (changeObj.source !== 'resolver') {
        // this.resolverCtrl.setValue('');
      }
    });
    this.typeCtrl.setValue(this.molChangeService.getSearchType());
    this.molChangeService.searchTypeChanged.subscribe(newType => {
      this.typeCtrl.setValue(newType);
    });

    this.metaService.setMetaData({
      description: `Use the structure search tool to initiate a search based on a chemical structure.`,
      title: `Pharos: Structure Search`
    });
  }

  smilesChanged(event) {
    this.resolverCtrl.setValue('');
    this.resolverService.responseDetails = {};
    this.molChangeService.updateSmiles(event.target.value, 'smilesCtrl');
  }

  typeChanged(event) {
    this.molChangeService.updateSearchType(event);
  }

  /**
   * search via url/api navigation
   */
  searchLigands() {
    this.clearData();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        associatedStructure: (this.typeCtrl.value || 'sim') + Facet.separator + this.smilesCtrl.value,
      },
      queryParamsHandling: ''
    };
    this._router.navigate(['/ligands'], navigationExtras);
  }

  findLychi() {
    // const lychi = this.resolverService.responseDetails?.lychi;
    // if (lychi) {
    //   const pieces = lychi.split('-');
    //   if (pieces.length > 3) {
    //     return pieces[3];
    //   }
    // }
    return null;
  }

  /**
   * search via url/api navigation
   */
  searchTargets() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        associatedLigand: this.findLychi(),
        associatedStructure: this.smilesCtrl.value,
      },
      queryParamsHandling: ''
    };
    this.clearData();
    this._router.navigate(['/targets'], navigationExtras);
  }

  clearData() {
    this.resolverService.responseDetails = {};
    this.resolverCtrl.setValue('');
  }

  resolveCompound(event) {
    this.resolverService.resolve(event.target.value);
  }
}
