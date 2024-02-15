import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TclinSummaryComponent } from './tclin-summary.component';
import {TESTTARGET} from '../../../../../../../../../test/test-target';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('TclinSummaryComponent', () => {
  let component: TclinSummaryComponent;
  let fixture: ComponentFixture<TclinSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TclinSummaryComponent);
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
