import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Link} from "./force-directed-graph/graph-component/models/link";
import {Node} from "./force-directed-graph/graph-component/models/node";

import {GraphDataService} from "./force-directed-graph/graph-component/services/graph-data.service";
import {DataParserService} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/data-parser.service";
import {
  PharosD3Service
} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-d3.service";
import {LinkService} from "./force-directed-graph/graph-component/services/event-tracking/link.service";
import {PharosNodeService} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-node.service";


@Component({
  selector: 'pharos-topic-graph',
  templateUrl: './topic-graph.component.html',
  styleUrls: ['./topic-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicGraphComponent<T extends Node> implements OnInit {
  /**
   * list of nodes
   * @type {Node[]}
   */
  public nodes: Node[] = [];

  /**
   * list of links
   * @type {Link[]}
   */
  public links: Link[] = [];

  dataMap: Map<string, any> = new Map<string, any>();


  public loaded = false;

  graph: any;

  constructor(
    private _http: HttpClient,
    private dataParserService: DataParserService,
    private d3Service: PharosD3Service,
   // private nodeService: PharosNodeService,
    private linkService: LinkService,
    private graphDataService: GraphDataService
  ){}

  ngOnInit() {
    console.log(this);
  //  this.dataParserService.LoadData();
    this.dataParserService.LoadData().subscribe(res => {
  console.log(res);
      this.dataMap = this.dataParserService.getData();
      console.log(this.dataMap);
      this.graphDataService.setGraph(this.dataMap.get('topics'))
    });
  }

  filterGraph(event: Event) {
/*    const nodes = this._filterNodes(event);
    const edges = this._filterEdges(event, nodes);
    this.graphDataService.setGraph({
      nodes: nodes,
      links: edges
    });*/
  }

  _filterNodes(params: Event): Node[]{
    return [];
  /*  const data = params['data'] ? params['data'] : 'nscs';
    let nodes: Protein[] = this.dataMap.get(data).nodes as Protein[];
    if(params['reset']){
      return nodes.map(node => {
        node.tempcolor = null;
        return node;
      });
    } else {
      Object.keys(params).forEach(param => {
        // skip iterating from the fade parameter
        if (param !== 'fade') {
          if (Array.isArray(params[param])) {
            if (params['fade'] === true) {
              nodes = nodes.map(node => {
                if (node[param] >= params[param][0] && node[param] <= params[param][1]) {
                  node.tempcolor = null;
                } else {
                  node.tempcolor = '#f6f6f6';
                }
                return node;
              });
            } else {
              nodes = nodes.filter(node => {
                node.tempcolor = null;
                return node[param] >= params[param][0] && node[param] <= params[param][1];
              });
            }
          }
        }
      });
      if (params['no_data'] === true) {
        nodes = nodes.filter(node => {
          return node.hESC_NSC_Fold_Change !== -100
        });

      }
      if (params['subgraph']) {
        if (params['subgraph'] !== 'null') {
          const node = nodes.filter(node => {
            return node.name === params['subgraph']
          });
          this.nodeService.hoveredNode(node);
          this.d3Service._manualClick(node[0], this.graphDataService.returnGraph());
        }
      }
      return nodes;
    }*/
  }

  _filterEdges(params: Event, nodes : T) {
    const data = params['data'] ? params['data'] : 'nscs';
    let links: Link[] = this.dataMap.get(data).links as Link[];
    /*const currentNodes = nodes.map(node => node.uuid);
    links = links.filter(link => {
      const source: string = link.getSourceId();
      const target: string = link.getTargetId();
      return currentNodes.includes(source) && currentNodes.includes(target);
    });*/
    return links;
  }
}
