import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MouseImageData} from '../../../../../../models/idg-resources/data-resource';
import {Observable, Subject, Subscription} from 'rxjs';
import {AnatomogramHoverService} from '../../../../../../tools/anatomogram/anatomogram-hover.service';
import {takeUntil} from 'rxjs/operators';
import {AnatomogramComponent} from '../../../../../../tools/anatomogram/anatomogram.component';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {DataResourcePanelComponent} from '../data-resource-panel/data-resource-panel.component';

@Component({
  standalone: true,
  imports: [
    CommonModule, AnatomogramComponent, MatCardModule, MatExpansionModule, DataResourcePanelComponent
  ],
  selector: 'pharos-mouse-expression',
  templateUrl: './mouse-expression.component.html',
  styleUrls: ['./mouse-expression.component.scss']
})
export class MouseExpressionComponent implements OnInit, OnDestroy {

  constructor(
    private anatomogramHoverService: AnatomogramHoverService
  ) {

  }
  protected ngUnsubscribe: Subject<any> = new Subject();

  @Input() mouseExpressions: MouseImageData[] = [];
  /**
   * an observable to pass for responding to updates to the list
   */
  @Input() mouseExpressionUpdates: Observable<void>;
  updateSubscription: Subscription;
  collapsed = true;
  expressionMap: Map<string, MouseImageData[]> = new Map<string, MouseImageData[]>();
  shadingKey = 'expressed';
  shadingMap: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  redrawAnatomogram: Subject<boolean> = new Subject<boolean>();

  tissues: string[] = [];

  @ViewChild('expression_card_list') expressionList: ElementRef;

  clickedTissue = '';

  ngOnInit(): void {
    this.updateSubscription = this.mouseExpressionUpdates
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.initializeLists());
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
    const map = new Map<string, number>();
    this.expressionMap.forEach((value, key) => {
      const pctExpressed = value.filter(a => a.expressed).length / value.length;
      map.set(key, pctExpressed);
    });
    this.shadingMap.set('expressed', map);
    this.sortTissues();
    this.redrawAnatomogram.next(true);
  }

  sortTissues(){
    if (this.expressionList) {
      const scrollWindow = this.expressionList.nativeElement;
      scrollWindow.scrollTop = 0;
    }
    this.tissues = this.tissues.sort((a, b) => {
      if (a === this.clickedTissue) { return -1; }
      if (b === this.clickedTissue) { return 1; }
      const expr_a = this.getExpressionValue(a);
      const expr_b = this.getExpressionValue(b);
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
    return this.shadingMap.get('expressed').get(tissue);
  }
  tissueClicked(tissue) {
    this.clickedTissue = tissue;
    this.sortTissues();
  }

  expressionDataString(tissue){
    const count = this.getExpressions(tissue).length;
    const positive = this.getExpressions(tissue).filter(expr => expr.expressed).length;
    return positive + ' of ' + count + ' conditions show expression';
  }

  getExpressions(tissue){
    return this.expressionMap.get(tissue);
  }

  setHover(uberon?: any) {
    if (uberon) {
      this.anatomogramHoverService.setTissue(uberon);
    } else {
      this.anatomogramHoverService.setTissue(null);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
