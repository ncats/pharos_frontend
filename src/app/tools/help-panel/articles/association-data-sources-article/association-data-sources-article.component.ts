import { Component, OnInit } from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    MatIcon
  ],
  selector: 'pharos-association-data-sources-article',
  templateUrl: './association-data-sources-article.component.html',
  styleUrls: ['./association-data-sources-article.component.scss']
})
export class AssociationDataSourcesArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
