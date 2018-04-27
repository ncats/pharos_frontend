import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetFacetPanelComponent } from './target-facet-panel.component';
import {SharedModule} from "../../../../../shared/shared.module";

describe('TargetFacetPanelComponent', () => {
  let component: TargetFacetPanelComponent;
  let fixture: ComponentFixture<TargetFacetPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
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
