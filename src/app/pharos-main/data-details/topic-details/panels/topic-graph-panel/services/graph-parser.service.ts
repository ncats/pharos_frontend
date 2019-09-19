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
   * todo: the ligand activity is rewritten for each relationship
   * @param queries
   * @private
   */
  _parseData(queries: any) {
    console.log(queries);
      queries.forEach(data => {
        const tnode = this.nodeService.makeNode(data.graphData.target, `target${data.graphData.target.id}`);
        if (data.graphData.ligands) {
          data.graphData.ligands.forEach(ligand => {
            const lnode = this.nodeService.makeNode(ligand, `ligand${ligand.id}`);
            tnode.linkCount++;
            lnode.linkCount++;
            this.nodeService.setNode(tnode);
            this.nodeService.setNode(lnode);
            this.linkService.makeLink(`${ligand.id}-${data.graphData.target.id}`, lnode, tnode, this._getActivity(ligand));
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
            this.linkService.makeLink(`${data.graphData.target.id}-${disease.id}`, tnode, dnode, this._getConfidence(disease));
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

  private _getActivity(ligand: any): any {
    let data: any = {};
      if (ligand.Ligand_Activity) {
        data = {
          properties: {
            activity: `${ligand.Ligand_Activity}: ${ligand[ligand.Ligand_Activity]}`,
            activityType: ligand.Ligand_Activity,
            value: ligand[ligand.Ligand_Activity]
          }
        };
      }
      if (ligand.Pharmalogical_Action) {
        data = {
          properties: {
            activity: `${ligand.Pharmalogical_Action}: ${ligand[ligand.Pharmalogical_Action]}`,
            activityType: ligand.Pharmalogical_Action,
            value: ligand[ligand.Pharmalogical_Action]
          }
        };
      }

    return data;
  }

  private _getConfidence(disease: any): any {
    let data: any = {};
    if (disease.Data_Source) {
      data = {
        properties: {
          confidence: disease.IDG_Confidence,
          dataSource: disease.Data_Source,
          evidence: disease.IDG_Evidence,
          log2foldchange: disease.log2foldchange,
          pvalue: disease.pvalue ? disease.pvalue.toFixed(3) : null
        }
      };
    }

      return data;
  }
}
