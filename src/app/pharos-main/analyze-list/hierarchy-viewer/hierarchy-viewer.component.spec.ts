import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyViewerComponent } from './hierarchy-viewer.component';
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../test/mock-activate-route";

describe('HierarchyViewerComponent', () => {
  let component: HierarchyViewerComponent;
  let fixture: ComponentFixture<HierarchyViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyViewerComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
