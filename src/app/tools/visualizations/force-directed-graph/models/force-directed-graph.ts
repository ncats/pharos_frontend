import {EventEmitter} from '@angular/core';
import {Link} from './link';
import {Node} from './node';

import * as d3 from 'd3';

/**
 * confugurable animation'physics forces
 * @type {{LINKS: number; COLLISION: number; CHARGE: number}}
 */
const FORCES = {
  /**
   * links force
   */
  LINKS: 1 / 50,
  /**
   * gets rid of overlap [0,1]
   */
  COLLISION: 1,
  /**
   *  A positive value causes nodes to attract each other, similar to gravity, while a negative
   *  value causes nodes to repel each other, similar to electrostatic charge.
   */
  CHARGE: -80
};

/**
 * d3 graph class ,contains nodes and links
 */
export class ForceDirectedGraph {
  /**
   * event emitter for graph changes
   * keeps angular from constantly updating it
   * @type {EventEmitter<any>}
   */
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  /**
   * d3 simulation object
   */
  public simulation: d3.Simulation<any, any>;

  /**
   * list of graph nodes
   * @type {Node[]}
   */
  public nodes: Node[] = [];
  /**
   * list of graph links
   * @type {Link[]}
   */
  public links: Link[] = [];

  /**
   * build new graph
   * @param nodes
   * @param links
   * @param {any} options
   */
  constructor(
    nodes, links, options: any) {
    this.nodes = nodes;
    this.links = links;
    this.initSimulation(options);
  }

  /**
   * update graph by pushing new nodes/links list or options
   * @param graph
   * @param options
   */
  update(graph, options): void {
    //  frequently the data is separate from the graph image, so these need to be set for downstream filtering
    this.nodes = graph.nodes;
    this.links = graph.links;
    this.simulation.nodes(this.nodes);
    this.initSimulation(options);
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }
      //  this.simulation.restart();
    this.simulation.alpha(1).restart();
  }

  /**
   * start new d3 simulation
   * sets all of the physics properties
   * sets ticket event emitter
   * @param options
   */
  initSimulation(options): void {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;
      this.simulation = d3.forceSimulation()
        .force('link', d3.forceLink(this.links).id(d => d['uuid']))
        /* repels the nodes away from each other*/
        .force('charge', d3.forceManyBody()
        .strength(d => (FORCES.CHARGE * d['r'])/1500))
        /** Updating the central force of the simulation */
        .force('center', d3.forceCenter(options.width / 2, options.height / 2))
        /* prevents node overlap*/
        .force('collide', d3.forceCollide()
          .radius(d => d['r'] + 5).iterations(1)
          .strength(FORCES.COLLISION));



      //  Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', () => ticker.emit(this.simulation));

    }

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
