import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewBannerService {
  bannerVisible = signal(false);

  dismissBanner() {
    this.bannerVisible.set(false);
  }

  showBanner() {
    this.bannerVisible.set(true);
  }
}
