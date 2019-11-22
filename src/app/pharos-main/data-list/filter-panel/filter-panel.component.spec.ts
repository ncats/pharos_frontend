import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterPanelComponent} from './filter-panel.component';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../../tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SharedModule} from '../../../shared/shared.module';
import {SelectedFacetService} from './selected-facet.service';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {FacetTableComponent} from './facet-table/facet-table.component';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        ApolloTestingModule,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        FilterPanelComponent,
        FacetTableComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        PathResolverService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]     })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
