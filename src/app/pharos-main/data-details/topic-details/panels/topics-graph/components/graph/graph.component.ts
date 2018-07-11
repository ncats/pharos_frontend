import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener,
  OnInit
} from '@angular/core';
import {D3Service} from '../../services/event-tracking/d3.service';
import {Link} from '../../models/link';
import {Node} from '../../models/node';
import {ForceDirectedGraph} from '../../models/force-directed-graph';
import {GraphDataService} from '../../services/graph-data.service';
import {LoadingService} from "../../../../../../../pharos-services/loading.service";
import {DataConnectionService} from "../../services/connection/data-connection.service";

/**
 * graph visual component creates svg skeleton by using angular to iterate over node and link lists
 */
@Component({
  selector: 'pharos-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, AfterViewInit {

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

  /**
   * show or hide loading modal
   * @type {boolean}
   */
   loading = false;

  /**
   * d3 configured graph object
   */
  graph: ForceDirectedGraph;
  /**
   * d3 graph options
   * updated dynamically
   * @type {{width: number; height: number}}
   * @private
   */
  _options: {width, height} = {width: 600, height: 600};

  /**
   * rescales the graph on window resize
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  /**
   * create services
   * @param {D3Service} d3Service
   * @param {ChangeDetectorRef} ref
   * @param {ElementRef} el
   * @param {DataConnectionService} dataConnectionService
   * @param {GraphDataService} graphDataService
   * @param {LoadingService} loadingService
   */
  constructor(private d3Service: D3Service,
              private ref: ChangeDetectorRef,
              private el: ElementRef,
              private dataConnectionService: DataConnectionService,
              private graphDataService: GraphDataService,
              private loadingService: LoadingService) {
  }

  /**
   * set up loading modal subscription
   * set up graph data subscription
   */
  ngOnInit() {
    console.log(this);
    this.loadingService.loading$.subscribe(res => this.loading = res);
    this.graphDataService.graphhistory$.subscribe(res => {
      this.nodes = res.nodes;
      this.links = res.links;
      if (this.graph) {
        this.graph.update(res, this.options);
      }
    });

    /**
     * Receiving an initialized simulated graph from our custom d3 service
     * @type {ForceDirectedGraph}
     */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this._options);

    /**
     * Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  /**
   * resize graph with updated container size
   */
  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
    console.log("graph component")
      this.dataConnectionService.messages.next({
        message: 'MATCH (n:`KG:1`)-[r]-(b) with {segments:[{start: startNode(r), relationship:r,' +
        ' end: endNode(r)}]} AS ret RETURN ret LIMIT 25', params: {}});
    /*  const graph = this.graphDataService.returnGraph();
      console.log(graph);
      this.nodes = graph.nodes;*/

  }



  /*  downloadGraph(): void {
      this.downloader.downloadFile(d3.select('svg'), this.options);
    }*/


  /**
   * dynamically sets the size of the graph
   * @returns {{width: number; height: number}}
   */
  get options() {
    return this._options = {
      width: this.el.nativeElement.parentElement.offsetWidth,
      height: this.el.nativeElement.parentElement.offsetHeight
    };
  }


}
