import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSummaryComponent } from './gene-summary.component';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {UnfurlingMetaService} from "../../../../../pharos-services/unfurling-meta.service";
import {RouterTestingModule} from "@angular/router/testing";
import {ApolloTestingModule} from "apollo-angular/testing";

describe('GeneSummaryComponent', () => {
  let component: GeneSummaryComponent;
  let fixture: ComponentFixture<GeneSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UnfurlingMetaService],
      declarations: [ GeneSummaryComponent ],
      imports: [
        ApolloTestingModule,
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneSummaryComponent);
    component = fixture.componentInstance;
    component.data = {
      targets: TESTTARGET,
      targetsProps: TESTTARGETPROPS
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
