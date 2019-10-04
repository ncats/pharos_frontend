import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {DataListVisualizationsComponent} from '../../../pharos-main/data-list/data-list-visualizations/data-list-visualizations.component';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SharedListModule} from '../../../shared/shared-list.module';
import {DonutChartComponent} from '../../../tools/visualizations/donut-chart/donut-chart.component';
import {SharedModule} from '../../../shared/shared.module';
import {VisualizationOptionsComponent} from './visualization-options/visualization-options.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {COMMON_CONFIG} from '../../../../../test/test-config';


describe('DataListVisualizationsComponent', () => {
  let component: DataListVisualizationsComponent;
  let fixture: ComponentFixture<DataListVisualizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        DonutChartComponent,
        VisualizationOptionsComponent,
        DataListVisualizationsComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        LoadingService,
        AngularFireAuth,
        {provide: APP_BASE_HREF, useValue: '/targets' },
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListVisualizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
