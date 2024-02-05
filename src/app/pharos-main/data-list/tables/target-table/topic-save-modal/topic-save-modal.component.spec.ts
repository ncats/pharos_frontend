import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSaveModalComponent } from './topic-save-modal.component';
import {SharedModule} from '../../../../../shared/shared.module';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TopicSaveModalComponent', () => {
  let component: TopicSaveModalComponent;
  let fixture: ComponentFixture<TopicSaveModalComponent>;
  const matDialogRefStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopicSaveModalComponent
      ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
