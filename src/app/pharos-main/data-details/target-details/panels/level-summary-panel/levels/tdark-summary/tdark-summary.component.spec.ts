import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdarkSummaryComponent } from './tdark-summary.component';
import {TESTTARGET} from '../../../../../../../../../test/test-target';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('TdarkSummaryComponent', () => {
  let component: TdarkSummaryComponent;
  let fixture: ComponentFixture<TdarkSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdarkSummaryComponent);
    component = fixture.componentInstance;
   // component.data = [];
    component.target = TESTTARGET;
    component.apiSources = [{label: '', field: '', description: ''}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
