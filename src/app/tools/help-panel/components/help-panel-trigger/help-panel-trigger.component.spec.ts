import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPanelTriggerComponent } from './help-panel-trigger.component';
import {SharedModule} from '../../../../shared/shared.module';
import {MaterialModule} from '../../../../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HelpPanelTriggerComponent', () => {
  let component: HelpPanelTriggerComponent;
  let fixture: ComponentFixture<HelpPanelTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelpPanelTriggerComponent
      ],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        FlexLayoutModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPanelTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
