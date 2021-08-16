import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentralStorageService {
  pdbColorScheme = ColorScheme.bfactor;
  pdbRepresentation = Representation.cartoon;
  facetMap: Map<string, string> = new Map<string, string>();
  tourData: Map<string, any> = new Map<string, any>();

  @Output() pdbColorSchemeChanged = new EventEmitter<ColorScheme>();
  @Output() pdbRepresentationChanged = new EventEmitter<Representation>();
  @Output() displayFacetChanged = new EventEmitter<{model: string, facet: string}>();

  constructor() { }

  getTourData(tour: string): any {
    return this.tourData.get(tour);
  }

  setTourData(tour: string, data: any) {
    if (!data) {
      return;
    }
    this.tourData.set(tour, data);
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

export enum Representation {
  axes = 'axes',
  backbone = 'backbone',
  'ball+stick' = 'ball+stick',
  // base = 'base',
  cartoon = 'cartoon',
  // contact = 'contact',
  // distance = 'distance',
  // helixorient = 'helixorient',
  // hyperball = 'hyperball',
  // label = 'label',
  // licorice = 'licorice',
  // line = 'line',
  // point = 'point',
  // ribbon = 'ribbon',
  rocket = 'rocket',
  rope = 'rope',
  spacefill = 'spacefill',
  // surface = 'surface', // surface throws an error when minified -- https://github.com/nglviewer/ngl/issues/594
  // trace = 'trace',
  // tube = 'tube',
  // unitcell = 'unitcell',
  // validation = 'validation'
}

export enum ColorScheme {
  target = 'target',
  atomindex = 'atomindex',
  bfactor = 'bfactor',
  // chainid = 'chainid',
  // chainindex = 'chainindex',
  chainname = 'chainname',
  // densityfit = 'densityfit',
  electrostatic = 'electrostatic',
  element = 'element',
  // entityindex = 'entityindex',
  // entitytype = 'entitytype',
  // geoquality = 'geoquality',
  hydrophobicity = 'hydrophobicity',
  // modelindex = 'modelindex',
  // moleculetype = 'moleculetype',
  // occupancy = 'occupancy',
  // random = 'random',
  // residueindex = 'residueindex',
  resname = 'resname',
  sstruc = 'sstruc',
  // uniform = 'uniform',
  // value = 'value',
  // volume = 'volume'
}
