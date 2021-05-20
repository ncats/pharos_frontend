import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LigandDetailsComponent} from './ligand-details.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {SharedModule} from '../../../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {TESTLIGAND, TESTLIGANDPROPS} from '../../../../../../../test/test-ligand';
import {PharosApiService} from '../../../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../../../pharos-services/loading.service';
import {SelectedFacetService} from '../../../../data-list/filter-panel/selected-facet.service';
import {SuggestApiService} from '../../../../../tools/search-component/suggest-api.service';
import {APP_BASE_HREF} from '@angular/common';

describe('LigandDetailsComponent', () => {
  let component: LigandDetailsComponent;
  let fixture: ComponentFixture<LigandDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LigandDetailsComponent],
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDetailsComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data = {
      ligands: TESTLIGAND,
      ligandsProps: TESTLIGANDPROPS
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
