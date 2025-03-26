import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {ReviewBannerService} from '../../../pharos-services/review-banner.service';
import {animate, style, trigger, transition} from '@angular/animations';

@Component({
  selector: 'pharos-review-banner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './review-banner.component.html',
  styleUrl: './review-banner.component.scss',
  animations: [
    trigger('close', [
      transition(':leave', [
        animate('0.25s', style({
          transform: 'translateY(-100%)', // Slides up and away
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ReviewBannerComponent {
  constructor(public bannerService: ReviewBannerService) {
  }

  animationState = 'in';

  dismiss() {
    this.animationState = 'void';
    this.bannerService.dismissBanner();
  }
}
