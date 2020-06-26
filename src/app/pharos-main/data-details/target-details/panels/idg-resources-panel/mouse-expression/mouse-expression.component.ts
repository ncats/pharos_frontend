import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataResource, MouseImageData} from "../../../../../../models/idg-resources/data-resource";
import {Observable, Subject, Subscription} from "rxjs";
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
  shadingKey: string = "expressed";
  shadingMap: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  redrawAnatamogram: Subject<boolean> = new Subject<boolean>();

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
    let map = new Map<string, number>();
    this.expressionMap.forEach((value, key) => {
      let pctExpressed = value.filter(a => a.expressed).length / value.length;
      map.set(key, pctExpressed);
    });
    this.shadingMap.set("expressed", map);
    this.sortTissues();
    this.redrawAnatamogram.next(true);
  }

  @ViewChild("expression_card_list") expressionList: ElementRef;

  sortTissues(){
    if(this.expressionList) {
      var scrollWindow = this.expressionList.nativeElement;
      scrollWindow.scrollTop = 0;
    }
    this.tissues = this.tissues.sort((a,b) => {
      if(a === this.clickedTissue) return -1;
      if(b === this.clickedTissue) return 1;
      let expr_a = this.getExpressionValue(a);
      let expr_b = this.getExpressionValue(b);
      if (expr_a == expr_b){
        return  this.getNameFromUberon(a).localeCompare(this.getNameFromUberon(b));
      }
      return expr_b - expr_a;
    });
  }

  getNameFromUberon(uid){
    return this.expressionMap.get(uid)[0].tissue;
  }

  getExpressionValue(tissue): number{
    return this.shadingMap.get("expressed").get(tissue);
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
