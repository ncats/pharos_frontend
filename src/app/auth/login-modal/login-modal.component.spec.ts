import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {MatDialogRef} from '@angular/material/dialog';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  const matDialogRefStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        AngularFireAuth
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
