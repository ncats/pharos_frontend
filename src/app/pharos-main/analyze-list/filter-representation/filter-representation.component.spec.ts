import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import { FilterRepresentationComponent } from './filter-representation.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../shared/shared.module';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';

describe('FilterRepresentationComponent', () => {
  let component: FilterRepresentationComponent;
  let fixture: ComponentFixture<FilterRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        PharosApiService,
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
      declarations: [ FilterRepresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
