import { Component, OnInit } from '@angular/core';
import {GeneDetailsComponent} from "../gene-details/gene-details.component";
import {SelectedFacetService} from "../../../filter-panel/selected-facet.service";
import {VennDiagramData} from "../../../../../tools/visualizations/venn-diagram/venn-diagram.component";

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
  vennData: VennDiagramData = new VennDiagramData();
  ngOnInit(): void {
    const facetValue = this.selectedFacetService.getFacetByName('similarity')?.values[0]?.name?.split(',');
    if(facetValue && facetValue.length > 1) {
      const baseTarget = facetValue[0].trim();
      if (baseTarget[0] === '(') {
        this.baseTarget = baseTarget.slice(1).trim();
      }
      const similarityFacet = facetValue[1].trim();
      if (similarityFacet[similarityFacet.length - 1] === ')') {
        this.similarityFacet = similarityFacet.slice(0, similarityFacet.length - 1).trim();
      }
    }
    this.vennData.sizeA = this.target.similarityDetails.baseSize;
    this.vennData.sizeB = this.target.similarityDetails.testSize;
    this.vennData.nameA = this.baseTarget;
    this.vennData.nameB = this.target.gene || this.target.accession;
    this.vennData.overlap = this.target.similarityDetails.overlap;
    this.vennData.facetName = this.similarityFacet;
  }
}
