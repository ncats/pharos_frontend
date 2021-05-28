import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentialPanelComponent } from './differential-panel.component';
import {SharedModule} from '../../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../../test/test-target';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../../test/mock-activate-route';

describe('DifferentialPanelComponent', () => {
  let component: DifferentialPanelComponent;
  let fixture: ComponentFixture<DifferentialPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ],
      declarations: [ DifferentialPanelComponent ],
      imports: [
        SharedModule,
        GenericTableModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentialPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
