import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataListComponent} from './data-list.component';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FacetRetrieverService} from './filter-panel/facet-retriever.service';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedListModule} from '../../shared/shared-list.module';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../test/test-config';

describe('DataListComponent', () => {
  let component: DataListComponent;
  let fixture: ComponentFixture<DataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        SharedListModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [

      ],
      providers: [
        ComponentInjectorService,
        PathResolverService,
        PharosApiService,
        FacetRetrieverService,
        SuggestApiService,
        AngularFireAuth,
        {provide: APP_BASE_HREF, useValue: '/targets' },
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListComponent);
    component = fixture.componentInstance;
    component.path = 'targets';
    component.componentsLoaded = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
