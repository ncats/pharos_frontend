import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener,
  OnInit
} from '@angular/core';
import {LoadingService} from '../../../../pharos-services/loading.service';
import {D3Service} from '../../services/event-tracking/d3.service';
import {Link} from '../../models/link';
import {Node} from '../../models/node';
import {Subscription} from 'rxjs/Subscription';
import {ForceDirectedGraph} from '../../models/force-directed-graph';
import {GraphDataService} from '../../services/graph-data.service';

@Component({
  selector: 'pharos-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, AfterViewInit {

  public nodes: Node[] = [];
  public links: Link[] = [];
  subscription: Subscription;
   loading = false;

  graph: ForceDirectedGraph;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private d3Service: D3Service,
              private ref: ChangeDetectorRef,
              private el: ElementRef,
              private graphDataService: GraphDataService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
   // this.loadingService.loading$.subscribe(res => this.loading = res);
    this.graphDataService.graphhistory$.subscribe(res => {
      this.nodes = res.nodes;
      this.links = res.links;
      if (this.graph) {
        this.graph.update(res, this.options);
      }
    });

    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this._options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);

  }



  /*  downloadGraph(): void {
      this.downloader.downloadFile(d3.select('svg'), this.options);
    }*/


  get options() {
    return this._options = {
      width: this.el.nativeElement.parentElement.offsetWidth,
      height: this.el.nativeElement.parentElement.offsetHeight
    };
  }

  _options: {width, height} = {width: 600, height: 600};

}
