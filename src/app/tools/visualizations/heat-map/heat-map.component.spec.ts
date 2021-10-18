import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapComponent } from './heat-map.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SelectedFacetService} from '../../../pharos-main/data-list/filter-panel/selected-facet.service';
import {SuggestApiService} from '../../search-component/suggest-api.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GenericTableModule} from '../../generic-table/generic-table.module';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';

describe('HeatMapComponent', () => {
  let component: HeatMapComponent;
  let fixture: ComponentFixture<HeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatMapComponent ],
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        ApolloTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        GenericTableModule,
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
