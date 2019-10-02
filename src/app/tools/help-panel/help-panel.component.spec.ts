import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPanelComponent } from './help-panel.component';
import {SharedModule} from '../../shared/shared.module';

describe('HelpPanelComponent', () => {
  let component: HelpPanelComponent;
  let fixture: ComponentFixture<HelpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPanelComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
