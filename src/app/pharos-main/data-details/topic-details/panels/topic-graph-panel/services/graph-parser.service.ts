import { Injectable } from '@angular/core';
import {LinkService, NodeService, SmrtGraph, SmrtGraphDataParserInterface} from 'smrtgraph-core';
import {Observable, of, Subject} from 'rxjs/index';
import {AngularFirestore} from '@angular/fire/firestore';
import {PharosConfig} from '../../../../../../../config/pharos-config';
import {take} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphParserService implements SmrtGraphDataParserInterface {
  id: number;
  graph: SmrtGraph;

  _data = new Subject<SmrtGraph>();

  data$ = this._data.asObservable();
  confidences = [];

  constructor(
    private nodeService: NodeService,
    private linkService: LinkService,
    private pharosConfig: PharosConfig,
    private db: AngularFirestore) {
  }

  setId(id: number): Observable<SmrtGraph> {
    this.id = id;
    return this.loadData();
  }

  setSerializers(serializers) {
    if (serializers.node) {
      this.nodeService.setSerializer(serializers.node);
    }
  }

  loadData(): Observable<SmrtGraph> {
    this.db.collection('topics', ref => ref.where('topicLinkId', '==', this.id))
      .valueChanges().pipe(take(1))
      .subscribe(res => this._parseData(res));
    return of(this.graph);
  }

  _parseData(queries: any) {
      queries.forEach(data => {
        const tnode = this.nodeService.makeNode(data.graphData.target, `target${data.graphData.target.id}`);
        if (data.graphData.ligands) {
          data.graphData.ligands.forEach(ligand => {
/*            ligand.structureId = ligand['image'].split('/structure/')[1].split('.')[0];
            ligand.internalLink = ['/ligands', ligand.id];*/
            const lnode = this.nodeService.makeNode(ligand, `ligand${ligand.id}`);
            tnode.linkCount++;
            lnode.linkCount++;
            this.nodeService.setNode(tnode);
            this.nodeService.setNode(lnode);
            this.linkService.makeLink(`${data.graphData.target.id}-${ligand.id}`, tnode, lnode);
          });
        }
        if (data.graphData.diseases) {
          data.graphData.diseases.forEach(disease => {
            if (disease.IDG_Confidence) {
              this.confidences.push(disease.IDG_Confidence);
            }
            const dnode = this.nodeService.makeNode(disease, `disease${disease.id}`);
            tnode.linkCount++;
            dnode.linkCount++;
            this.nodeService.setNode(tnode);
            this.nodeService.setNode(dnode);
            this.linkService.makeLink(`${data.graphData.target.id}-${disease.id}`, tnode, dnode);
          });
        }
        //console.log(data.graphData.ligands);
        /*this.db.collection('topics')
          .doc(data.graphData.graphData.query)
          .set({
            topicLinkId: this.id,
            graphData: data.graphData.graphData
          });*/
      });

    // this.confidences = [...new Set(this.confidences)];
    const ret: SmrtGraph = {
        nodes: this.nodeService.getNodesArr(),
        links: this.linkService.getLinksArr()
        };
     this._data.next(ret);
    }

  getData(): Observable<SmrtGraph> {
    return this.data$;
  }
}
