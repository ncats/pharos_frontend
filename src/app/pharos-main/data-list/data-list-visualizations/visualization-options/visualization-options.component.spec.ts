import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationOptionsComponent } from './visualization-options.component';
import {RouterTestingModule} from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';

describe('VisualizationOptionsComponent', () => {
  let component: VisualizationOptionsComponent;
  let fixture: ComponentFixture<VisualizationOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        VisualizationOptionsComponent
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
    component.facets = [
      {facet: 'tim', values: [{name: 'tim'}]}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
