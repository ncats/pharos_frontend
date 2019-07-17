import { Injectable } from '@angular/core';
import {LinkService, NodeService, SmrtGraph, SmrtGraphDataParserInterface} from "smrtgraph-core";
import {Observable, of} from "rxjs/index";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GraphParserService implements SmrtGraphDataParserInterface {
  id: number;
  graph: SmrtGraph;

  _data: any;
  data$: any;

  constructor(
   // private nodeService: NodeService,
  //  private linkService: LinkService,
    private db: AngularFirestore) {
  }

  setId(id: number): Observable<SmrtGraph> {
    this.id = id;
    return this.getData();
  }

  getData(): Observable<SmrtGraph> {
    // console.log(id);
    this.db.collection('topics', ref => ref.where("topicId", "==", this.id))
      .valueChanges()
      .subscribe(res => this._parseData(res));
    return of(this.graph);
  }

  _parseData(data: any) {
    /*  console.log(data);
      const tnode = this.nodeService.makeNode(data.graphData.target, data.graphData.target.id);
      if (data.graphData.ligands) {
        data.graphData.ligands.forEach(ligand => {
          const lnode = this.nodeService.makeNode(ligand, ligand.id);
          this.linkService.makeLink(`${data.graphData.target.id}-${ligand.id}`, tnode, lnode);
        })
      }
  if (data.graphData.diseases) {
        data.graphData.diseases.forEach(disease => {
          const dnode = this.nodeService.makeNode(disease, disease.id);
          this.linkService.makeLink(`${data.graphData.target.id}-${disease.id}`, tnode, dnode);
        })
      }
        this.graph = {
          nodes: this.nodeService.getNodesArr(),
          links: this.linkService.getLinksArr()
        }
    }*/
  }
}
