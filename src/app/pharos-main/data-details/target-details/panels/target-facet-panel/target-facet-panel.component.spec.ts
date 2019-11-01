import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetFacetPanelComponent } from './target-facet-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('TargetFacetPanelComponent', () => {
  let component: TargetFacetPanelComponent;
  let fixture: ComponentFixture<TargetFacetPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        GenericTableModule,
        ApolloTestingModule,
        RouterTestingModule
      ],
      declarations: [ TargetFacetPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetFacetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
