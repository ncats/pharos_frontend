import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input,
  OnInit
} from '@angular/core';
import {Link} from './graph-component/models/link';
import {Node} from './graph-component/models/node';
import {ForceDirectedGraph} from './graph-component/models/force-directed-graph';
import {PharosD3Service} from '../../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-d3.service';
import {GraphDataService} from './graph-component/services/graph-data.service';
import * as d3 from 'd3';

/**
 * graph visual component creates svg skeleton by using angular to iterate over node and link lists
 */
@Component({
  selector: 'app-force-directed-graph',
  templateUrl: './force-directed-graph.component.html',
  styleUrls: ['./force-directed-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForceDirectedGraphComponent implements OnInit, AfterViewInit {
  /**
   * list of nodes
   * @type {Node[]}
   */
  @Input()
  public nodes: Node[] = [];

  /**
   * list of links
   * @type {Link[]}
   */
  @Input()
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
  _options: {width, height} = {width: 1200, height: 1000};

  /**
   * rescales the graph on window resize
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
    this.d3Service.resetZoom();
  }

  /**
   * create services
   * @param d3Service
   * @param ref
   * @param el
   * @param graphDataService
   */
  constructor(private d3Service: PharosD3Service,
              private ref: ChangeDetectorRef,
              private el: ElementRef,
              private graphDataService: GraphDataService) {
  }

  /**
   * set up loading modal subscription
   * set up graph data subscription
   */
  ngOnInit() {
    this.graphDataService.graphhistory$.subscribe(res => {
      this.nodes = res.nodes;
      this.links = res.links;
      this.graphDataService.countLinks();
      this.graph.update(res, this.options);
    });

    /**
     * Receiving an initialized simulated graph from our custom d3 service
     * @type {ForceDirectedGraph}
     */
    this.graph = new ForceDirectedGraph(this.nodes, this.links, this._options);

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
    this.d3Service.resetZoom();
  }

  /*  downloadGraph(): void {
      this.downloader.downloadFile(d3.select('svg'), this.options);
    }*/


  /**
   * dynamically sets the size of the graph
   * @returns {{width: number; height: number}}
   */
  get options() {
    if (this.el.nativeElement.parentElement) {
      return this._options = {
        width: this.el.nativeElement.parentElement.offsetWidth,
        height: this.el.nativeElement.parentElement.offsetHeight
      };
    } else {
      return this._options = {width: 1200, height: 1000};
    }
  }
}
