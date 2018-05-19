import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Term} from "../../../../../models/term";
import {MatTabChangeEvent} from "@angular/material";

@Component({
  selector: 'pharos-expression-panel',
  templateUrl: './expression-panel.component.html',
  styleUrls: ['./expression-panel.component.css']
})
export class ExpressionPanelComponent extends DynamicPanelComponent implements OnInit {
  tissueData: Map<string, Term[]> = new Map<string, Term[]>();
  sources: string[] = [
    "GTEx Tissue",
    "HPM Tissue",
    "HPA RNA Tissue",
    "IDG Tissue",
    "UniProt Tissue",
    "Jensen-KB Tissue",
   // "Jensen-TM Tissue",
    "IDG Tissue Ref",
  ];
  width = 30;
  constructor() {
    super();
  }

  ngOnInit() {
    console.log(this);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if(this.data.expression) {
          this.tissueData.clear();
          this.mapTissueData();
        }
        if(this.data.differential) {
          this.getDifferential();
        }
      });
  }

  mapTissueData(): void {
    this.data.expression.forEach(tissue => {
      const tissueTerm: Term = new Term(tissue);
      const tissueArr: Term[] = this.tissueData.get(tissueTerm.label);
      if(tissueArr){
        tissueArr.push(tissueTerm);
        this.tissueData.set(tissueTerm.label, tissueArr);
      } else {
        this.tissueData.set(tissueTerm.label, [tissueTerm]);
      }
    })
  }

  getDifferential() {

  }

  getData(field: string): Term[] {
    return this.tissueData.get(field);
  }

  getSourceCount(source: string): number {
    return this.tissueData.get(source) ? this.tissueData.get(source).length : 0;
  }

  changeTabData(event: MatTabChangeEvent) {
    console.log(event);
   // this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }
}
