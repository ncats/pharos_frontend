import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {GraphDataService, LinkService, NodeService, SGLink, SGNode, SmrtgraphCoreComponent} from 'smrtgraph-core';
import {GraphParserService} from './services/graph-parser.service';
import {PharosNodeSerializer} from './models/topic-graph/pharos-node-serializer';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {MatSelectionListChange} from '@angular/material';
import {SelectionChange} from '@angular/cdk/collections';

/**
 * topic graph panel component
 * contains smrtgraph instance
 * filters panel
 * node details section
 */
@Component({
  selector: 'pharos-topic-graph-panel',
  templateUrl: './topic-graph-panel.component.html',
  styleUrls: ['./topic-graph-panel.component.scss'],
  providers: [NodeService, LinkService, GraphParserService],
  encapsulation: ViewEncapsulation.None
})
export class TopicGraphPanelComponent<T extends SGNode> implements OnInit {
  /**
   * smrtgraph object from component it is injected into
   */
  @ViewChild('smrtgraph', {read: SmrtgraphCoreComponent, static: false}) smrtGraph: SmrtgraphCoreComponent;

  /**
   * top[ic id input
   */
  @Input() topic = {id: 1};

  /**
   * possible filterable options
   */
  options = ['Tclin', 'Tchem', 'Tbio', 'Tdark', 'disease', 'ligand'];

  /**
   * map of data listed
   * todo: currently not used, should probably contain the master nodes list
   */
  dataMap: Map<string, any> = new Map<string, any>();

  /**
   * filtered nodes map, changes node properties based on filtering
   * todo: this sghould be replaced, because it is still to messy to filter this way. rather than change the objects, a new graph should
   * todo: be built with these nodes, and the links filtered/regenerated
   * todo: should node sizes stay the same?
   */
  nodesMap: Map<string, any[]> = new Map<string, any[]>([
    ['Tclin', []],
    ['Tchem', []],
    ['Tbio', []],
    ['Tdark', []],
    ['disease', []],
    ['ligand', []],
  ]);

  /**
   * tracks if graph is loading
   */
  public loading = true;

  /**
   * graph object
   * todo: should propbably be typed
   */
  graph: any;

  /**
   * node that is hovered on, set on smrtgraph hovered object emitter
   * todo: should probably be typed
   */
  hoveredNode: any;
  /**
   * link that is hovered on, set on smrtgraph hovered object emitter
   * todo: should probably be typed
   */
  hoveredLink: any;

  /**
   * get graph data and graph parsing services to interact with the graph
   * @param graphDataService
   * @param graphParserService
   */
  constructor(
    private graphDataService: GraphDataService,
    private graphParserService: GraphParserService
  ) {}

  /**
   * set serializers to parse the data passed into the component
   * maps nodes as different objects
   * builds graph
   */
  ngOnInit() {
    console.log(this);
    this.graphParserService.setSerializers({node: new PharosNodeSerializer()});

    this.graphParserService.setId(this.topic.id).subscribe(res => {
    });
    this.graphParserService.data$.subscribe(res => {
      this.graph = res;
      this.graph.nodes.forEach(node => {
        switch (node.kind) {
          case 'ix.idg.models.Target': {
            switch (node.idgTDL) {
              case 'Tchem' : {
                const nodes = this.nodesMap.get('Tchem');
                nodes.push(node);
                this.nodesMap.set('Tchem', nodes);
                break;
              }
              case 'Tclin' : {
                const nodes = this.nodesMap.get('Tclin');
                nodes.push(node);
                this.nodesMap.set('Tclin', nodes);
                break;
              }
              case 'Tbio' : {
                const nodes = this.nodesMap.get('Tbio');
                nodes.push(node);
                this.nodesMap.set('Tbio', nodes);
                break;
              }
              case 'Tdark' : {
                const nodes = this.nodesMap.get('Tdark');
                nodes.push(node);
                this.nodesMap.set('Tdark', nodes);
                break;
              }
            }
            break;
          }
          case 'ix.idg.models.Disease': {
            const nodes = this.nodesMap.get('disease');
            nodes.push(node);
            this.nodesMap.set('disease', nodes);
            break;
          }
          case 'ix.idg.models.Ligand': {
            const nodes = this.nodesMap.get('ligand');
            nodes.push(node);
            this.nodesMap.set('ligand', nodes);
            break;
          }
        }
      })
      this.loading = false;
    });
  }

  /**
   * filter graph based on parameter
   * todo: this currently hides/decolors the nodes, but they should really be removed
   * @param event
   */
  filterGraph(event: SelectionChange<string>) {
    this.loading = true;
        event.removed.forEach(filter => {
          const nodesArr = this.nodesMap.get(filter);
          nodesArr.map(node => node['tempcolor'] = 'transparent');
          this.nodesMap.set(filter, nodesArr);
        });

    event.added.forEach(filter => {
      const nodesArr = this.nodesMap.get(filter);
      nodesArr.map(node => node['tempcolor'] = null);
      this.nodesMap.set(filter, nodesArr);
    });

    this.graphDataService.setGraph({
      nodes: [].concat(...Array.from(this.nodesMap.values())),
      links: this.graph.links
    });
    this.smrtGraph.graphObject.simulation.tick();
    this.loading = false;
  }

  /**
   * filter nodes by link confidence values
   * todo: this currently hides/decolors the nodes, but they should really be removed
   * @param event
   */
  filterConfidence(event: {value: number, confidence: boolean}) {
    this.loading = true;
    console.log(event);
    const diseases = this.nodesMap.get('disease');
    diseases.forEach(disease => {
       if ((!disease['IDG_Confidence'] && event.confidence === false) || disease['IDG_Confidence']
         && disease['IDG_Confidence'] <= event.value ) {
         disease['tempcolor'] = 'transparent';
       } else {
         disease['tempcolor'] = null;
       }
    });
      this.nodesMap.set('disease', diseases);
      this.graphDataService.setGraph({
        nodes: [].concat(...Array.from(this.nodesMap.values())),
        links: this.graph.links
      });
      this.smrtGraph.graphObject.simulation.tick();
      this.loading = false;
    // });

  }

  /**
   * reads node event emitter from smrtgraph and sets hovered node, this gets passed to the display component
   * @param event
   */
  nodeEvents(event) {
    if (event.nodeHover) {
      this.hoveredNode = event.nodeHover;
    }
  }

  /**
   * reads link event emitter from smrtgraph, and sets hovered link, this gets passed to the display component
   * @param event
   */
  linkEvents(event) {
    if (event.linkHover) {
      this.hoveredLink = event.linkHover;
    }
  }
}
