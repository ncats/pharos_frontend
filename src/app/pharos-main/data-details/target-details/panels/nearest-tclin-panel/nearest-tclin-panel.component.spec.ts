import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestTclinPanelComponent } from './nearest-tclin-panel.component';

describe('NearestTclinPanelComponent', () => {
  let component: NearestTclinPanelComponent;
  let fixture: ComponentFixture<NearestTclinPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearestTclinPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestTclinPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
