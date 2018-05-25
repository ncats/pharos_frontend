import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesPanelComponent } from './references-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ReferencesPanelComponent', () => {
  let component: ReferencesPanelComponent;
  let fixture: ComponentFixture<ReferencesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule],
      declarations: [ ReferencesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
