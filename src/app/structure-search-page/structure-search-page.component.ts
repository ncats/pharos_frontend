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
  resolverResults: any = {};

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
        this.resolverResults = {};
        this.resolverCtrl.setValue('');
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
    this.molChangeService.updateSmiles(event.target.value, 'smilesCtrl');
  }

  typeChanged(event) {
    this.molChangeService.updateSearchType(event);
  }

  /**
   * search via url/api navigation
   */
  searchLigands() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        associatedStructure: (this.typeCtrl.value || 'sim') + Facet.separator + this.smilesCtrl.value,
      },
      queryParamsHandling: ''
    };
    this._router.navigate(['/ligands'], navigationExtras);
  }

  async findLychi() {
    if (this.resolverResults?.lychi) {
      return this.parseLychi(this.resolverResults.lychi);
    }
    await this.resolveCompound(
      {
        target:
          {
            value: this.smilesCtrl.value
          }
      });
    return this.parseLychi(this.resolverResults.lychi);
  }

  parseLychi(fullLychi) {
    const pieces = fullLychi?.split('-');
    if (pieces.length > 3) {
      return pieces[3];
    }
    return null;
  }

  /**
   * search via url/api navigation
   */
  async searchTargets() {
    const lychi = await this.findLychi();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        associatedLigand: lychi,
        associatedStructure: this.smilesCtrl.value,
      },
      queryParamsHandling: ''
    };
    this._router.navigate(['/targets'], navigationExtras);
  }

  resolveCompound(event) {
    return this.resolverService.resolve(event.target.value).then(res => {
      this.resolverResults = res;
    });
  }
}
