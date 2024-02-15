import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbioSummaryComponent } from './tbio-summary.component';
import {TESTTARGET} from '../../../../../../../../../test/test-target';
import {FlexLayoutModule} from '@angular/flex-layout';

describe('TbioSummaryComponent', () => {
  let component: TbioSummaryComponent;
  let fixture: ComponentFixture<TbioSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbioSummaryComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
   // component.data = ({object: TESTTARGET, references: []});
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
