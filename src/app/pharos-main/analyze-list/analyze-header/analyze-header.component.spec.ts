import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeHeaderComponent } from './analyze-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../shared/shared.module';
import {GenericTableModule} from '../../../tools/generic-table/generic-table.module';
import {RadarChartModule} from '../../../tools/visualizations/radar-chart/radar-chart.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {KnowledgeTableComponent} from '../../../tools/knowledge-table/knowledge-table.component';
import {TargetTableComponent} from '../../data-list/tables/target-table/target-table.component';
import {TargetCardComponent} from '../../data-list/cards/target-card/target-card.component';

describe('AnalyzeHeaderComponent', () => {
  let component: AnalyzeHeaderComponent;
  let fixture: ComponentFixture<AnalyzeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        GenericTableModule,
        RadarChartModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        PharosApiService,
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
      declarations: [
        AnalyzeHeaderComponent,
        IdgLevelIndicatorComponent,
        KnowledgeTableComponent,
        TargetTableComponent,
        TargetCardComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
