import {Component, Input, OnInit} from '@angular/core';
import {Facet} from "../../../../models/facet";
import {environment} from "../../../../../environments/environment";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'pharos-facet-card',
    templateUrl: './facet-card.component.html',
    styleUrls: ['./facet-card.component.scss', '../filter-panel.component.scss']
})
export class FacetCardComponent implements OnInit {
    @Input() applyFilterOverride: () => void;
    @Input() facet: Facet;
    @Input() startExpanded = true;
    @Input() filterSelection: SelectionModel<string>;

    showDescription = false;
    toggleDescription() {
      this.showDescription = !this.showDescription;
    }
    getFacetPanelID(facet: Facet) {
      return facet?.facet?.replace(/\s/g, '');
    }

    facetIsPrediction(facet: Facet){
      return facet.facet.toLowerCase().startsWith('predict');
    }

    isProduction = environment.production;

    @Input() showFacetEnrichment: (facet: Facet) => void;

    @Input() listIsFiltered: boolean;

    @Input() filterIsInUse: (filterName: string) => boolean;

    constructor() {
    }

    ngOnInit(): void {
    }
}
