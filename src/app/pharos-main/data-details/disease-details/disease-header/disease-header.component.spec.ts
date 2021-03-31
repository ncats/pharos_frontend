import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseHeaderComponent } from './disease-header.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {TESTTARGET} from '../../../../../../test/test-target';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TopicSaveModalComponent} from '../../../data-list/tables/target-table/topic-save-modal/topic-save-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../../shared/shared.module';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../../test/test-config';

describe('DiseaseHeaderComponent', () => {
  let component: DiseaseHeaderComponent;
  let fixture: ComponentFixture<DiseaseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: MatDialogRef, useValue: {}},
        UnfurlingMetaService,
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
        ],
      declarations: [ DiseaseHeaderComponent ],
      imports: [
        MatDialogModule,
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseHeaderComponent);
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
