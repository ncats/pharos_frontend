import { Injectable } from '@angular/core';
import {LinkService, NodeService, SmrtGraph, SmrtGraphDataParserInterface} from 'smrtgraph-core';
import {Observable, of, Subject} from 'rxjs/index';
import {AngularFirestore} from '@angular/fire/firestore';
import {PharosConfig} from '../../../../../../../config/pharos-config';
import {take} from 'rxjs/internal/operators';

/**
 * service to parse graph data into a format required by smrtgraph
 */
@Injectable({
  providedIn: 'root'
})
export class GraphParserService implements SmrtGraphDataParserInterface {
  /**
   * id of graph
   */
  id: number;

  /**
   * generated graph object
   */
  graph: SmrtGraph;

  /**
   * subject to watch smrtgraph object changes
   */
  _data = new Subject<SmrtGraph>();

  /**
   * return subject as observable
   */
  data$ = this._data.asObservable();

  /**
   * confidence values available
   * used to set min and max confidences
   */
  confidences = [];

  /**
   * import services and config to build graph
   * @param nodeService
   * @param linkService
   * @param pharosConfig
   * @param db
   */
  constructor(
    private nodeService: NodeService,
    private linkService: LinkService,
    private pharosConfig: PharosConfig,
    private db: AngularFirestore) {
  }

  /**
   * set topic graph id. fetches from firebase
   * @param id
   */
  setId(id: number): Observable<SmrtGraph> {
    this.id = id;
    return this.loadData();
  }

  /**
   * set node serializer types, passes this to node service
   * @param serializers
   */
  setSerializers(serializers) {
    if (serializers.node) {
      this.nodeService.setSerializer(serializers.node);
    }
  }

  /**
   * fetches graph data from firebase, gets data, parses it and returns graph
   * todo: if i am storing graphs in firebase, i should store the actual graph so i don't need to regenerate it each time
   */
  loadData(): Observable<SmrtGraph> {
    this.db.collection('topics', ref => ref.where('topicLinkId', '==', this.id))
      .valueChanges().pipe(take(1))
      .subscribe(res => this._parseData(res));
    return of(this.graph);
  }

  /**
   * parse out object data from returned firebase info
   * todo: this function should only be needed when a graph is first generated
   * @param queries
   * @private
   */
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

  /**
   * fetch graph data
   */
  getData(): Observable<SmrtGraph> {
    return this.data$;
  }
}
