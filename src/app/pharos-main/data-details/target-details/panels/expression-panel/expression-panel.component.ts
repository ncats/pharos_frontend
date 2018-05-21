import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {Term} from "../../../../../models/term";
import {MatTabChangeEvent} from "@angular/material";
import {Value} from "../../../../../models/value";
import {Property} from "../../../../../models/property";
import {BehaviorSubject} from "rxjs/index";

@Component({
  selector: 'pharos-expression-panel',
  templateUrl: './expression-panel.component.html',
  styleUrls: ['./expression-panel.component.css']
})
export class ExpressionPanelComponent extends DynamicPanelComponent implements OnInit {
  id: string;
  tissueData: Map<string, Property[] > = new Map<string, Property[]>();
hgData: any[] = [];
  /**
   * initialize a private variable _radarData, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _radarData = new BehaviorSubject<any>([]);
  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set radarData(value: any) {
    this._radarData.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get radarData() {
    return this._radarData.getValue();
  }

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
          this.radarData =  this.setRadarData();
          this.hgData = this.tissueData.get(this.sources[0]);
        }
        if(this.data.differential) {
          this.getDifferential();
        }
      });
  }

  mapTissueData(): void {
    this.data.expression.forEach(tissue => {
      const tissueTerm: Property = new Term(tissue);
      const tissueArr: Property[] = this.tissueData.get(tissueTerm.label);
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

  setRadarData(): any[] {
    const axes : any [] = [];
    const radar : any = [];
const filters = ['GTEx Tissue Specificity Index', 'HPM Protein Tissue Specificity Index', 'HPA RNA Tissue Specificity Index'];
  filters.forEach(field => {
    const data: any = this.tissueData.get(field)[0];
    axes.push({axis: field, value: data['numval']});
  });
   radar.push({className:this.id, axes: axes});
  return radar;
  }

  getData(field: string): Property[] {
    return this.tissueData.get(field);
  }

  getSourceCount(source: string): number {
    return this.tissueData.get(source) ? this.tissueData.get(source).length : 0;
  }

  changeExpressionTabData(event: MatTabChangeEvent) {
    console.log(event);
   // this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }

  changeHarminogramTabData(event: MatTabChangeEvent) {
    console.log(event);
    this.hgData = this.tissueData.get(this.sources[event.index]);

    // this.tableArr = this.sourceMap.get(this.sources[event.index]);
  }
}
