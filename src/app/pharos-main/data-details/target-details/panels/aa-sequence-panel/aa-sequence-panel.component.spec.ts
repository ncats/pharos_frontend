import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AaSequencePanelComponent } from './aa-sequence-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {TESTDISEASE} from '../../../../../../../test/test-disease';
import {TESTTARGET} from '../../../../../../../test/test-target';

describe('AaSequencePanelComponent', () => {
  let component: AaSequencePanelComponent;
  let fixture: ComponentFixture<AaSequencePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ AaSequencePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AaSequencePanelComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', description: ''}];
    component.data = ({object: TESTTARGET, references: []});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
