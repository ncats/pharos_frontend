import {Component, Input, OnInit} from '@angular/core';
import {AnatamogramHoverService} from "../../../../../../tools/anatamogram/anatamogram-hover.service";
import {ExpressionPanelComponent} from "../expression-panel.component";

@Component({
  selector: 'pharos-expression-tissue-card',
  templateUrl: './expression-tissue-card.component.html',
  styleUrls: ['./expression-tissue-card.component.scss']
})
export class ExpressionTissueCardComponent implements OnInit {

  constructor(
    private anatamogramHoverService: AnatamogramHoverService
  ) { }

  @Input() tissueExpressionSources: any;
  @Input() sortKey: string;
  @Input() clickedTissue: string;
  @Input() dataField: string;
  collapsed: boolean = true;

  ngOnInit(): void {
  }

  friendlyName(field){
    switch (field) {
      case 'tissue' :
        return 'Tissue';
      case 'qual' :
        return 'Qualitative';
      case 'value' :
        return 'Value';
      case 'evidence' :
        return 'Evidence';
      case 'conf' :
        return 'Confidence';
      case 'pmid' :
        return 'Pubmed ID';
    }
      return field;
  }

  tissueSourceString(tissueExpressions: any[]){
    let descStr: string;
    if(!this.sortKey){
      let types = tissueExpressions.map(j => j.type + ": " + j[ExpressionPanelComponent.getPreferredField(j.type)]);
      descStr = types.join(', ');
    }
    else{
      let data = tissueExpressions.filter(a => a.type === this.sortKey);
      if(data.length === 0){
        descStr = 'no data';
      }
      else{
        descStr = this.friendlyName(this.dataField) + ': ' + data.map(a => a[this.dataField]).join(', ');
      }
    }
    return descStr;
  }


  /**
   * set uberon id for element that is hovered from list
   * @param {string} uberon
   */
  setHover(uberon?: any) {
    if (uberon) {
      this.anatamogramHoverService.setTissue(uberon);
    } else {
      this.anatamogramHoverService.setTissue(null);
    }
  }
}
