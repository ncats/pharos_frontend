import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  store: any;
  initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformID: any) {
    if (isPlatformBrowser(this.platformID)) {
      this.store = localStorage;
      this.initialized = true;
    }
  }

  getItem(key: string){
    if (this.isAvailable()) {
      return this.store.getItem(key);
    }
  }

  setItem(key: string, val: any) {
    if (this.isAvailable()) {
      return this.store.setItem(key, val);
    }
  }

  isAvailable(): boolean {
    if (isPlatformBrowser(this.platformID)) {
      return typeof localStorage !== 'undefined';
    }
    return false;
  }
}
