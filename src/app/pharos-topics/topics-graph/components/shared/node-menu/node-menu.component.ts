import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NodeService} from '../../../services/event-tracking/node.service';
import {Expand, NodeExpandService} from '../../../services/event-tracking/node-expand.service';
import {DataConnectionService} from '../../../services/connection/data-connection.service';
import {Message, MessageService} from '../../../services/message.service';
import {NodeMenuControllerService} from '../../../services/event-tracking/node-menu-controller.service';
import {GraphDataService} from '../../../services/graph-data.service';
import {Node} from '../../../models/node';


@Component({
  selector: '[menu-list]',
  templateUrl: './node-menu.component.html',
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent implements OnInit {
  clickedNode: Node;
  counts: any = {total: 0};
  subscription: Subscription;
  label: string;
  openMenu = false;
  expanded: Expand = new Expand();

 constructor(
   private nodeService: NodeService,
  private dataConnectionService: DataConnectionService,
  private messageService: MessageService,
   private nodeMenuController: NodeMenuControllerService,
   private graphDataService: GraphDataService,
   public nodeExpandService: NodeExpandService
 ) { }



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

  expand(label): void {
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

  collapse(label): void {
    this.graphDataService.nodeCollapse(this.clickedNode);
    this.expanded[label.toLowerCase()] = false;
    this.nodeExpandService.setExpand(this.clickedNode.uuid, this.expanded);
    this.closeMenu();
  }

  closeMenu(): void {
    this.nodeMenuController.hideMenus();
    this.openMenu = false;
  }


}
