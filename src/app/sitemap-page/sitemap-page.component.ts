import { Component, OnInit } from '@angular/core';
import {UseCaseData} from '../use-cases/use-case-data';

@Component({
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
