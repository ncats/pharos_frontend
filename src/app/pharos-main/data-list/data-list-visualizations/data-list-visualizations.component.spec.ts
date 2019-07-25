import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {DataListVisualizationsComponent} from '../../../pharos-main/data-list/data-list-visualizations/data-list-visualizations.component';
import {SharedModule} from '../../../shared/shared.module';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../pharos-services/loading.service';


describe('DataListVisualizationsComponent', () => {
  let component: DataListVisualizationsComponent;
  let fixture: ComponentFixture<DataListVisualizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        DataListVisualizationsComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        LoadingService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
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
