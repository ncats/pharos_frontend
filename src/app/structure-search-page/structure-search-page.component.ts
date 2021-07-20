import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, NavigationExtras, Router} from '@angular/router';
import {MolChangeService} from '../tools/marvin-sketcher/services/mol-change.service';
import {Facet} from '../models/facet';
import {environment} from '../../environments/environment';
import {ResolverService} from '../pharos-services/resolver.service';
import {TourService} from '../pharos-services/tour.service';
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
  isDev = false;

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
    private tourService: TourService
  ) {
  }


  ngOnInit() {
    this._router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          if (this._route.snapshot.queryParamMap.get('tutorial') === 'structure-search-tour') {
            this.tourService.structureSearchTour(true);
          }
        }
      });

    this.resolverIsUp = this.resolverService.resolverIsUp;
    this.isDev = !environment.production;
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
    if (this._route.snapshot.queryParamMap.get('tutorial') === 'structure-search-tour') {
      this.tourService.structureSearchTour(true);
    } else {
      this.tourService.structureSearchTour(false);
    }
  }

  beginTour() {
    this.tourService.structureSearchTour(true);
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
  /**
   * search via url/api navigation
   */
  searchTargets() {
    this.clearData();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        associatedStructure: this.smilesCtrl.value,
      },
      queryParamsHandling: ''
    };
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
