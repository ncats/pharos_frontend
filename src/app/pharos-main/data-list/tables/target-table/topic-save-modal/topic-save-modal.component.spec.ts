import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSaveModalComponent } from './topic-save-modal.component';
import {SharedModule} from '../../../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';
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
