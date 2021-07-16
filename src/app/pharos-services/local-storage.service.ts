import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  store: any;
  initialized = false;

  constructor() {
    this.store = localStorage;
    this.initialized = true;
  }

  isAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
