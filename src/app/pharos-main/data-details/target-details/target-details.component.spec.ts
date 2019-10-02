import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetDetailsComponent} from './target-details.component';
import {SharedModule} from '../../../shared/shared.module';
import {TargetHeaderComponent} from './target-header/target-header.component';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {LoadingService} from '../../../pharos-services/loading.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {TESTTARGET} from '../../../../../test/test-target';
import {APP_BASE_HREF} from '@angular/common';
import {SharedDetailsModule} from '../../../shared/shared-details.module';

describe('TargetDetailsComponent', () => {
  let component: TargetDetailsComponent;
  let fixture: ComponentFixture<TargetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        SharedDetailsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TargetDetailsComponent,
        TargetHeaderComponent
      ],
      providers: [
        DataDetailsResolver,
        LoadingService,
        ComponentInjectorService,
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
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
