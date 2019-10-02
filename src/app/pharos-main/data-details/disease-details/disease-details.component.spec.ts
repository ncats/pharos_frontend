import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDetailsComponent } from './disease-details.component';
import {SharedDetailsModule} from '../../../shared/shared-details.module';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {TESTTARGET} from '../../../../../test/test-target';
import {TESTDISEASE} from '../../../../../test/test-disease';

describe('DiseaseDetailsComponent', () => {
  let component: DiseaseDetailsComponent;
  let fixture: ComponentFixture<DiseaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseDetailsComponent ],
      imports: [
        RouterTestingModule,
        SharedDetailsModule
      ],
      providers: [
        ComponentInjectorService,
        DataDetailsResolver
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'diseases';
    component.data = ({object: TESTDISEASE, references: []});
    component.disease = TESTDISEASE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
