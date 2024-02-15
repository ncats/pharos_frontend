import {EventEmitter, Injectable, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CentralStorageService {
  facetMap: Map<string, string> = new Map<string, string>();
  tourData: Map<string, any> = new Map<string, any>();
  browseTypes: string[] = [];
  rowSelection = new SelectionModel<any>(true);
  collections: Map<string, string> = new Map<string, string>();
  sequence: string = '';
  selectedTinxDiseases: string[] = [];
  focusedTinxDisease: any = {};
  toolboxDetailsPage: string = '';
  sourcesMap: Map<string, any> = new Map<string, any>();
  visibleCommunityAPIs: any[] = [];

  @Output() displayFacetChanged = new EventEmitter<{model: string, facet: string}>();
  @Output() browseTypesChanged = new EventEmitter<string[]>();
  @Output() sequenceChanged = new EventEmitter<string>();
  @Output() selectedTinxDiseasesChanged = new EventEmitter<string[]>();
  @Output() focusedTinxDiseaseChanged = new EventEmitter<any>();
  @Output() visibleCommunityAPIsChanged = new EventEmitter<any[]>();

  showVisible(code) {
    this.setVisible(code, true);
  }
  hideVisible(code) {
    this.setVisible(code, false);
  }
  setVisible(code: string, show: boolean) {
    const api = this.visibleCommunityAPIs.find(f => f.code === code);
    if (api) {
      api.visible = show;
    }
  }

  addVisibleCommunityAPI(api: any) {
    this.visibleCommunityAPIs.push(api);
    this.visibleCommunityAPIsChanged.next(this.visibleCommunityAPIs);
  }
  clearVisibleCommunityAPIs() {
    this.visibleCommunityAPIs = [];
    this.visibleCommunityAPIsChanged.next(this.visibleCommunityAPIs);
  }

  constructor() { }

  getModel(route: ActivatedRoute): string {
    let model = route.snapshot.data.path;
    if (model.endsWith('s')) {
      model = model.slice(0, model.length - 1);
    }
    return model.charAt(0).toUpperCase() + model.slice(1);
  }

  getBrowseTypes(): string[] {
    return this.browseTypes;
  }

  setBrowseTypes(types: string[]) {
    this.browseTypes = types;
    this.browseTypesChanged.emit(this.browseTypes);
  }

  getTourData(tour: string): any {
    return this.tourData.get(tour);
  }

  setTourData(pageType: string, data: any) {
    if (!data) {
      return;
    }
    this.tourData.set(pageType, data);
  }

  getDisplayFacet(model: string): string {
    return this.facetMap.get(model);
  }

  setDisplayFacet(model: string, facet: string) {
    if (!facet || facet.length === 0) {
      return;
    }
    this.facetMap.set(model, facet);
    this.displayFacetChanged.emit({model, facet});
  }

  getField(field: string): any {
    return this[field];
  }

  setField(field: string, value: any) {
    this[field] = value;
    this[field + 'Changed'].emit(value);
  }
}
