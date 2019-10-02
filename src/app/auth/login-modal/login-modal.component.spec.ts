import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogRef} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {AngularFireModule, FirebaseApp} from '@angular/fire';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {inject} from '@angular/core';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
/*  let app: FirebaseApp;
  let afAuth: AngularFireAuth;*/
  const matDialogRefStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginModalComponent ],
      imports: [
        SharedModule,
/*        AngularFireModule.initializeApp(COMMON_CONFIG),
        AngularFireAuthModule*/
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
