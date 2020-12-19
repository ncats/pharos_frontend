import { Component, OnInit } from '@angular/core';
import {GeneDetailsComponent} from "../gene-details/gene-details.component";
import {SelectedFacetService} from "../../../filter-panel/selected-facet.service";

@Component({
  selector: 'pharos-similarity-details',
  templateUrl: './similarity-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})
export class SimilarityDetailsComponent extends GeneDetailsComponent implements OnInit {

  similarityFacet: string = "";
  baseTarget: string = "";
  constructor(private selectedFacetService: SelectedFacetService) {
    super();
  }

  ngOnInit(): void {

    const facetValue = this.selectedFacetService.getFacetByName('similarity').values[0].name.split(',');

    const baseTarget = facetValue[0].trim();
    if(baseTarget[0] === '('){
      this.baseTarget = baseTarget.slice(1).trim();
    }

    const similarityFacet =facetValue[1].trim();
    if(similarityFacet[similarityFacet.length - 1] === ')'){
      this.similarityFacet = similarityFacet.slice(0,similarityFacet.length - 1).trim();
    }
  }
}
