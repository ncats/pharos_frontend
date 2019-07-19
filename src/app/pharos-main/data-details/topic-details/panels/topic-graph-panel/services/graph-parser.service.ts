import { Injectable } from '@angular/core';
import {LinkService, NodeService, SmrtGraph, SmrtGraphDataParserInterface} from "smrtgraph-core";
import {Observable, of, Subject} from "rxjs/index";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GraphParserService implements SmrtGraphDataParserInterface {
  id: number;
  graph: SmrtGraph;

  _data = new Subject<SmrtGraph>();

  data$ = this._data.asObservable();

  constructor(
    private nodeService: NodeService,
    private linkService: LinkService,
    private db: AngularFirestore) {
  }

  setId(id: number): Observable<SmrtGraph> {
    this.id = id;
    return this.loadData();
  }

  setSerializers(serializers) {
    if(serializers.node) {
      this.nodeService.setSerializer(serializers.node);
    }
  }

  loadData(): Observable<SmrtGraph> {
    // console.log(id);
    this.db.collection('topics', ref => ref.where("topicId", "==", this.id))
      .valueChanges()
      .subscribe(res => this._parseData(res));
    return of(this.graph);
  }

  _parseData(queries: any) {
      console.log(queries);
      queries.forEach(data => {
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
      })

    const ret: SmrtGraph = {
        nodes: this.nodeService.getNodesArr(),
        links: this.linkService.getLinksArr()
        }

        console.log(ret);
        this._data.next(ret);
    }

  getData(): Observable<SmrtGraph> {
    return this.data$;
  }
}
