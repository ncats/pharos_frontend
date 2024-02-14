import { Component, OnInit } from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    MatIcon
  ],
  selector: 'pharos-pathway-data-sources-article',
  templateUrl: './pathway-data-sources-article.component.html',
  styleUrls: ['./pathway-data-sources-article.component.scss']
})
export class PathwayDataSourcesArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
