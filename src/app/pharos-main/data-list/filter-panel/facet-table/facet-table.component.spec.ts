import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

import { FacetTableComponent } from './facet-table.component';
import {SharedModule} from '../../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PathResolverService} from '../../../../pharos-services/path-resolver.service';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';
import {LoadingService} from '../../../../pharos-services/loading.service';
import {SelectedFacetService} from '../selected-facet.service';
import {SuggestApiService} from '../../../../tools/search-component/suggest-api.service';



describe('FacetTableComponent', () => {
  let component: FacetTableComponent;
  let fixture: ComponentFixture<FacetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        FacetTableComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetTableComponent);
    component = fixture.componentInstance;
    component.facet = {facet: 'tim', values: [{name: 'tim'}]};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
