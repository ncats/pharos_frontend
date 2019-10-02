import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdarkSummaryComponent } from './tdark-summary.component';
import {SharedModule} from '../../../../../../../shared/shared.module';
import {TESTTARGET} from '../../../../../../../../../test/test-target';

describe('TdarkSummaryComponent', () => {
  let component: TdarkSummaryComponent;
  let fixture: ComponentFixture<TdarkSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdarkSummaryComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdarkSummaryComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', description: ''}];
    component.data = ({object: TESTTARGET, references: []});
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
