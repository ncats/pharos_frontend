import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import { BatchResolveModalComponent } from './batch-resolve-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';

describe('BatchResolveModalComponent', () => {
  let component: BatchResolveModalComponent;
  let fixture: ComponentFixture<BatchResolveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchResolveModalComponent ],
      imports: [
        ApolloTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
      ],
      providers: [
        AngularFireAuth,
        {provide: AngularFirestore, useValue: FIRESTORESTUB},
        {provide: MAT_DIALOG_DATA, useValue: {targetList: ['nifedipine', 'nimodipine']}},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchResolveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
