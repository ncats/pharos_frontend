import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataResource, MouseImageData} from "../../../../../../models/idg-resources/data-resource";
import {Observable, Subscription} from "rxjs";
import {AnatamogramHoverService} from "../../../../../../tools/anatamogram/anatamogram-hover.service";

@Component({
  selector: 'pharos-mouse-expression',
  templateUrl: './mouse-expression.component.html',
  styleUrls: ['./mouse-expression.component.scss']
})
export class MouseExpressionComponent implements OnInit {

  @Input() mouseExpressions: MouseImageData[] = [];
  /**
   * an observable to pass for responding to updates to the list
   */
  @Input() mouseExpressionUpdates: Observable<void>;
  updateSubscription: Subscription;
  collapsed: boolean = true;
  expressionMap: Map<string, MouseImageData[]> = new Map<string, MouseImageData[]>();

  constructor(
    private anatamogramHoverService: AnatamogramHoverService,
    private changeRef: ChangeDetectorRef) {

  }

  tissues: string[] = [];

  ngOnInit(): void {
    this.updateSubscription = this.mouseExpressionUpdates.subscribe(() => this.initializeLists());
    this.initializeLists();
  }

  initializeLists() {
    this.expressionMap.clear();
    this.mouseExpressions.forEach(dataset => {
      const uberons = this.expressionMap.get(dataset.uberon);
      if (uberons) {
        uberons.push(dataset);
        this.expressionMap.set(dataset.uberon, uberons);
      } else {
        this.expressionMap.set(dataset.uberon, [dataset]);
      }
    });
    this.tissues = Array.from(this.expressionMap.keys());
    this.sortTissues();
  }

  sortTissues(){
    var scrollWindow = window.document.getElementById('expression-card-list');
    scrollWindow.scrollTop = 0;
    this.tissues = this.tissues.sort((a,b) => {
      if(a === this.clickedTissue) return -1;
      if(b === this.clickedTissue) return 1;
      return a.localeCompare(b);
    });
  }

  clickedTissue: string = "";
  tissueClicked(tissue) {
    this.clickedTissue = tissue;
    this.sortTissues();
  }

  expressionDataString(tissue){
    let count = this.getExpressions(tissue).length;
    let positive = this.getExpressions(tissue).filter(expr => {return expr.expressed}).length;
    return positive + ' of ' + count + ' conditions show expression';
  }

  getExpressions(tissue){
    return this.expressionMap.get(tissue);
  }

  setHover(uberon?: any) {
    if (uberon) {
      this.anatamogramHoverService.setTissue(uberon);
    } else {
      this.anatamogramHoverService.setTissue(null);
    }
  }
}
