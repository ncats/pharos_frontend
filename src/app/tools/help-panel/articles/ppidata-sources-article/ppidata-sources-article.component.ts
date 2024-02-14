import { Component, OnInit } from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    MatIcon
  ],
  selector: 'pharos-ppidata-sources-article',
  templateUrl: './ppidata-sources-article.component.html',
  styleUrls: ['./ppidata-sources-article.component.scss']
})
export class PPIDataSourcesArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
