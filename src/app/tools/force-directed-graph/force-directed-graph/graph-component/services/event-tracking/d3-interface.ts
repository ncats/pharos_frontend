import {ForceDirectedGraph} from "../../models/force-directed-graph";
import {Link} from "../../models/link";

export interface D3Interface {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement): void;

  /** A method to register clicks on the graph that aren't node or link clicks (resets those behaviors) */
  applyClickOffBehaviour(svgElement): void;

  /** A method to bind a draggable behaviour to an svg element */
  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph): void;

  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableNodeBehaviour(element, node: Node, graph: ForceDirectedGraph): void;

  /** A method to bind hoverable behaviour to an svg element */
  applyHoverableLinkBehaviour(element, link: Link): void;


  /** A method to bind click events to an svg element */
    // emits the node for other components to listen for
  applyClickableNodeBehaviour(element, node: Node, graph: ForceDirectedGraph): void;

  /** A method to bind click events to an svg element */
    // emits the link for other components to listen for
  applyClickableLinkBehaviour(element, link: Link, graph: ForceDirectedGraph): void;

  /** The interactable graph we will return
   * This method does not interact with the document, purely physical calculations with d3
   */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: any): ForceDirectedGraph;

  _clearNodes(): void;

  _manualClick(node: Node, graph: ForceDirectedGraph): void;

  resetZoom(): void;
}
