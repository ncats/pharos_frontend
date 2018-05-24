import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDetailsComponent } from './target-details.component';
import {SharedModule} from '../../../shared/shared.module';
import {TargetHeaderComponent} from './target-header/target-header.component';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';
import {ComponentLookupService} from '../../../pharos-services/component-lookup.service';
import {DataDetailsResolver} from '../../services/data-details.resolver';
import {ResponseParserService} from '../../../pharos-services/response-parser.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {TestComponentLookupService} from '../../../../../test/test-component-lookup.service';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {TESTTARGET} from '../../../../../test/test-target';
import {APP_BASE_HREF} from '@angular/common';

describe('TargetDetailsComponent', () => {
  let component: TargetDetailsComponent;
  let fixture: ComponentFixture<TargetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ TargetDetailsComponent, TargetHeaderComponent],
      providers: [
        EnvironmentVariablesService,
        DataDetailsResolver,
        PathResolverService,
        PharosApiService,
        ResponseParserService,
        LoadingService,
        ComponentInjectorService,
        {provide: ComponentLookupService, useClass: TestComponentLookupService},
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'targets';
    component.data = ({object: TESTTARGET, references: []});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
