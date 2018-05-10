import {Component, OnInit, Input} from '@angular/core';

import {Subscription} from 'rxjs';
import {SettingsService} from '../../../services/settings.service';
import {Link} from '../../../models/link';


@Component({
  selector: '[linkVisual]',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent implements OnInit {
  @Input('linkVisual') link: Link;
  showLinkLabel = true;
  subscription: Subscription;

  constructor( private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.subscription = this.settingsService.dataChange
      .subscribe(settings => {
        this.showLinkLabel = settings.showLinkLabel;
      });

  }

  getSource(link: Node, property: string): number {
    if (link[property]) {
      return link[property];
    } else {
      return 0;
    }
  }

  endpointLessRadius(link, attr_name) { //  subtract radius away from line end
    //  this.source = link.source;
    //   this.target = link.target;
    const x1 =  link.source.x || 0;
    const y1 =  link.source.y || 0;
    const x2 =  link.target.x || 0;
    const y2 =  link.target.y || 0;

    const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    const radius1 =  link.source.r || 0;
    const radius2 =  link.target.r || 0;

    if (attr_name === 'x1') { return x1 + (x2 - x1) * radius1 / distance; }
    if (attr_name === 'y1') { return y1 + (y2 - y1) * radius1 / distance; }
    if (attr_name === 'x2') { return x2 + (x1 - x2) * radius2 / distance; }
    if (attr_name === 'y2') { return y2 + (y1 - y2) * radius2 / distance; }
  }

}
