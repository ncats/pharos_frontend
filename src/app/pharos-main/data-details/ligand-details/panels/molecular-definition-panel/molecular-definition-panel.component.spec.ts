import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MolecularDefinitionPanelComponent } from './molecular-definition-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';
import {TESTLIGAND} from '../../../../../../../test/test-ligand';

describe('MolecularDefinitionPanelComponent', () => {
  let component: MolecularDefinitionPanelComponent;
  let fixture: ComponentFixture<MolecularDefinitionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MolecularDefinitionPanelComponent ],
      imports: [
        SharedModule,
        ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MolecularDefinitionPanelComponent);
    component = fixture.componentInstance;
    component.data = {
      ligands: TESTLIGAND
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
