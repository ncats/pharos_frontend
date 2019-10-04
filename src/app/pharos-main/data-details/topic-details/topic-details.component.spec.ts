import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopicDetailsComponent} from './topic-details.component';
import {APP_BASE_HREF} from '@angular/common';
import {TopicHeaderComponent} from './topic-header/topic-header.component';
import {TopicGraphPanelComponent} from './panels/topic-graph-panel/topic-graph-panel.component';
import {TargetTableComponent} from '../../data-list/tables/target-table/target-table.component';
import {DiseaseTableComponent} from '../../data-list/tables/disease-table/disease-table.component';
import {LigandTableComponent} from '../../data-list/tables/ligand-table/ligand-table.component';
import {TopicGraphFiltersComponent} from './panels/topic-graph-panel/topic-graph-filters/topic-graph-filters.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {GraphDataService, LinkService, NodeService, SmrtgraphCoreModule} from 'smrtgraph-core';
import {GraphParserService} from './panels/topic-graph-panel/services/graph-parser.service';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {ActivatedRoute} from '@angular/router';
import {MockActivatedRoute} from '../../../../../test/mock-activate-route';
import {of} from 'rxjs';


describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedDetailsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SmrtgraphCoreModule
      ],
      declarations: [
        TopicHeaderComponent,
        TopicDetailsComponent,
        TopicGraphPanelComponent,
        TargetTableComponent,
        DiseaseTableComponent,
        LigandTableComponent,
        TopicGraphFiltersComponent
      ],
      providers: [
        GraphParserService,
        GraphDataService,
        NodeService,
        LinkService,
        ComponentInjectorService,
        {provide: APP_BASE_HREF, useValue: '/targets' },
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: {
          snapshot: {
              data: {
                pharosObject:  of({data: () => {
                  return {allTargets: ['LRRK2'],
                    allDiseases: [],
                    allLigands: []
                  };
                  }})
              }
            }
          }
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
