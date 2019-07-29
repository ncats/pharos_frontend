import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GraphDataService, LinkService, NodeService, SGLink, SGNode, SmrtgraphCoreComponent} from 'smrtgraph-core';
import {GraphParserService} from './services/graph-parser.service';
import {PharosNodeSerializer} from './models/topic-graph/pharos-node-serializer';
import {RadarChartComponent} from '../../../../../tools/visualizations/radar-chart/radar-chart.component';
import {MatSelectionListChange} from '@angular/material';
import {SelectionChange} from '@angular/cdk/collections';



@Component({
  selector: 'pharos-topic-graph-panel',
  templateUrl: './topic-graph-panel.component.html',
  styleUrls: ['./topic-graph-panel.component.scss'],
  providers: [NodeService, LinkService, GraphParserService],
  encapsulation: ViewEncapsulation.None
})
export class TopicGraphPanelComponent<T extends SGNode> implements OnInit, AfterViewInit {

  @ViewChild('smrtgraph', {read: SmrtgraphCoreComponent, static: false}) smrtGraph: SmrtgraphCoreComponent;

  @Input() topic = {id: 1};

  options = ['Tclin', 'Tchem', 'Tbio', 'Tdark', 'disease', 'ligand'];

  dataMap: Map<string, any> = new Map<string, any>();

  nodesMap: Map<string, any[]> = new Map<string, any[]>([
    ['Tclin', []],
    ['Tchem', []],
    ['Tbio', []],
    ['Tdark', []],
    ['disease', []],
    ['ligand', []],
  ]);
  public loading = true;

  graph: any;

  hoveredNode: any;
  hoveredLink: any;


  constructor(
    private _http: HttpClient,
    private graphDataService: GraphDataService,
    private graphParserService: GraphParserService
  ) {}

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

  ngAfterViewInit() {
    // this.smrtGraph.graphObject.simulation.stop();

  }

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


  nodeEvents(event) {
    if (event.nodeHover) {
      this.hoveredNode = event.nodeHover;
    }
  }

  linkEvents(event) {
    if (event.linkHover) {
      this.hoveredLink = event.linkHover;
    }
  }
}
