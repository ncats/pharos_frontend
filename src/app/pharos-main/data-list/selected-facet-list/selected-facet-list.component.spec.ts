import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedFacetListComponent} from './selected-facet-list.component';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../../tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {UnfurlingMetaService} from "../../../pharos-services/unfurling-meta.service";
import {MOCKACTIVATEDROUTE} from "../../../../../test/mock-activate-route";
import {ActivatedRoute} from "@angular/router";

describe('SelectedFacetListComponent', () => {
  let component: SelectedFacetListComponent;
  let fixture: ComponentFixture<SelectedFacetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule ,
        AngularFireModule.initializeApp(COMMON_CONFIG),
      ],
      providers: [
        PharosApiService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        UnfurlingMetaService,
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE },
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        AngularFireAuth,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFacetListComponent);
    component = fixture.componentInstance;
    component.facets = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
