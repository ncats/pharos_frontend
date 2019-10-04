import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetListPanelComponent } from './target-list-panel.component';
import {SharedModule} from '../../../../shared/shared.module';
import {GenericTableModule} from '../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TESTDISEASE} from '../../../../../../test/test-disease';

describe('TargetListPanelComponent', () => {
  let component: TargetListPanelComponent;
  let fixture: ComponentFixture<TargetListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetListPanelComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        GenericTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetListPanelComponent);
    component = fixture.componentInstance;
    component.data = ({object: TESTDISEASE, references: []});
    component.disease = TESTDISEASE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
