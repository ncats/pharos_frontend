import { Component, OnInit, Input } from '@angular/core';
import {SettingsService} from '../../../services/settings.service';
import {Node} from '../../../models/node';
import {NodeService} from '../../../services/event-tracking/node.service';
import {NodeMenuControllerService} from '../../../services/event-tracking/node-menu-controller.service';

/*export class StructureViewer {
  @Input() data: Compound | Pattern;
}*/

@Component({
  selector: '[nodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent implements OnInit {
  @Input('nodeVisual') node: Node;
  label: string;
  nodeClicked = false;
  displayName: string;

  constructor(public settingsService: SettingsService,
              private nodeService: NodeService,
              private nodeMenuController: NodeMenuControllerService
  ) {}

  ngOnInit(): void {
    if(this.node.name.length > 30){
      this.displayName = this.node.name.slice(0,30) + '...';
    }else {
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

  toggleMenu(): void {
    console.log(this);
    // this is the only place where the menu is opened
    this.nodeClicked = !this.nodeClicked;
    this.nodeService.clickedNodes(this.node);
    this.nodeMenuController.toggleVisible(this.node.uuid);
  }

}



