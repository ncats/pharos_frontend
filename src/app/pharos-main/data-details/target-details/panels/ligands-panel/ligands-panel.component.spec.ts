import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandsPanelComponent } from './ligands-panel.component';
import {SharedModule} from "../../../../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EnvironmentVariablesService} from "../../../../../pharos-services/environment-variables.service";

describe('LigandsPanelComponent', () => {
  let component: LigandsPanelComponent;
  let fixture: ComponentFixture<LigandsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [ LigandsPanelComponent ],
      providers: [
        EnvironmentVariablesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
