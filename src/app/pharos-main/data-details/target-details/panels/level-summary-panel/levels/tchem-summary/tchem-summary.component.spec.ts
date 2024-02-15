import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TchemSummaryComponent } from './tchem-summary.component';
import {TESTTARGET} from '../../../../../../../../../test/test-target';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('TchemSummaryComponent', () => {
  let component: TchemSummaryComponent;
  let fixture: ComponentFixture<TchemSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TchemSummaryComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data = {targets: TESTTARGET};
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
