import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionTissueCardComponent } from './expression-tissue-card.component';
import {TESTTARGET} from "../../../../../../../../test/test-target";
import {AnatamogramHoverService} from "../../../../../../tools/anatamogram/anatamogram-hover.service";

describe('ExpressionTissueCardComponent', () => {
  let component: ExpressionTissueCardComponent;
  let fixture: ComponentFixture<ExpressionTissueCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionTissueCardComponent ],
      providers: [
        AnatamogramHoverService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionTissueCardComponent);
    component = fixture.componentInstance;
    component.tissueExpressionSources = TESTTARGET.expressions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
