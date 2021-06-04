import {Component, OnInit} from '@angular/core';
import {GeneDetailsComponent} from '../gene-details/gene-details.component';
import {AssociationStats} from '../../../../../models/ligandAssociationDetails';
import {Helper} from '../../../../../models/utilities';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'pharos-target-prediction-details',
  templateUrl: './target-prediction-details.component.html',
  styleUrls: ['../long-target-card.component.scss']
})

export class TargetPredictionDetailsComponent extends GeneDetailsComponent implements OnInit {
  ligandSmiles = '';
  structureToShow = '';
  constructor(private _route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.target.targetPredictionDetails.similarity === 1){
      this.structureToShow = this.ligandSmiles;
    }
    const associatedStructure = this._route.snapshot.queryParamMap.get('associatedStructure');
    if (associatedStructure) {
      const parsedName = Helper.parseAssociatedStructure(associatedStructure);
      this.ligandSmiles = parsedName.ligandSmiles;
    }
    if (this.target.targetPredictionDetails.similarity === 1){
      this.structureToShow = this.ligandSmiles;
    } else {
      this.structureToShow = this.target.targetPredictionDetails.trainingSmiles;
    }
  }
}
