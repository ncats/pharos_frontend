import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdgResourcesPanelComponent } from './idg-resources-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {PharosPaginatorModule} from '../../../../../tools/pharos-paginator/pharos-paginator.module';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('IdgResourcesPanelComponent', () => {
  let component: IdgResourcesPanelComponent;
  let fixture: ComponentFixture<IdgResourcesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdgResourcesPanelComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        PharosPaginatorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdgResourcesPanelComponent);
    component = fixture.componentInstance;
    component.data = ({object: TESTTARGET, references: []});
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
