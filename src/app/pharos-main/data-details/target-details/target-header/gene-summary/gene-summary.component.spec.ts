import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSummaryComponent } from './gene-summary.component';
import {TESTTARGET} from '../../../../../../../test/test-target';

describe('GeneSummaryComponent', () => {
  let component: GeneSummaryComponent;
  let fixture: ComponentFixture<GeneSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneSummaryComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    component.data = {};
    component.data.geneSummary = [{text: 'this is an awesome gene'}];

   // component.geneSummary = 'this is a gene';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
