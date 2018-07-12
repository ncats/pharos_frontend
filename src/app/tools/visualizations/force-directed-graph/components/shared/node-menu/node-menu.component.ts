import {Component, OnInit} from '@angular/core';
import {NodeService} from '../../../services/event-tracking/node.service';
import {Expand, NodeExpandService} from '../../../services/event-tracking/node-expand.service';
import {DataConnectionService} from '../../../services/connection/data-connection.service';
import {Message, MessageService} from '../../../services/message.service';
import {NodeMenuControllerService} from '../../../services/event-tracking/node-menu-controller.service';
import {GraphDataService} from '../../../services/graph-data.service';
import {Node} from '../../../models/node';

/**
 * single menu object that is opened and closed by the node
 */
@Component({
  selector: 'pharos-menu-list',
  templateUrl: './node-menu.component.html',
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent implements OnInit {
  /**
   * node that the menu is attached to
   */
  clickedNode: Node;
  /**
   * object of counts for subgraphs
   * @type {{total: number}}
   */
  counts: any = {total: 0};
  /**
   * label for menu
   * todo: not working
   */
  label: string;
  /**
   * boolean if menu is open or not
   * @type {boolean}
   */
  openMenu = false;
  /**
   * object of expanded subgraphs
   * @type {Expand}
   */
  expanded: Expand = new Expand();

  /**
   * attach services
   * @param {NodeService} nodeService
   * @param {DataConnectionService} dataConnectionService
   * @param {MessageService} messageService
   * @param {NodeMenuControllerService} nodeMenuController
   * @param {GraphDataService} graphDataService
   * @param {NodeExpandService} nodeExpandService
   */
 constructor(
   private nodeService: NodeService,
  private dataConnectionService: DataConnectionService,
  private messageService: MessageService,
   private nodeMenuController: NodeMenuControllerService,
   private graphDataService: GraphDataService,
   public nodeExpandService: NodeExpandService
 ) { }


  /**
   * separate neo4j call to get counts of subgraphs
   * subscription and call set up here
   */
  ngOnInit() {
    // this only gets the count of the nodes
    this.nodeService.clickednode$.subscribe(node => {
      this.clickedNode = node;
      if (this.clickedNode.uuid) {
        this.counts = {total: 0};
        const message: Message = this.messageService.getMessage(this.clickedNode.uuid, 'counts', this.clickedNode.labels[0]);
        this.dataConnectionService.messages.next(message);
        this.expanded = this.nodeExpandService.fetchExpand(this.clickedNode.uuid);
      }
      this.setLabel();
    });


    this.dataConnectionService.messages.subscribe(msg => {
      const response = JSON.parse(msg);
      if (response.type === 'counts') {
        this.counts[response.data._fields[0][0].toLowerCase()] = response.data._fields[1].low;
        this.counts.total = this.counts.total + response.data._fields[1].low;
      }
    });

    this.nodeMenuController.clickedmenu$.subscribe(res => {
      if (this.clickedNode) {
        if (res && this.openMenu === res) {
          this.nodeMenuController.hideMenus();
          this.openMenu = res;
        } else if (!res && this.openMenu === res) {
          this.openMenu = !res;
        } else {
          this.openMenu = res;
        }
      }
    });

   /* this.settingsService.dataChange.subscribe(settings => {
      this.settings = settings;
        this.setLabel();
    });*/
  }

  /**
   * change node label from settings
   */
  setLabel(): void {
  /* console.log(this.settings);
   if(this.clickedNode) {
     switch (this.clickedNode.constructor.name) {
       case 'Target': {
         this.label = this.clickedNode[this.settings.targetLabel];
         break;
       }
       case 'Compound': {
         if (this.label && this.settings.compoundLabel === 'structure') {
           this.label = this.settings.compoundLabel;
         } else {
           this.label = this.clickedNode['hash'];
         }
         break;
       }
       case 'Pattern': {
         this.label = this.settings.patternLabel;
         break;
       }
     }
   }*/
  }

  /**
   * expand subgraph
   * @param {string} label
   */
  expand(label: string): void {
   const params = {
     'origin': this.clickedNode.labels[0],
     'target': label
   };
   if (label === 'Predictions') {
     this.graphDataService.nodeExpand(this.clickedNode.uuid, 'prediction', params);
   } else {
     this.graphDataService.nodeExpand(this.clickedNode.uuid, 'expand', params);
   }
    this.expanded[label.toLowerCase()] = true;
    this.nodeExpandService.setExpand(this.clickedNode.uuid, this.expanded);
    this.closeMenu();
  }

  /**
   * collapse subgraph
   * @param {string} label
   */
  collapse(label: string): void {
    this.graphDataService.nodeCollapse(this.clickedNode);
    this.expanded[label.toLowerCase()] = false;
    this.nodeExpandService.setExpand(this.clickedNode.uuid, this.expanded);
    this.closeMenu();
  }

  /**
   * close entire menu
   */
  closeMenu(): void {
    this.nodeMenuController.hideMenus();
    this.openMenu = false;
  }


}
