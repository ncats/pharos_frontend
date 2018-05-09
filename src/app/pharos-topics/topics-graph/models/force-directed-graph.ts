import {EventEmitter} from '@angular/core';
import {Link} from './link';
import {Node} from './node';

import * as d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  //  gets rid of overlap [0,1]
  COLLISION: 1,
  //  A positive value causes nodes to attract each other, similar to gravity, while a negative
  //  value causes nodes to repel each other, similar to electrostatic charge.
  CHARGE: -80
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(
    nodes, links, options: {width, height}) {
    this.nodes = nodes;
    this.links = links;
    this.initSimulation(options);
  }

  update(graph, options) {
    //  frequently the data is separate from the graph image, so these need to be set for downstream filtering
    this.nodes = graph.nodes;
    this.links = graph.links;

    this.simulation.nodes(this.nodes);
    this.simulation.force('link', d3.forceLink(this.links));
    //    .strength(FORCES.LINKS));
    this.initSimulation(options);
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
      //  this.simulation.restart();
    this.simulation.alpha(1).restart();
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      this.simulation = d3.forceSimulation()
        .force('link', d3.forceLink(this.links).id(d => d['id']))
        //  .distance(this.links.length*100))
        /* repels the nodes away from each other*/
        .force('charge', d3.forceManyBody()
         .strength(d => FORCES.CHARGE * d['r']))
        /** Updating the central force of the simulation */
        .force('center', d3.forceCenter(options.width / 2, options.height / 2))
        /* prevents node overlap*/
        .force('collide', d3.forceCollide()
          .radius(d => d['r'] + 5).iterations(1)
          .strength(FORCES.COLLISION))
        .force('y', d3.forceY().y(function() {return Math.random() * ((3 * options.height / 4) -
          (options.height / 4) + 1) + (options.height / 4);
        }))
        /* manually sets the x position of nodes based on if they are start or end nodes*/
        .force('x', d3.forceX().x(function (d: Node) {
          if (d.params.startNode === true) {
            return options.width / 10;
          } else if (d.params.endNode === true) {
            return 19 * options.width / 20;
          } else {

            // todo: this has a tendency to cluster things more vertically does this need to be adjusted?
            return Math.random() * ((2 * options.width / 3) - (options.width / 3) + 1) + (options.width / 3);
          }
        }));


      const ticker = this.ticker;

      //  Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function () {
        ticker.emit(this);
      });
    }
    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
