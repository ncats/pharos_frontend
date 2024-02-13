import { Component, OnInit } from '@angular/core';
import {UseCaseData} from '../use-cases/use-case-data';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule],
  selector: 'pharos-sitemap-page',
  templateUrl: './sitemap-page.component.html',
  styleUrls: ['./sitemap-page.component.scss']
})
export class SitemapPageComponent implements OnInit {

  constructor() { }
  usecases: UseCaseData[];
  ngOnInit(): void {
    this.usecases = UseCaseData.getUseCases();
  }

}
