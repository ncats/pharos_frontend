import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbPanelComponent } from './pdb-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProteinStructureViewerComponent} from '../../../../../tools/protein-structure-viewer/protein-structure-viewer.component';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('PdbPanelComponent', () => {
  let component: PdbPanelComponent;
  let fixture: ComponentFixture<PdbPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProteinStructureViewerComponent,
        PdbPanelComponent
      ],
      imports: [
        SharedModule,
        GenericTableModule,
        BrowserAnimationsModule,
        ApolloTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdbPanelComponent);
    component = fixture.componentInstance;
    component.data = TESTTARGET;
    component['target'] = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
