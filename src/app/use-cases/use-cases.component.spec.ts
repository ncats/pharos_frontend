import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import { UseCasesComponent } from './use-cases.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../test/mock-activate-route';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {RouterTestingModule} from '@angular/router/testing';

describe('UseCasesComponent', () => {
  let component: UseCasesComponent;
  let fixture: ComponentFixture<UseCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        UseCasesComponent
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
