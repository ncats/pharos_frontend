import {ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {GraphDataService, LinkService, NodeService, SGLink, SGNode, SmrtGraph, SmrtgraphCoreComponent} from 'smrtgraph-core';
import {GraphParserService} from './services/graph-parser.service';
import {PharosNodeSerializer} from './models/topic-graph/pharos-node-serializer';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {MatSelectionListChange} from '@angular/material';
import {SelectionChange} from '@angular/cdk/collections';
import {NodeMenuPopupComponent} from './node-menu-popup/node-menu-popup.component';

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

  @ViewChild(NodeMenuPopupComponent, {static: false}) menu: NodeMenuPopupComponent;

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
    ['links', []]
  ]);

  linksMap: Map<string, any[]> = new Map<string, any[]>([
    ['links', []]
  ])


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

  selectedNode: any;
  /**
   * link that is hovered on, set on smrtgraph hovered object emitter
   * todo: should probably be typed
   */
  hoveredLink: any;

  graphBuild = false;

  /**
   * get graph data and graph parsing services to interact with the graph
   * @param ref
   * @param graphDataService
   * @param graphParserService
   */
  constructor(
    private ref: ChangeDetectorRef,
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
      console.log(res);
      this.graph = res;
      const masterLinks = [];
      this.graph.links.forEach(link => masterLinks.push(link));
      this.linksMap.set('links', masterLinks);
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
      });
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
    let removedNodes = [];
    let addedNodes = [];
    const deletedLinksArr = [];
    const addedLinksArr = [];
    event.removed.forEach(filter => {
      const links = this.linksMap.get('links');
      const nodes = this.nodesMap.get(filter);
      removedNodes = removedNodes.concat(nodes);
      nodes.forEach(node => {
        links.forEach(link => {
          if (link.source.id === node.id || link.target.id === node.id) {
            deletedLinksArr.push(link);
          }
        });
      });
      /* nodesArr.map(node => node['tempcolor'] = 'transparent');
       this.nodesMap.set(filter, nodesArr);*/
      console.log(deletedLinksArr);
    });

    event.added.forEach(filter => {
      //  const nodesArr = this.nodesMap.get(filter);
      const nodes = this.nodesMap.get(filter);
      addedNodes =  addedNodes.concat(nodes);
      // this.graph.links.filter(link => removedNodes);
     // console.log(this.linksMap.get('links'));
      nodes.forEach(node => {
        this.linksMap.get('links').forEach(link => {
          if (link.source.id === node.id || link.target.id === node.id) {
            addedLinksArr.push(link);
          }
        });
      });
      //   nodesArr.map(node => node['tempcolor'] = null);
      //  this.nodesMap.set(filter, nodesArr);
    });
    console.log(addedLinksArr);

    const diff = {
      addedNodes: addedNodes,
      removedNodes: removedNodes,
      addedLinks: addedLinksArr,
      removedLinks: deletedLinksArr
    };

    console.log(diff);
    this.applyDiff(diff);
    this.countLinks();
    console.log(this);
    this.graphDataService.setGraph(this.graph);
    this.ref.markForCheck();

    /* this.graphDataService.setGraph({
       nodes: [].concat(...Array.from(this.nodesMap.values())),
       links: this.graph.links
     });*/
    this.loading = false;
  }

  /**
   * filter nodes by link confidence values
   * todo: this currently hides/decolors the nodes, but they should really be removed
   * @param event
   */
  /*filterConfidence(event: {value: number, confidence: boolean}) {
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

  }*/

  /**
   * reads node event emitter from smrtgraph and sets hovered node, this gets passed to the display component
   * @param event
   */
  nodeEvents(event) {
    if (event.nodeHover) {
      this.hoveredNode = event.nodeHover;
    }
    if (event.event && !event.nodeHover) {
      console.log("open in topic graph panel");
      console.log(event.event);
      this.selectedNode = event.event.node;
      this.menu.open(event.event);
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

 /* makeGraph(graph: SmrtGraph): void {
    const newNodes = this.graph.nodes.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
    const newLinks = this.graph.links.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });

    console.log(newNodes);
    console.log(newLinks);

    const diff = {
      removedNodes: this.graph.nodes.filter(node => newNodes.indexOf(node) === -1),
      addedNodes: newNodes.filter(node => this.graph.nodes.indexOf(node) === -1),
      removedLinks: this.graph.links.filter(link => newLinks.indexOf(link) === -1),
      addedLinks: newLinks.filter(link => this.graph.links.indexOf(link) === -1)
    };

    console.log(diff);
    // apply diff to current graph
    this.applyDiff(diff);
    this.countLinks();
    this.graphDataService.setGraph(this.graph);
    // update graph
    /!*this._graphHistorySource.next(this.graph);
    this.nodeList = [];
    this.linkList = [];
    this.filter = false;*!/
  }
*/
  applyDiff(diff: any): void {
    // todo: need to iterate over remaining nodes and links and remove them
    diff.removedNodes.forEach(node => {
      this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
    });
    diff.removedLinks.forEach(link => {
      this.graph.links.splice(this.graph.links.indexOf(link), 1);
    });
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
    });
  }

  countLinks(): void {
    this.graph.nodes.forEach(node => node.linkCount = 1);
    for (const l of this.graph.links) {
      l.source.linkCount ++;
      l.target.linkCount ++;
    }
  }

  getRelatedNodes(nodeType: string) {
   // let removedNodes = [];
    const addedNodes = [this.selectedNode];
    const deletedLinksArr = [];
    const addedLinksArr = [];
    console.log(this.nodesMap);
      const links = this.linksMap.get('links');
      // removedNodes = removedNodes.concat(nodes);
        links.forEach(link => {
        //  if (link.source.id === this.selectedNode.id || link.target.id === this.selectedNode.id) {
          //  addedLinksArr.push(link);
            if (nodeType === 'disease') {
              if (link.source.id === this.selectedNode.id && link.target.kind === 'ix.idg.models.Disease') {
                addedNodes.push(link.target);
                addedLinksArr.push(link);
              } else if (link.target.id === this.selectedNode.id && link.source.kind === 'ix.idg.models.Disease') {
                addedNodes.push(link.source);
                addedLinksArr.push(link);
              }
            } else if (nodeType === 'ligand') {
              if (link.source.id === this.selectedNode.id && link.target.kind === 'ix.idg.models.Ligand') {
                addedNodes.push(link.target);
                addedLinksArr.push(link);
              } else if (link.target.id === this.selectedNode.id && link.source.kind === 'ix.idg.models.Ligand') {
                addedNodes.push(link.source);
                addedLinksArr.push(link);
              }
            } else {
            if (link.source.id === this.selectedNode.id && link.target.idgTDL === nodeType) {
              addedNodes.push(link.target);
              addedLinksArr.push(link);
            } else if (link.target.id === this.selectedNode.id && link.source.idgTDL === nodeType) {
              addedNodes.push(link.source);
              addedLinksArr.push(link);
            }
          }
        });

        let newGraph: SmrtGraph = {nodes: [], links: []};
        if (addedNodes.length > 1) {
           newGraph = {
            links: this.graph.links.concat(addedLinksArr),
            nodes: this.graph.nodes.concat(addedNodes)
          };
        } else {
          alert('No nodes available');
        }

        this.graphDataService.setGraph(newGraph);
      /* nodesArr.map(node => node['tempcolor'] = 'transparent');
       this.nodesMap.set(filter, nodesArr);*/
      this.ref.markForCheck();
}


  openMenu(e) {
    console.log("open in topic graph panel");
    this.menu.open(e);
  }

  itemSelected(item: string) {
    console.log('Item', item);
    this.getRelatedNodes(item);
    this.menu.close();
  }

  reset() {
    console.log("resetting");
    console.log(this);
    this.graphDataService.setGraph({
      nodes: [].concat(...Array.from(this.nodesMap.values())),
      links: this.linksMap.get('links')
    });
    this.ref.markForCheck();
  }

  svgClicked(event) {
    console.log(event);
    this.menu.close();
  }
}
