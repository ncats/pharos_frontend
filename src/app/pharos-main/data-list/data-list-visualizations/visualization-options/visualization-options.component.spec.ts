import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationOptionsComponent } from './visualization-options.component';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {TESTFACET} from '../../../../../../test/test-facet';

describe('VisualizationOptionsComponent', () => {
  let component: VisualizationOptionsComponent;
  let fixture: ComponentFixture<VisualizationOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationOptionsComponent);
    component = fixture.componentInstance;
    component.facets = [TESTFACET];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
