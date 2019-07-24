import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LinkService, NodeService} from "smrtgraph-core";
import {GraphParserService} from "./services/graph-parser.service";
import {PharosNodeSerializer} from './models/topic-graph/pharos-node-serializer';



@Component({
  selector: 'pharos-topic-graph-panel',
  templateUrl: './topic-graph-panel.component.html',
  styleUrls: ['./topic-graph-panel.component.scss'],
  providers: [NodeService, LinkService, GraphParserService]
})
export class TopicGraphPanelComponent<T extends Node> implements OnInit {

  @Input() topic = {id: 1};

  dataMap: Map<string, any> = new Map<string, any>();


  public loaded = false;

  graph: any;

  constructor(
    private _http: HttpClient,
    private graphParserService: GraphParserService
  ) {}

  ngOnInit() {
    console.log(this);
    this.graphParserService.setSerializers({node: new PharosNodeSerializer()});

    this.graphParserService.setId(this.topic.id).subscribe(res => {
    });
    this.graphParserService.data$.subscribe(res=> this.graph = res);
    //  this.dataParserService.LoadData();
/*    this.dataParserService.loadData().subscribe(res => {

    });*/
  }

  filterGraph(event: Event) {
    /*    const nodes = this._filterNodes(event);
        const edges = this._filterEdges(event, nodes);
        this.graphDataService.setGraph({
          nodes: nodes,
          links: edges
        });*/
  }

  _filterNodes(params: Event): Node[] {
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

  nodeEvents(event){}
  linkEvents(event){}

  _filterEdges(params: Event, nodes: T) {
    const data = params['data'] ? params['data'] : 'nscs';
   // const links: Link[] = this.dataMap.get(data).links as Link[];
    /*const currentNodes = nodes.map(node => node.uuid);
    links = links.filter(link => {
      const source: string = link.getSourceId();
      const target: string = link.getTargetId();
      return currentNodes.includes(source) && currentNodes.includes(target);
    });*/
   // return links;
  }
}
