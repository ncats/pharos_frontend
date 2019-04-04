import { Injectable } from '@angular/core';
import {from} from "rxjs/index";
import {map} from "rxjs/operators";
import {LinkService} from "../../../../../../tools/force-directed-graph/force-directed-graph/graph-component/services/event-tracking/link.service";
import {HttpClient} from "@angular/common/http";
import {TargetNode} from "../../../../../../models/target-node";
import {DataParserInterface} from "../../../../../../tools/force-directed-graph/interfaces/data-parser-interface";
import {PharosNodeService} from "./pharos-node.service";
import {DiseaseNode} from "../../../../../../models/disease-node";
import {LigandNode} from "../../../../../../models/ligand-node";
import {TargetNodeMappingService} from "./services/target-node-mapping.service";
import {DiseaseNodeMappingService} from "./services/disease-node-mapping.service";
import {LigandNodeMappingService} from "./services/ligand-node-mapping.service";

interface FileData {
  origin: string;
  data: any;
}

const DATAFILES = '../assets/data/topic-test.json';



@Injectable({
  providedIn: 'root'
})
export class DataParserService implements DataParserInterface {

  dataMap: Map<string, any> = new Map<string, any>();

  constructor(
    private _http: HttpClient,
    private nodeService: PharosNodeService,
    private targetNodeMappingService: TargetNodeMappingService,
    private diseaseNodeMappingService: DiseaseNodeMappingService,
    private ligandNodeMappingService: LigandNodeMappingService,
    private linkService: LinkService
  ) {
    console.log(this);
  }



  private _fetchFile(url: string) {
   // return this._http.get<any[]>(DATAFILES).subscribe(res => console.log(res));
  }

  loadData(): any {
    return this._http.get<any[]>(DATAFILES)
      .pipe(
      map(res=> this._parseData(res))
      );
  }

  _parseData(data: any) {
    return from(data.content.map(query => {
      const n: TargetNode = this.targetNodeMappingService.makeNode(query.target.id, query.target);
      if (query.diseases) {
        query.diseases.map(disease => {
          const d: DiseaseNode = this.diseaseNodeMappingService.makeNode(disease.id, disease);
          this.diseaseNodeMappingService.setNode(d);
          const l = this.linkService.makeLink(`${n.id}${d.id}`, n, d, {properties: d});
          this.linkService.setLink(l);
          n.linkCount = ++n.linkCount;
        })
      }
        if (query.ligands) {
        query.ligands.map(ligand => {
          const lgd: LigandNode = this.ligandNodeMappingService.makeNode(ligand.id, ligand);
          this.ligandNodeMappingService.setNode(lgd);
          const l = this.linkService.makeLink(`${n.id}${lgd.id}`, n, lgd, {properties: lgd});
          this.linkService.setLink(l);
          n.linkCount = ++n.linkCount;
        })
      }
      this.targetNodeMappingService.setNode(n);
      this.dataMap.set('topics', {
        nodes: Array.from(this.targetNodeMappingService.getNodes().values()),
        links: Array.from(this.linkService.getLinks().values()),
      });
      return this.dataMap;
    })).subscribe(res => {
      const targets = Array.from(this.targetNodeMappingService.getNodes().values());
      const diseases = Array.from(this.diseaseNodeMappingService.getNodes().values());
      const ligands = Array.from(this.ligandNodeMappingService.getNodes().values());
      const nodes = [...targets, ...diseases, ...ligands];
      this.dataMap.set('topics', {
        nodes: nodes,
        links: Array.from(this.linkService.getLinks().values()),
      });
      return this.dataMap;
    })
  }


  getData(): Map<string,any> {
    return this.dataMap;
  }

  getTargets() {
    return Array.from(this.targetNodeMappingService.masterNodeMap.values());
  }
  getLigands() {
    return Array.from(this.ligandNodeMappingService.masterNodeMap.values());
  }
  getDisease() {
    return Array.from(this.diseaseNodeMappingService.masterNodeMap.values());
  }
}
