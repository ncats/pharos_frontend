import {Component, Input, OnInit} from '@angular/core';
import {ViralInteractionDetails, VirusDetails} from '../../../../../../models/virus-interactions';

@Component({
  selector: 'pharos-virus-details',
  templateUrl: './virus-details.component.html',
  styleUrls: ['./virus-details.component.scss']
})
export class VirusDetailsComponent implements OnInit {

  @Input() virus: VirusDetails;
  collapsed: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  confirmed() {
    return this.virus.interactionDetails.filter(ppi => ppi.confirmed()).length;
  }
  predicted() {
    return this.virus.interactionDetails.filter(ppi => !ppi.confirmed()).length;
  }

  virusDetailsString() {
    const conf = this.confirmed();
    const pred = this.predicted();
    if (conf) {
      return `(${pred} predicted interaction${pred === 1 ? '' : 's'}, ${conf} confirmed interaction${conf === 1 ? '' : 's'})`;
    }
    return `(${pred} predicted interaction${pred === 1 ? '' : 's'})`;
  }

  isPrediction(interaction: ViralInteractionDetails) {
    return interaction.pdbIDs?.length === 0;
  }
}
