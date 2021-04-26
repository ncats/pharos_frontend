import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseSummaryComponent } from './disease-summary.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {TESTTARGET} from '../../../../../../test/test-target';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';

describe('DiseaseSummaryComponent', () => {
  let component: DiseaseSummaryComponent;
  let fixture: ComponentFixture<DiseaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UnfurlingMetaService
        ],
      declarations: [ DiseaseSummaryComponent ],
      imports: [
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseSummaryComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data.diseases = TESTTARGET.diseases[0];
    component.disease = TESTTARGET.diseases[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
