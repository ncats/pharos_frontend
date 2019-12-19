import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSummaryComponent } from './gene-summary.component';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';

describe('GeneSummaryComponent', () => {
  let component: GeneSummaryComponent;
  let fixture: ComponentFixture<GeneSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneSummaryComponent ],
      imports: [
        ApolloTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MOCKACTIVATEDROUTE }
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
