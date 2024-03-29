import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import { FacetTableComponent } from './facet-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../../pharos-services/loading.service';
import {SelectedFacetService} from '../selected-facet.service';
import {SuggestApiService} from '../../../../tools/search-component/suggest-api.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {COMMON_CONFIG} from '../../../../../../test/test-config';
import {FIRESTORESTUB} from '../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {Apollo} from 'apollo-angular';
import {TESTFACET} from '../../../../../../test/test-facet';
import {HttpClientTestingModule} from '@angular/common/http/testing';



describe('FacetTableComponent', () => {
  let component: FacetTableComponent;
  let fixture: ComponentFixture<FacetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        PharosApiService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        AngularFireAuth,
        Apollo,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetTableComponent);
    component = fixture.componentInstance;
    component.facet = TESTFACET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
