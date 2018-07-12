import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Message, MessageService} from './message.service';
import {DataConnectionService} from './connection/data-connection.service';
import {NodeService} from './event-tracking/node.service';
import {LinkService} from './event-tracking/link.service';
import {Link} from '../models/link';
import {Node} from '../models/node';


@Injectable()
export class GraphDataService {
  graph = {
    nodes: [],
    links: []
  };

  eventData: any;

  history = [];
  //  Observable navItem source
  private _graphHistorySource = new Subject<any>();
  historyMap: Map<string, any> = new Map();
  graphhistory$ = this._graphHistorySource.asObservable();
  originalEvent: string;
  noResults = false;
  filter = false;
  nodeList: any = [];
  linkList: any = [];
  nodes: any  = [];

  constructor(
    private dataConnectionService: DataConnectionService,
    private messageService: MessageService,
    private nodeService: NodeService,
    private linkService: LinkService
  ) {

    // todo: with the added search variables, it is extremely likely no results will come back. this needs to be shown

    /**
     * sets up subscription to watch for new messages from the websocket. Parses the message based on type and updates
     * the graph
     */
    this.dataConnectionService.messages.subscribe(response => {
        if (response.data) {
          if (response.type) {
            this.originalEvent = response.type.toString();
          }
          const records = response.data._fields;
          if (records.length === 0) {
            console.error(response);
          } else {
            switch (response.type) {
              case 'expand': {
                this.filter = false;
                this.noResults = false;
                this.parseRecords(records);
                break;
              }
              default: {
                this.parseRecords(records);
              }
            }
          }
        } else {
          // no new results added
          // todo: still want an alert if no predictions are found.
          if (this.noResults && (this.nodeList.length === 0 && this.linkList.length === 0)) {
            this.clearGraph();
            this._graphHistorySource.next(this.graph);
            alert('no path found');
          } else {
            this.makeGraph();
          }
        }
    });
  }

  /**
   * reads objects from websocket and creates nodes and links
   * @param path
   * @returns void
   */
  parseRecords(path: any): void {
    // neo4j websocket returns one record at a time, so looping isn't necessary, but still probably a good idea
    for (const r of path) {
      if (r.segments) {
        for (const l of r.segments) {
          // this ignores the initial start and end nodes, but they are added in the segments of the path
          const start = this.nodeService.makeNode(l.start.identity.low, l.start);
          const end = this.nodeService.makeNode(l.end.identity.low, l.end);
          this.nodeList.push(...[start, end]);
          const link: Link = this.linkService.makeLink(l.relationship.identity.low, start, end, l.relationship);
          this.linkList.push(link);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink( link);
        }
      } else {
        if (!r.start && !r.end) {
          // this is for node groups that aren't a path
          const n = this.nodeService.makeNode(r.properties.uuid, r);
          this.nodeList.push(n);
          this.nodeService.setNode(n);
        } else {
          // this is the separate path for expanding nodes -- t
          // his does not have a uuid associated with the start or end nodes, so neo4j's id needs to be used to create the nodes
          const start = this.nodeService.makeNode(r.properties.uuid, {});
          const end = this.nodeService.makeNode(r.properties.uuid, {});
          const nodes = [start, end];
          this.nodeList.push(...nodes);
          const link = this.linkService.makeLink(r.properties.uuid, start, end, r);
          this.nodeService.setNode(start);
          this.nodeService.setNode(end);
          this.linkService.setLink( link);
        }
      }

    }
  }

  /**
   * updates graph with new nodes and links. filters out existing ones so as to not constantly create the same node
   * @returns void
   */
  makeGraph(): void {
    const newNodes = this.nodeList.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
    const newLinks = this.linkList.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });

    const diff = {
      removedNodes: this.graph.nodes.filter(node => newNodes.indexOf(node) === -1),
      addedNodes: newNodes.filter(node => this.graph.nodes.indexOf(node) === -1),
      removedLinks: this.graph.links.filter(link => newLinks.indexOf(link) === -1),
      addedLinks: newLinks.filter(link => this.graph.links.indexOf(link) === -1)
    };

    if (this.eventData) {
        this.historyMap.set(this.eventData.id, diff);
    }
    // apply diff to current graph
    this.applyDiff(diff);
    this.countLinks();
    // update graph
    this._graphHistorySource.next(this.graph);
    this.nodeList = [];
    this.linkList = [];
    this.filter = false;
  }

  /**
   * applies the updates to the graph, adds new nodes/links and removes dead ones
   * @param diff
   * @returns void
   */
  applyDiff(diff: any): void {
    // todo: it is possible to expand a node connected to an expanded node.
    // todo If the original node is closed, the second expanded nodes are still visible
    // todo: need to iterate over remaining nodes and links and remove them
    if (this.filter === true) {
      diff.removedNodes.forEach(node => {
        this.graph.nodes.splice(this.graph.nodes.indexOf(node), 1);
      });
      diff.removedLinks.forEach(link => {
        this.graph.links.splice(this.graph.links.indexOf(link), 1);
      });
    }
    diff.addedNodes.forEach(node => this.graph.nodes.push(node));
    diff.addedLinks.forEach(link => {
      this.graph.links.push(link);
    });
  }

  /**
   * returns a count of links for each node. Used to track node diameter size
   * @returns void
   */
  countLinks(): void {
    this.graph.nodes.forEach(node => node.linkCount = 1);
    for (const l of this.graph.links) {
      l.source.linkCount ++;
      l.target.linkCount ++;
    }
  }

  /**
   * empties nodes and links from graph, broadcasts empty object to all subscribers
   * @returns void
   */
  clearGraph(): void {
    this.graph.links = [];
    this.graph.nodes = [];
    this._graphHistorySource.next(this.graph);
  }

  /**
   * Expands a node based on a selected property. fetches new data by creating a message with node parameters
   * @param {string} id
   * @param {string} type
   * @param properties
   * @returns void
   */
  nodeExpand(id: string, type: string, properties: any): void {
    const message: Message = this.messageService.getMessage(id, type, properties);
    // right now this is only creating a skeleton map object without the diff
    // this happens here because node id and label is needed for tracking.
    this.eventData = {id: id, diff: {}};
    this.dataConnectionService.messages.next(message);
  }

  /**
   * removes sub graph added to a node, uses a history map that tracks changes
   * @param {Node} node
   * @returns void
   */
  nodeCollapse(node: Node): void {
    this.filter = true;
// get the expand object to delete the nodes added
    const diff = this.historyMap.get(node.uuid);

    const undoDiff = {
      addedNodes: [],
      removedNodes: diff.addedNodes,
      addedLinks: [],
      removedLinks: diff.addedLinks
    };

    this.applyDiff(undoDiff);

    this.countLinks();
    this._graphHistorySource.next(this.graph);
    this.filter = false;

  }

  /**
   * returns an object containing a node array and a link array
   * download button uses this
   * @return {any}
   */
  returnGraph(): any {
    return this.graph;
  }
}
