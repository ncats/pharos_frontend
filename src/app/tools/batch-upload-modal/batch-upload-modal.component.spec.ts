import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BatchUploadModalComponent} from './batch-upload-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';

describe('BatchUploadModalComponent', () => {
  let component: BatchUploadModalComponent;
  let fixture: ComponentFixture<BatchUploadModalComponent>;
  const matDialogRefStub = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BatchUploadModalComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        PharosApiService,
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        {provide: AngularFirestore, useValue: FIRESTORESTUB},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: matDialogRefStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
