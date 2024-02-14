import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyTargetListComponent } from './nearby-target-list.component';

describe('NearbyTargetListComponent', () => {
  let component: NearbyTargetListComponent;
  let fixture: ComponentFixture<NearbyTargetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyTargetListComponent);
    component = fixture.componentInstance;
    component.sharedPathwayDetails = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
