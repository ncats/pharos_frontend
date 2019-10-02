import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbPanelComponent } from './pdb-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PdbPanelComponent', () => {
  let component: PdbPanelComponent;
  let fixture: ComponentFixture<PdbPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdbPanelComponent ],
      imports: [
        SharedModule,
        GenericTableModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdbPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
