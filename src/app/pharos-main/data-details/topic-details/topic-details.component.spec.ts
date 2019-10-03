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


describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedDetailsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TopicHeaderComponent,
        TopicDetailsComponent,
        TopicGraphPanelComponent,
        TargetTableComponent,
        DiseaseTableComponent,
        LigandTableComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/targets' }
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
