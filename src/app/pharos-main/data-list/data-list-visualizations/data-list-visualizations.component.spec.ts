import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {DataListVisualizationsComponent} from '../../../pharos-main/data-list/data-list-visualizations/data-list-visualizations.component';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TESTFACET} from '../../../../../test/test-facet';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('DataListVisualizationsComponent', () => {
  let component: DataListVisualizationsComponent;
  let fixture: ComponentFixture<DataListVisualizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        RouterTestingModule,
        ApolloTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        PharosApiService,
        LoadingService,
        AngularFireAuth,
        {provide: APP_BASE_HREF, useValue: '/targets' },
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListVisualizationsComponent);
    component = fixture.componentInstance;
    component.data = {facets: [TESTFACET]};
    component.displayFacet = TESTFACET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
