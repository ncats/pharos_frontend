import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Facet} from 'src/app/models/facet';
import {takeUntil} from 'rxjs/operators';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'pharos-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends DynamicPanelComponent implements OnInit {
  isProduction = environment.production;
  term = '';
  tabParams: TabParams[] = [];
  Facet = Facet;

  constructor(public dynamicServices: DynamicServicesService,
              private _route: ActivatedRoute, private router: Router,
              public centralStorageService: CentralStorageService,
              private changeRef: ChangeDetectorRef) {
    super(dynamicServices);
  }


  ngOnInit(): void {

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialize();
        }
      });
    this.initialize();
  }

  hasData() {
    return this.hasDBresults() || this.hasFacetResults();
  }

  hasDBresults() {
    return this.data.targets.count > 0 ||
      this.data.diseases.count > 0 ||
      this.data.ligands.count > 0;
  }

  hasFacetResults() {
    return this.data.targetFacets.length > 0 ||
      this.data.diseaseFacets.length > 0 ||
      this.data.ligandFacets.length > 0;
  }

  initialize() {
    this.term = this._route.snapshot.queryParamMap.get('q') || this._route.snapshot.queryParamMap.get('query');

    this.tabParams = [
      new TabParams({
        title: `Target Filter Matches (${this.data.targetFacets.length})`,
        tooltip: 'Tab of target filters that have matching values',
        overridePath: 'targets',
        facets: this.data.targetFacets
      }),
      new TabParams({
        title: `Disease Filter Matches (${this.data.diseaseFacets.length})`,
        tooltip: 'Tab of disease filters that have matching values',
        overridePath: 'diseases',
        facets: this.data.diseaseFacets
      }),
        new TabParams({
        title: `Ligand Filter Matches (${this.data.ligandFacets.length})`,
        tooltip: 'Tab of ligand filters that have matching values',
        overridePath: 'ligands',
        facets: this.data.ligandFacets
      })
    ];
  }

  getIcon(entry: any) {
    switch (entry.entityType) {
      case 'Target':
        return 'track_changes';
      case 'Ligand':
        return 'medication';
      case 'Disease':
        return 'coronavirus';
    }
    return 'help';
  }

  facetIsPrediction(facet: Facet) {
    return facet.facet.toLowerCase().startsWith('predict');
  }

  getFilterName(entityType: string) {
    return entityType.split(':')[0];
  }

  truncate(text: string, length: number) {
    if (!text || text.length === 0 || this.term.length === 0) {
      return '';
    }
    const index = text.toLowerCase().indexOf(this.term.toLowerCase());
    const start = Math.max(index - length / 2, 0);
    let blurb = text.substr(start, length).trim();
    const regex = new RegExp(this.term, 'gi');
    blurb = blurb.replace(regex, (match) => {
        return '<b>' + match + '</b>';
      }
    );
    let ret = '';
    if (start > 0) {
      ret += '... ';
    }
    ret += blurb;
    if ((start + length) < text.length) {
      ret += ' ...';
    }
    return ret;
  }

  showInfo: Map<Facet, boolean> = new Map<Facet, boolean>();
  showingInfo(facet: Facet): boolean{
    if (this.showInfo.has(facet)){
      return this.showInfo.get(facet);
    }
    return false;
  }
  toggleFacetInfo(facet: Facet){
    const currentVal = this.showingInfo(facet);
    this.showInfo.set(facet, !currentVal);
  }

}

export class TabParams {
  title: string;
  tooltip: string;
  overridePath: string;
  facets: Facet[];
  constructor(obj) {
    this.title = obj.title;
    this.tooltip = obj.tooltip;
    this.overridePath = obj.overridePath;
    this.facets = obj.facets;
  }
  hasData() {
    return this.facets.length > 0;
  }
}
