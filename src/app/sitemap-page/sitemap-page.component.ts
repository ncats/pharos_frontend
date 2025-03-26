import { Component, OnInit } from '@angular/core';
import {UseCaseData} from '../use-cases/use-case-data';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {ReviewBannerService} from '../pharos-services/review-banner.service';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule],
  selector: 'pharos-sitemap-page',
  templateUrl: './sitemap-page.component.html',
  styleUrls: ['./sitemap-page.component.scss']
})
export class SitemapPageComponent implements OnInit {

  constructor(public bannerService: ReviewBannerService) { }
  usecases: UseCaseData[];
  ngOnInit(): void {
    this.usecases = UseCaseData.getUseCases();
  }

}
