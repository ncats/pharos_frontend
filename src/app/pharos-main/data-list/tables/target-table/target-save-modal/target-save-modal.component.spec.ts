import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSaveModalComponent } from './target-save-modal.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireAuth} from '@angular/fire/auth';

describe('TargetSaveModalComponent', () => {
  let component: TargetSaveModalComponent;
  let fixture: ComponentFixture<TargetSaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TargetSaveModalComponent
      ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
