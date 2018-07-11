import {Injectable} from '@angular/core';
import {Node} from '../../models/node';
import {Link} from '../../models/link';
import {ForceDirectedGraph} from '../../models/force-directed-graph';
import * as d3 from 'd3';
import {NodeService} from './node.service';
import {LinkService} from './link.service';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */

  constructor(
    private nodeService: NodeService,
    private linkService: LinkService,
  ) {  }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      container.attr('transform', d3.event.transform);
    };

    zoom = d3.zoom()
      .on('zoom', zoomed);
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    const started = (): void => {
      d3.event.sourceEvent.stopPropagation();
      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }
    };

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      const ended = (): void => {
        d3.event.sourceEvent.stopPropagation();
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        // by not resetting these, the node stays where it is dragged
        /*  node.fx = null;
         node.fy = null;*/
      };

    d3element.call(d3.drag()
      .on('start', started)
      .on('drag', dragged)
      .on('end', ended)
    );
  }

  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableNodeBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);
    let connectedLinks;
    let connectedNodes;
    let maximalLinks: any[] = [];
    let neighbors: Link[] = [];
  //  let downstreamNeighbors: Link[] = [];

    // todo: this is kind of piggybacking on the filter function
    const getNeighborLinks = (e: Link): boolean => {
      const neighbor = (node.uuid === (typeof (e.source) === 'object' ? e.source.uuid : e.source)
        || node.uuid === (typeof (e.target) === 'object' ? e.target.uuid : e.target));
      if (neighbor === true) {
        neighbors.push(e);
      }
      return node.uuid === (typeof (e.source) === 'object' ? e.source.uuid : e.source);
    };

    const getNeighborNodes = (e: any): boolean => {
      return connectedLinks.data().map(link => link.target.uuid).indexOf(e.uuid) > -1;
    };

    const findMaximalLinks = (e: any): boolean => {
      if (e.properties && e.properties.islargest) {
        maximalLinks = maximalLinks.concat([e.source.uuid, e.target.uuid]).reduce((x, y) => x.includes(y) ? x : [...x, y], []);
        return true;
      } else {
        return false;
      }
    };

    const findMaximalNodes = (e: any): boolean => {
      return maximalLinks.indexOf(e.uuid) > -1;
    };

    const decorateNodes = (): void => {
      d3element.select('circle').classed('hovering', true);
      connectedLinks = d3.selectAll('.link')
        .data(graph.links)
        .filter(getNeighborLinks)
        .classed('hovering', true)
/*        .classed('connected', function(link) {return link.edgeType !== 'down'; })
        .classed('connectedflat', function(link) {return link.edgeType === 'down'; })*/;

      connectedNodes = d3.selectAll('circle')
        .data(graph.nodes)
        .filter(getNeighborNodes)
        .classed('connected', true);

      connectedLinks.filter(findMaximalLinks)
        .classed('maximal', true);

      connectedNodes.filter(findMaximalNodes)
        .classed('maximal', true);
    };

    const clearNodes = (): void => {
      d3.selectAll('.link')
        .classed('connected', false)
        .classed('connectedflat', false)
        .classed('hovering', false)
        .classed('maximal', false);
      d3.selectAll('circle')
        .classed('connected', false)
        .classed('hovering', false)
        .classed('maximal', false);
    };

    // todo: this is called on drag and iterates over the entire graph
    const mouseOverFunction = (): void => {
      if (d3.event.defaultPrevented) { return; }
      decorateNodes();
      this.nodeService.hoveredNode([node]);
      if (neighbors.length > 0) {
        this.linkService.hoveredLink(neighbors);
      }
    };

    const mouseOutFunction = (): void => {
      clearNodes();
      neighbors = [];
    };

// todo: this fires constantly as the node is dragged
    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);

  }

  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableLinkBehaviour(element, link: Link) {
    const d3element = d3.select(element);
    const arrowType = 'connected';

    const mouseOverFunction = (): void => {
      d3element.select('.link').classed('hovering', true).classed(arrowType, true);
      this.linkService.hoveredLink([link]);
    };

    const mouseOutFunction = (): void => {
      d3element.select('.link').classed('hovering', false).classed(arrowType, false);
    };

    d3element.on('mouseover', mouseOverFunction).on('mouseout', mouseOutFunction);

  }


  /** A method to bind click events to an svg element */
  // emits the node for other components to listen for
  applyClickableNodeBehaviour = (element, node: Node, graph: ForceDirectedGraph) =>  {
  }

  /** A method to bind click events to an svg element */
    // emits the link for other components to listen for
  applyClickableLinkBehaviour = (element, link: Link, graph: ForceDirectedGraph) =>  {
    const d3element = d3.select(element);
    const svg = d3.select('svg');
    const arrowType = 'connected';

    const clickFunction = (): void => {
      const d3link = d3element.select('.link');
      d3link.classed('clicked', !d3link.classed('clicked')).classed(arrowType, !d3link.classed(arrowType));
      if (d3link.classed('clicked')) {
        this.linkService.clickedLinks(link);
      } else {
        this.linkService.removeClickedLink(link);
      }
    };

    d3element.on('click', clickFunction);
  }

  /** The interactable graph we will return
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: {width, height}) {
    return new ForceDirectedGraph(nodes, links, options);
  }
}
