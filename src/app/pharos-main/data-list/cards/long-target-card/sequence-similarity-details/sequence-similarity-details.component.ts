import { Component, OnInit } from '@angular/core';
import {GeneDetailsComponent} from '../gene-details/gene-details.component';

@Component({
  selector: 'pharos-sequence-similarity-details',
  templateUrl: './sequence-similarity-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})
export class SequenceSimilarityDetailsComponent extends GeneDetailsComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
