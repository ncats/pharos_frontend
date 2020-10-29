import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Target} from "../../../../models/target";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {NavSectionsService} from "../../../../tools/sidenav-panel/services/nav-sections.service";
import {DynamicPanelBaseComponent} from "../../../../tools/dynamic-panel-base/dynamic-panel-base.component";

@Component({
  selector: 'pharos-long-target-card',
  templateUrl: './long-target-card.component.html',
  styleUrls: ['./long-target-card.component.scss']
})

export class LongTargetCardComponent extends DynamicPanelBaseComponent implements OnInit {

  @Input() target?: Target;
  @Input() selected: boolean;
  @Input() loggedIn: boolean;

  @Output() selectionChanged = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  toggleSelection($event: any){
    this.selected = !this.selected;
    this.selectionChanged.emit(this.selected);
  }
}
