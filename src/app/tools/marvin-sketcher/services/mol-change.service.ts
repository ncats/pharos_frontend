import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MolChangeService {

  smiles = '';
  searchType = 'sim';
  @Output() smilesChanged = new EventEmitter<SmilesUpdateDetails>();
  @Output() searchTypeChanged = new EventEmitter<string>();

  constructor() {
  }

  getSmiles(): string {
    return this.smiles;
  }

  getSearchType(): string {
    return this.searchType;
  }

  updateSmiles(newSmiles: string, source: string) {
    this.smiles = newSmiles;
    this.smilesChanged.emit({newSmiles: this.smiles, source});
  }

  updateSearchType(newSearchType: string) {
    this.searchType = newSearchType;
    this.searchTypeChanged.emit(newSearchType);
  }
}

export class SmilesUpdateDetails{
  newSmiles: string;
  source: string;
}
