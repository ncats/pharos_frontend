import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneRifPanelComponent } from './gene-rif-panel.component';
import {SharedModule} from '../../../../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('GeneRifPanelComponent', () => {
  let component: GeneRifPanelComponent;
  let fixture: ComponentFixture<GeneRifPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [ GeneRifPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneRifPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
