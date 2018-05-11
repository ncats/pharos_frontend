import { Component, OnInit, Input } from '@angular/core';
import {SettingsService} from '../../../services/settings.service';
import {Node} from '../../../models/node';
import {NodeService} from '../../../services/event-tracking/node.service';
import {NodeMenuControllerService} from '../../../services/event-tracking/node-menu-controller.service';

/*export class StructureViewer {
  @Input() data: Compound | Pattern;
}*/

/**
 * visual component of node object
 */
@Component({
  selector: '[node]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent implements OnInit {
  /**
   * node passed in from graph
   */
  @Input() node: Node;
  /**
   * node label
   */
  label: string;
  /**
   * boolean to dispaly clicked properties
   * @type {boolean}
   */
  nodeClicked = false;
  /**
   * display name if different from node name
   */
  displayName: string;

  /**
   * create services
   * @param {SettingsService} settingsService
   * @param {NodeService} nodeService
   * @param {NodeMenuControllerService} nodeMenuController
   */
  constructor(public settingsService: SettingsService,
              private nodeService: NodeService,
              private nodeMenuController: NodeMenuControllerService
  ) {}

  /**
   * parse display name
   * adapt graph as settings dictate
   */
  ngOnInit(): void {
    if (this.node.name.length > 30) {
      this.displayName = this.node.name.slice(0, 30) + '...';
    } else {
      this.displayName = this.node.name;
    }
    this.settingsService.dataChange
      .subscribe(settings => {
       /* switch (this.node.constructor.name) {
          case 'Target': {
            this.label = this.node[settings.targetLabel];
            break;
          }
          case 'Compound': {
            if (settings.compoundLabel === 'structure') {
              this.label = settings.compoundLabel;
            } else {
              this.label = this.node['hash'];
            }
            break;
          }
          case 'Pattern': {
            this.label = settings.patternLabel ? settings.patternLabel : '';
            break;
          }
        }*/
        //   console.log(this.label);
      });
  }

  /**
   * open or close menu with node information
   */
  toggleMenu(): void {
    // this is the only place where the menu is opened
    this.nodeClicked = !this.nodeClicked;
    this.nodeService.clickedNodes(this.node);
    this.nodeMenuController.toggleVisible(this.node.uuid);
  }

}



