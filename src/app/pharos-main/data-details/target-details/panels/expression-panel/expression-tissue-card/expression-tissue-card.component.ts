import {Component, Input, OnInit} from '@angular/core';
import {AnatamogramHoverService} from "../../../../../../tools/anatamogram/anatamogram-hover.service";

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
  @Input() clickedTissue: string;
  collapsed: boolean = true;

  ngOnInit(): void {
  }

  tissueSourceString(tissueExpressions: any){
    const max = 2;
    let types = tissueExpressions.map(j => j.type);
    const uniqueTypes = [];
    for (let t of types) {
      if (!uniqueTypes.includes(t)) {
        uniqueTypes.push(t);
      }
    }
    let str = uniqueTypes.slice(0, max).join(', ');
    if (uniqueTypes.length > max) {
      str = `${str} and ${uniqueTypes.length - max} more`;
    }
    return str;
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
