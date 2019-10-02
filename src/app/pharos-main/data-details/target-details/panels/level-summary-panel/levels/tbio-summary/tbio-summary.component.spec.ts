import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbioSummaryComponent } from './tbio-summary.component';
import {SharedModule} from '../../../../../../../shared/shared.module';
import {TESTTARGET} from '../../../../../../../../../test/test-target';

describe('TbioSummaryComponent', () => {
  let component: TbioSummaryComponent;
  let fixture: ComponentFixture<TbioSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbioSummaryComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbioSummaryComponent);
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
