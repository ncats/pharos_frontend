import { Injectable } from '@angular/core';
import {PharosApiService} from './pharos-api.service';
import {LocalStorageService} from './local-storage.service';
import {v4} from 'uuid';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FeatureTrackingService {
  featureTrackingKeyName = 'UserKeyForFeatureUsageStats';
  constructor(private pharosApiService: PharosApiService,
              private localStorageService: LocalStorageService) { }
  isProduction = environment.production;

  trackFeature(feature: string, detail1?: string, detail2?: string, detail3?: string) {
    if (this.isProduction) {
      let userKey = this.localStorageService.store.getItem(this.featureTrackingKeyName);
      if (!userKey) {
        userKey = v4();
        this.localStorageService.store.setItem(this.featureTrackingKeyName, userKey);
      }

      const featureDetails = {
        user: userKey,
        feature,
        detail1, detail2, detail3
      };
      return this.pharosApiService.adHocMutation(this.pharosApiService.featureTrackingMutation(), featureDetails).toPromise().then(res => {});
    }
  }
}
