import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PharosProperty} from '../../../models/pharos-property';
import {DynamicPanelBaseComponent} from '../../dynamic-panel-base/dynamic-panel-base.component';
import {PharosProfileService} from '../../../auth/pharos-profile.service';
import {takeUntil} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {BatchResolveModalComponent} from '../../batch-resolve-modal/batch-resolve-modal.component';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';
import {Facet} from '../../../models/facet';
import {SelectionModel} from '@angular/cdk/collections';
import {isNumeric} from '../../../../util';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {CitationComponent} from '../../citation/citation.component';
import {ExploreListButtonComponent} from '../../explore-list-button/explore-list-button.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {
  DownloadCommunityDataButtonComponent
} from '../download-community-data-button/download-community-data-button.component';
import {FacetCardComponent} from '../../../pharos-main/data-list/filter-panel/facet-card/facet-card.component';
import {MatPaginator} from '@angular/material/paginator';
import {PredictionDetailsCardComponent} from '../prediction-details-card/prediction-details-card.component';
import {GenericTableComponent} from '../../generic-table/generic-table.component';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  standalone: true,
  imports: [FlexLayoutModule, CommonModule, MatCardModule, CitationComponent, ExploreListButtonComponent, MatIconModule, MatButtonModule,
    DownloadCommunityDataButtonComponent, FacetCardComponent, MatPaginator, PredictionDetailsCardComponent, GenericTableComponent],
  selector: 'pharos-prediction-set',
  templateUrl: './prediction-set.component.html',
  styleUrls: ['./prediction-set.component.scss']
})
export class PredictionSetComponent extends DynamicPanelBaseComponent implements OnInit {

  get detailsPage(): string {
    return this._route.snapshot.paramMap.get('id');
  }

  get listIsFiltered(): boolean {
    return this.predictionSet.predictions.length !== this.filteredPredictions().length;
  }

  constructor(
    public dialog: MatDialog,
    private profileService: PharosProfileService,
    private changeRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private centralStorageService: CentralStorageService,
    private targetCollection: AngularFirestore,
    private router: Router,
    private _route: ActivatedRoute) {
    super();
  }

  get pagedPredictions() {
    return this.sliceForPage(this.filteredPredictions());
  }
  get pagedPredictionProps() {
    return this.sliceForPage(this.predictionProps);
  }
  get pageSize() {
    return this.pageSizeInput || this.getStyle(this.predictionSet) === 'table' ? 5 : 8;
  }
  get fields() {
    return [
      new PharosProperty({
        name: 'name',
        label: this.predictionSet.predictions[0].alternateName || this.predictionSet.predictions[0].name,
        sortable: true
      }),
      ...this.getAlternateName(),
      ...this.getIdentifiers(),
      new PharosProperty({
        name: 'value',
        label: this.predictionSet.predictions[0].confidence.alternateName,
        sortable: true
      })];
  }

// tslint:disable-next-line:max-line-length
// { "@type": "Prediction", "name": "Predicted Cancer", "value": { "@context": "https://schema.org", "@type": "MedicalCondition", "name": "Carcinoma, Non-Small-Cell Lung", "alternateName": "MESH:D002289", "mondoid": [ "MONDO:0005233" ], "url": "/diseases/MONDO:0005233" }, "confidence": { "@context": "https://schema.org", "@type": "QuantitativeValue", "value": "0.85", "alternateName": "probability", "description": "Measure of the relevance of inhibiting a particular protein kinase for a specific cancer", "maxValue": 1, "minValue": 0 } }

  get predictionProps() {
    return this.filteredPredictions()?.map(f => {
      return this.predictionToPredictionProps(f);
    })
      .sort((a: any, b: any) => {
        const field = this.sortField.active;
        const dir = this.sortField.direction;
        if (isNumeric(a[field].term)) {
          if (dir === 'asc') {
            return a[field].term - b[field].term;
          }
          return b[field].term - a[field].term;
        } else {
          if (dir === 'asc') {
            return a[field]?.term?.localeCompare(b[field].term);
          }
          return b[field]?.term?.localeCompare(a[field].term);
        }
      });
  }
  @Input() predictionSet: {predictions: any[], citation: any};
  @Input() style = 'table';
  @Input() pageSizeInput;

  private user;
  loggedIn = false;

  page = 0;

  minConfidence = 0;
  maxConfidence = 1;

  filterSelectionmap: Map<string, SelectionModel<string>> = new Map<string, SelectionModel<string>>();
  dynamicFacets: Facet[] = [];

  sortField = {active: 'value', direction: 'desc'};

  filteredPredictions(ignoreFacet = null) {
    const filteredList = this.predictionSet.predictions.filter(pred => {
      if (pred.confidence.value < this.minConfidence) {
        return false;
      }
      if (pred.confidence.value > this.maxConfidence) {
        return false;
      }
      const props = this.predictionToPredictionProps(pred);
      const filteringFacets = this.filteringFacets();
      for (let i = 0 ; i < filteringFacets.length ; i++) {
        const key = filteringFacets[i];
        const selectionModel = this.filterSelectionmap.get(key);
        const vals = selectionModel.selected;

        let predVal = props['_' + key]?.term;
        if (key === pred.alternateName) {
            predVal = props.name.term;
          }

        if (vals.length > 0 && !vals.includes(predVal)) {
            return false;
          }
      }
      return true;
    });
    return filteredList;
  }

  filteringFacets(): string[] {
    return this.predictionSet.predictions[0].facetFields || [];
  }

  ngOnInit(): void {
    if (this.predictionSet) {
      const facetFields = this.filteringFacets();
      facetFields.forEach(facetField => {
        this.filterSelectionmap.set(facetField, new SelectionModel<string>(true, []));
      });
    }
    this.profileService.profile$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(user => {
      this.minConfidence = Math.min(...this.predictionSet.predictions.map(p => p.confidence.value));
      this.maxConfidence = Math.max(...this.predictionSet.predictions.map(p => p.confidence.value));

      this.dynamicFacets = this.calculateDynamicFacets();
      if (user) {
        this.user = user;
        this.loggedIn = true;
        this.changeRef.markForCheck();
        // User is signed in.
      } else {
        this.loggedIn = false;
        this.changeRef.markForCheck();
        // No user is signed in.
      }
    });
  }
  sliceForPage(array: any[]) {
    return array.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
  }

  predictionTypes(predictionSet) {
    const uniqueKeys = new Map<string, boolean>();
    this.filteredPredictions().forEach(p => uniqueKeys.set(p.name, true));
    return Array.from(uniqueKeys.keys());
  }

  getStyle(predictionSet) {
    return predictionSet.style || this.style; // default to table view
  }

  showCardStyle(predictionSet) {
    return this.getStyle(predictionSet) === 'card';
  }
  showTableStyle(predictionSet) {
    return this.getStyle(predictionSet) === 'table';
  }

  paginate(event){
    this.page = event.pageIndex;
  }

  getAlternateName() {
    if (this.predictionSet.predictions.find(f => f.value.alternateName)) {
      return [new PharosProperty({
        name: 'alternateName',
        label: 'Alternate Name',
        sortable: true
      })];
    }
    return [];
  }
  getIdentifiers() {
    const example = this.predictionSet.predictions.find(f => f.value.identifier);
    if (example) {
      const ids = Array.isArray(example.value.identifier) ? example.value.identifier : [example.value.identifier];
      const idFields = ids.map(id => {
        return new PharosProperty({
          name: '_' + id.name,
          label: id.name,
          sortable: true
        });
      });
      return idFields;
    }
    return [];
  }

  private predictionToPredictionProps(f) {
    const propObj = {
      name: {term: f.value.name, internalLink: f.value.url},
      alternateName: {term: f.value.alternateName},
      value: {term: this.formatConfidence(f.confidence.value)}
    };
    if (f.value.identifier) {
      if (Array.isArray(f.value.identifier)) {
        f.value.identifier.forEach(id => {
          propObj['_' + id.name] = {term: id.value};
        });
      } else {
        propObj[f.value.identifier.name] = {term: f.value.identifier.value};
      }
    }
    return propObj;
  }

  formatConfidence(val) {
    const num = parseFloat(val);
    if (isNumeric(num)) {
      return num.toPrecision(2);
    }
    return val;
  }

  changeSort(event) {
    this.sortField = event;
  }

  getPredictionsBasedOnType(type: string): any[] {
    if (this.predictionSet && this.predictionSet.predictions && this.filteredPredictions().length > 0) {
      switch (type) {
        case 'targets':
          return this.filteredPredictions().filter(p => p.value['@type'] === 'Protein');
        case 'diseases':
          return this.filteredPredictions().filter(p => p.value['@type'] === 'MedicalCondition');
        case 'ligands':
          return this.filteredPredictions().filter(p => p.value['@type'] === 'ChemicalSubstance');
      }
    }
  }

  listHasTargets() {
    return this.getPredictionsBasedOnType('targets')?.length > 0;
  }
  listHasDiseases() {
    return this.getPredictionsBasedOnType('diseases')?.length > 0;
  }
  listHasLigands() {
    return this.getPredictionsBasedOnType('ligands')?.length > 0;
  }

  getList(type: string) {
    const predictions = this.getPredictionsBasedOnType(type);
    const links = predictions.filter(p => p.value.url).map(p => {
      const url = p.value.url;
      const pieces = url.split('/');
      return pieces[pieces.length - 1];
    });
    if (links.length > 0) {
      return links.join('|');
    }
    return null;
  }

  resolveLigandList() {
    const ligandList = this.getPredictionsBasedOnType('ligands')?.map(r => {
      if (r.value.hasRepresentation && r.value.hasRepresentation.name === 'smiles') {
        return r.value.hasRepresentation.value;
      }
      return r.value.alternateName || r.value.name;
    });
    const resolveDialog = this.dialog.open(BatchResolveModalComponent, {
      height: '75vh',
      width: '66vw',
      data: {
        targetList: ligandList
      }
    });
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge'
    };
    resolveDialog.afterClosed().toPromise().then(
      resolveResult => {
        if (resolveResult) {
          resolveResult.models = 'ligands';
          resolveResult.saveList = this.loggedIn;
          resolveResult.collectionName = this.predictionSet.predictions[0].name + ' : ' + this.centralStorageService.toolboxDetailsPage;
          return this.targetCollection.collection('target-collection').add(
            resolveResult
          ).then(doc => {
            if (this.loggedIn && resolveResult.saveList) {
              this.profileService.updateSavedCollection(doc.id);
            }
            this.snackBar.open('Ligand List uploaded!');
            navigationExtras.state = {batchIds: resolveResult.targetList};
            navigationExtras.queryParams = {
              collection: doc.id,
            };
            this.snackBar.dismiss();
            this._navigate(navigationExtras);
          });
        }
      });
  }
  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate(['/ligands'], navExtras);
  }

  confidenceFacet(predictions: any[]): Facet {
    if (!predictions || predictions.length === 0) {
      return;
    }
    const facetFields = this.filteringFacets();
    if (!facetFields || facetFields.length === 0 || facetFields.includes('confidence')) {
      const max = Math.max(...predictions.map(p => p.confidence.value));
      const min = Math.min(...predictions.map(p => p.confidence.value));
      const binSize = Math.ceil(((max - min) / 25) / 0.01) * 0.01 || 1;
      const histogram = this.getConfidenceHistogram(predictions, binSize);
      const firstVal = predictions[0];
      const facet = new Facet({
        binSize,
        count: 36,
        dataType: 'Numeric',
        description: undefined,
        facet: firstVal.confidence.alternateName,
        label: undefined,
        max, min,
        singleResponse: true,
        sourceExplanation: firstVal.confidence.description,
        values: histogram
      });
      return facet;
    }
  }

  listIsUsingThisFacet(facet: Facet): boolean {
    const selectionModel = this.filterSelectionmap.get(facet.facet);
    return !!selectionModel.selected && selectionModel.selected.length > 0;
  }

  calculateDynamicFacets(): Facet[] {
    if (!this.predictionSet.predictions || this.predictionSet.predictions.length === 0) {
      return;
    }
    const facetFields = this.filteringFacets();
    const facets: Facet[] = [];
    this.fields.filter(f => facetFields?.includes(f.label)).forEach(field => {
      const facet = field.label;
      const fieldName = field.name;
      const map = new Map<string, number>();
      const values: {name: string, count: number}[] = [];
      const predictionProps = this.filteredPredictions(facet)?.map(f => {
        return this.predictionToPredictionProps(f);
      });

      this.predictionProps.forEach(prediction => {
        const val = prediction[fieldName].term;
        const count = (map.get(val) || 0) + 1;
        map.set(val, count);
      });

      map.forEach((v, k) => {
        values.push({name: k, count: v});
      });

      values.sort((a, b) => b.count - a.count);

      facets.push(new Facet({
        count: map.size,
        description: undefined,
        facet,
        label: undefined,
        singleResponse: true,
        values
      }));
    });
    return facets;
  }

  getConfidenceHistogram(predictions: any[], binSize) {
    const map: Map<number, number> = new Map<number, number>();
    predictions.forEach(p => {
      const binVal = (Math.floor(p.confidence.value / binSize)) * binSize;
      const currentCount = map.get(binVal) || 0;
      map.set(binVal, currentCount + 1);
    });
    const histogram = [];
    map.forEach((count, bin) => {
      histogram.push({
        name: bin,
        count
      });
    });
    return histogram;
  }


  returnFalse() {
    return false;
  }
  returnTrue() {
    return true;
  }

  applyConfidenceFilter(histogramComponent) {
    this.minConfidence = histogramComponent.minSetting;
    this.maxConfidence = histogramComponent.maxSetting;
    this.changeRef.markForCheck();
  }

  applyDynamicFilter(facet, values) {
    this.dynamicFacets = this.calculateDynamicFacets();
    this.changeRef.markForCheck();
  }

}
