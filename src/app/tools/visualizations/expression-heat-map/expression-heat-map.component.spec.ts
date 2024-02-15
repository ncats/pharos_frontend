import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionHeatMapComponent } from './expression-heat-map.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UpsetPlotComponent} from '../upset-plot/upset-plot.component';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SelectedFacetService} from '../../../pharos-main/data-list/filter-panel/selected-facet.service';
import {SuggestApiService} from '../../search-component/suggest-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MultidimensionalFacetPlotComponent', () => {
  let component: ExpressionHeatMapComponent;
  let fixture: ComponentFixture<ExpressionHeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
        ApolloTestingModule,
        RouterTestingModule,
        HttpClientModule],
      providers: [
        PharosApiService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        AngularFireAuth
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
