import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DataVersionInfo} from '../../models/dataVersion';
import {TourType} from '../../models/tour-type';
import {HelpPanelTriggerComponent} from '../help-panel/components/help-panel-trigger/help-panel-trigger.component';
import {TutorialLinkComponent} from '../tutorial-link/tutorial-link.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../assets/material/material.module';
import {HelpPanelComponent} from '../help-panel/help-panel.component';

@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HelpPanelTriggerComponent,
    HelpPanelComponent,
    TutorialLinkComponent,
    MaterialModule,
    MatTooltipModule,
    CommonModule,
    FlexLayoutModule
  ],
  selector: 'pharos-component-header',
  templateUrl: './component-header.component.html',
  styleUrls: ['./component-header.component.scss']
})
export class ComponentHeaderComponent implements OnInit {
  constructor() { }
  @Input() description: string;
  @Input() field: string;
  @Input() headerText: string;
  @Input() dataVersions: DataVersionInfo[];
  @Input() tourType: TourType;
  @Input() predictionDetails: any[] = [];
  @Input() tourTypeVisible = () => true;

  ngOnInit(): void { }

}
