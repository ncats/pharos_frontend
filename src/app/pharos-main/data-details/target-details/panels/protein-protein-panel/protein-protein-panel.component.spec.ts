import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinProteinPanelComponent } from './protein-protein-panel.component';
import {MaterialModule} from '../../../../../../assets/material/material.module';
import {SharedModule} from '../../../../../shared/shared.module';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {TargetTableModule} from '../../../../modules/targets/target-list.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule, FirebaseAuth} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';

describe('ProteinProteinPanelComponent', () => {
  let component: ProteinProteinPanelComponent;
  let fixture: ComponentFixture<ProteinProteinPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProteinProteinPanelComponent
      ],
      imports: [
        RouterTestingModule,
        TargetTableModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinProteinPanelComponent);
    component = fixture.componentInstance;
    component.data = TESTTARGET;
    component.targets = [TESTTARGET];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
