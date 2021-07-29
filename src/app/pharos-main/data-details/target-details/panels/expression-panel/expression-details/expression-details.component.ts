import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'pharos-expression-details',
  templateUrl: './expression-details.component.html',
  styleUrls: ['./expression-details.component.scss']
})
export class ExpressionDetailsComponent implements OnInit, OnChanges {
  @Input() expressions: any[];
  @Input() gtex: any[];
  @Input() selectedTissue = '';
  selectedUberon = '';

  filteredExpressionMap: Map<string, any[]> = new Map<string, any[]>();
  filteredGTEX: any[];

  constructor() { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedTissue && changes.selectedTissue.currentValue.length > 0){
      this.initialize();
    }
  }

  initialize() {
    if (this.selectedTissue && this.selectedTissue.length > 0) {
      this.selectedUberon = '';
      this.filteredGTEX = this.gtex.filter(e => {
        const tissue = e.uberon?.name || e.tissue;
        return tissue === this.selectedTissue;
      });
      this.filteredGTEX.forEach(e => {
        if (e.uberon && e.uberon.uid) {
          this.selectedUberon = e.uberon.uid;
        }
      });
      this.filteredExpressionMap.clear();
      this.expressions.filter(e => {
        const tissue = e.uberon?.name || e.tissue;
        return tissue === this.selectedTissue;
      }).forEach(e => {
        if (e.uberon && e.uberon.uid) {
          this.selectedUberon = e.uberon.uid;
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
