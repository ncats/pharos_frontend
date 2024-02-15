import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TinxDiseaseComponent} from './tinx-disease.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {RouterTestingModule} from '@angular/router/testing';
import {TESTDISEASE} from '../../../../../../test/test-disease';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../../test/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Apollo} from 'apollo-angular';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../../test/firestore-stub';

describe('TinxDiseaseComponent', () => {
  let component: TinxDiseaseComponent;
  let fixture: ComponentFixture<TinxDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        PharosApiService,
        Apollo,
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinxDiseaseComponent);
    component = fixture.componentInstance;
    component.data.diseases = TESTDISEASE;
    component.tinx = [{x: 1, y: 2, id: 'yup', name: 'test', label: 'testLabel' }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
