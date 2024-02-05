import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import {FieldSelectionDialogComponent} from './field-selection-dialog.component';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';

describe('FieldSelectionDialogComponent', () => {
  let component: FieldSelectionDialogComponent;
  let fixture: ComponentFixture<FieldSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldSelectionDialogComponent],
      imports: [
        ApolloTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
      ],
      providers:
        [
          AngularFireAuth,
          {provide: AngularFirestore, useValue: FIRESTORESTUB},
          {provide: MAT_DIALOG_DATA, useValue: {route: MOCKACTIVATEDROUTE}},
          {provide: MatDialogRef, useValue: {}}
          ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
