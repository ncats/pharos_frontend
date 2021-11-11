import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbPanelComponent } from './pdb-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProteinStructureViewerComponent} from '../../../../../tools/protein-structure-viewer/protein-structure-viewer.component';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {HTTPLINKSTUB} from "../../../../../../../test/httpLink-stub";
import {HttpLink} from "apollo-angular/http";

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
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: HttpLink, useValue: HTTPLINKSTUB},
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdbPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
