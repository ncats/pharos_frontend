import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TclinSummaryComponent } from './tclin-summary.component';
import {SharedModule} from '../../../../../../../shared/shared.module';
import {TESTTARGET} from '../../../../../../../../../test/test-target';

describe('TclinSummaryComponent', () => {
  let component: TclinSummaryComponent;
  let fixture: ComponentFixture<TclinSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TclinSummaryComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TclinSummaryComponent);
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
