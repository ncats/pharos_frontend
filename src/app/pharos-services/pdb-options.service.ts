import {EventEmitter, Injectable, Output} from '@angular/core';
import {SmilesUpdateDetails} from '../tools/marvin-sketcher/services/mol-change.service';

@Injectable({
  providedIn: 'root'
})
export class PdbOptionsService {
  currentColorScheme = ColorScheme.bfactor;
  currentRepresentation = Representation.cartoon;

  @Output() currentColorSchemeChanged = new EventEmitter<ColorScheme>();
  @Output() currentRepresentationChanged = new EventEmitter<Representation>();

  constructor() { }

  getColorScheme(): ColorScheme {
    return this.currentColorScheme;
  }
  getRepresentation(): Representation {
    return this.currentRepresentation;
  }

  setColorScheme(color: ColorScheme) {
    this.currentColorScheme = color;
    this.currentColorSchemeChanged.emit(this.currentColorScheme);
  }
  setRepresentation(rep: Representation) {
    this.currentRepresentation = rep;
    this.currentRepresentationChanged.emit(this.currentRepresentation);
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
