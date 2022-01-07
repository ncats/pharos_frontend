import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsetPlotComponent } from './upset-plot.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../test/test-config';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SelectedFacetService} from '../../../pharos-main/data-list/filter-panel/selected-facet.service';
import {SuggestApiService} from '../../search-component/suggest-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {UpsetComponent} from '../upset/upset.component';

describe('UpsetPlotComponent', () => {
  let component: UpsetPlotComponent;
  let depComponent: UpsetComponent;
  let fixture: ComponentFixture<UpsetPlotComponent>;
  let depFixture: ComponentFixture<UpsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        ApolloTestingModule,
        SharedModule,
        RouterTestingModule,
        HttpClientModule],
      declarations: [ UpsetPlotComponent ],
      providers: [
        PharosApiService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        AngularFireAuth,
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsetPlotComponent);
    depFixture = TestBed.createComponent(UpsetComponent);
    component = fixture.componentInstance;
    depComponent = depFixture.componentInstance;
    depFixture.detectChanges();
    component.upsetComponent = depComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
