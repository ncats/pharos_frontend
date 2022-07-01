import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackCircleComponent } from './pack-circle.component';
import {TestCirclePlot} from "../../../../../test/test-circle-plot";

describe('PackCircleComponent', () => {
  let component: PackCircleComponent;
  let fixture: ComponentFixture<PackCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackCircleComponent);
    component = fixture.componentInstance;
    component.hierarchyData = TestCirclePlot;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
