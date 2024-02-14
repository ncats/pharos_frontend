import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataSourceInfo, DataVersionInfo} from "../../../../../../models/dataVersion";
import {MatCardTitle} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {ExpressionDetailsBlockComponent} from './expression-details-block/expression-details-block.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatMenuItem} from '@angular/material/menu';

@Component({
  standalone: true,
  imports: [
    CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule,
    MatCardTitle, ExpressionDetailsBlockComponent,
    MatTooltip, MatMenuItem
  ],
  selector: 'pharos-expression-details',
  templateUrl: './expression-details.component.html',
  styleUrls: ['./expression-details.component.scss']
})
export class ExpressionDetailsComponent implements OnInit, OnChanges {
  @Input() expressions: any[];
  @Input() gtex: any[];
  @Input() selectedTissue = '';
  @Input() closeFunction;
  @Input() dataVersions: DataVersionInfo[];

  selectedUberon: any = {};

  filteredExpressionMap: Map<string, any[]> = new Map<string, any[]>();
  filteredGTEX: any[];

  constructor() { }

  ngOnInit(): void {
    this.initialize();
  }

  closeDetails() {
    if (this.closeFunction) {
      this.closeFunction();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedTissue && changes.selectedTissue.currentValue.length > 0){
      this.initialize();
    }
  }

  initialize() {
    if (this.selectedTissue && this.selectedTissue.length > 0) {
      this.selectedUberon = {};
      this.filteredGTEX = this.gtex.filter(e => {
        const tissue = e.uberon?.name || e.tissue;
        return tissue === this.selectedTissue;
      });
      this.filteredGTEX.forEach(e => {
        if (e.uberon && e.uberon.uid) {
          this.selectedUberon = e.uberon;
        }
      });
      this.filteredExpressionMap.clear();
      this.expressions.filter(e => {
        const tissue = e.uberon?.name || e.tissue;
        return tissue === this.selectedTissue;
      }).forEach(e => {
        if (e.uberon && e.uberon.uid) {
          this.selectedUberon = e.uberon;
        }
        let map;
        if (this.filteredExpressionMap.has(e.type)) {
           map = this.filteredExpressionMap.get(e.type);
        } else {
          map = [];
          this.filteredExpressionMap.set(e.type, map);
        }
        map.push(e);
      });
    }
  }
}
