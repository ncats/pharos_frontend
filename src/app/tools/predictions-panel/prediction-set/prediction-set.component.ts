import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PharosProperty} from "../../../models/pharos-property";
import {isNumeric} from "rxjs/internal-compatibility";
import {BatchUploadModalComponent} from "../../batch-upload-modal/batch-upload-modal.component";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DynamicPanelBaseComponent} from "../../dynamic-panel-base/dynamic-panel-base.component";
import {PharosProfileService} from "../../../auth/pharos-profile.service";
import {ReplaySubject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {BatchResolveModalComponent} from "../../batch-resolve-modal/batch-resolve-modal.component";
import {NavigationExtras, Router} from "@angular/router";
import {CentralStorageService} from "../../../pharos-services/central-storage.service";

@Component({
  selector: 'pharos-prediction-set',
  templateUrl: './prediction-set.component.html',
  styleUrls: ['./prediction-set.component.scss']
})
export class PredictionSetComponent extends DynamicPanelBaseComponent implements OnInit {
  @Input() predictionSet: {predictions: any[], citation: any};
  @Input() style = 'table';
  @Input() pageSizeInput;

  private user;
  loggedIn = false;

  page = 0;

  constructor(
    public dialog: MatDialog,
    private profileService: PharosProfileService,
    private changeRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private centralStorageService: CentralStorageService,
    private targetCollection: AngularFirestore,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.profileService.profile$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(user => {
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

  get filteredPredictions() {
    return this.sliceForPage(this.predictionSet.predictions);
  }
  get filteredPredictionProps() {
    return this.sliceForPage(this.predictionProps);
  }
  get pageSize() {
    return this.pageSizeInput || this.getStyle(this.predictionSet) === 'table' ? 5 : 8;
  }
  sliceForPage(array: any[]) {
    return array.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
  }

  predictionTypes(predictionSet) {
    const uniqueKeys = new Map<string, boolean>();
    predictionSet.predictions.forEach(p => uniqueKeys.set(p.name, true));
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
// { "@type": "Prediction", "name": "Predicted Cancer", "value": { "@context": "https://schema.org", "@type": "MedicalCondition", "name": "Carcinoma, Non-Small-Cell Lung", "alternateName": "MESH:D002289", "mondoid": [ "MONDO:0005233" ], "url": "/diseases/MONDO:0005233" }, "confidence": { "@context": "https://schema.org", "@type": "QuantitativeValue", "value": "0.85", "alternateName": "probability", "description": "Measure of the relevance of inhibiting a particular protein kinase for a specific cancer", "maxValue": 1, "minValue": 0 } }
  get predictionProps() {
    return this.predictionSet.predictions?.map(f => {
      const propObj = {
        name: {term:f.value.name, internalLink: f.value.url},
        alternateName: {term:f.value.alternateName},
        value: {term: this.formatConfidence(f.confidence.value)}
      };
      if (f.value.identifier) {
        if (Array.isArray(f.value.identifier)) {
          f.value.identifier.forEach(id => {
            propObj['_' + id.name] = {term: id.value};
          })
        } else {
          propObj[f.value.identifier.name] = {term: f.value.identifier.value};
        }
      }
      return propObj;
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
            return a[field].term.localeCompare(b[field].term)
          }
          return b[field].term.localeCompare(a[field].term)
        }
      });
  }
  sortField = {active: 'value', direction: 'desc'};

  formatConfidence(val) {
    const num = parseFloat(val);
    if (isNumeric(num)) {
      return num.toPrecision(2);
    }
    return val;
  }
// {active: 'value', direction: 'asc'}
// prediction-set.component.ts:90 {active: 'value', direction: 'desc'}
// prediction-set.component.ts:90 {active: 'alternateName', direction: 'asc'}

  changeSort(event) {
    this.sortField = event;
  }

  getFilteredPredictions(type: string): any[] {
    if (this.predictionSet && this.predictionSet.predictions && this.predictionSet.predictions.length > 0) {
      switch (type) {
        case 'targets':
          return this.predictionSet.predictions.filter(p => p.value['@type'] === 'Protein');
        case 'diseases':
          return this.predictionSet.predictions.filter(p => p.value['@type'] === 'MedicalCondition');
        case 'ligands':
          return this.predictionSet.predictions.filter(p => p.value['@type'] === 'ChemicalSubstance');
      }
    }
  }

  listHasTargets() {
    return this.getFilteredPredictions('targets')?.length > 0;
  }
  listHasDiseases() {
    return this.getFilteredPredictions('diseases')?.length > 0;
  }
  listHasLigands() {
    return this.getFilteredPredictions('ligands')?.length > 0;
  }
  getList(type: string) {
    const predictions = this.getFilteredPredictions(type);
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
    const ligandList = this.getFilteredPredictions('ligands')?.map(r => {
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
}
