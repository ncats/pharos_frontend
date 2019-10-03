import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGraphPanelComponent } from './topic-graph-panel.component';
import {GraphDataService, SGNode, SmrtgraphCoreModule} from 'smrtgraph-core';
import {SharedModule} from '../../../../../shared/shared.module';
import {TopicGraphFiltersComponent} from './topic-graph-filters/topic-graph-filters.component';
import {NodeMenuPopupComponent} from './node-menu-popup/node-menu-popup.component';
import {NodeDetailsBoxComponent} from './node-details-box/node-details-box.component';
import {TargetCardComponent} from '../../../../data-list/cards/target-card/target-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';
import {IdgLevelIndicatorComponent} from '../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RadarChartModule} from '../../../../../tools/visualizations/radar-chart/radar-chart.module';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {GraphParserService} from './services/graph-parser.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

class T extends SGNode {
}

describe('TopicGraphPanelComponent', () => {
  let component: TopicGraphPanelComponent<T>;
  let fixture: ComponentFixture<TopicGraphPanelComponent<T>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopicGraphFiltersComponent,
        NodeMenuPopupComponent,
        NodeDetailsBoxComponent,
        TopicGraphPanelComponent,
        TargetCardComponent,
        LigandCardComponent,
        IdgLevelIndicatorComponent
      ],
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        SmrtgraphCoreModule,
        RadarChartModule
      ],
      providers: [
        AngularFireAuth,
        GraphDataService,
        GraphParserService,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicGraphPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
