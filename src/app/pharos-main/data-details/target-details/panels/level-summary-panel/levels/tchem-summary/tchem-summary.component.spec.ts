import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TchemSummaryComponent } from './tchem-summary.component';
import {SharedModule} from '../../../../../../../shared/shared.module';
import {TESTTARGET} from '../../../../../../../../../test/test-target';

describe('TchemSummaryComponent', () => {
  let component: TchemSummaryComponent;
  let fixture: ComponentFixture<TchemSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TchemSummaryComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TchemSummaryComponent);
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
