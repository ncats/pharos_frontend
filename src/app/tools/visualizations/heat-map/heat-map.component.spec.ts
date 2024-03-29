import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapComponent } from './heat-map.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SelectedFacetService} from '../../../pharos-main/data-list/filter-panel/selected-facet.service';
import {SuggestApiService} from '../../search-component/suggest-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';

describe('HeatMapComponent', () => {
  let component: HeatMapComponent;
  let fixture: ComponentFixture<HeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        ApolloTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule],
      providers: [
        DynamicServicesService,
        PharosApiService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        AngularFireAuth,
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
    ]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
