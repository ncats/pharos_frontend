import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinxScatterplotCardComponent } from './tinx-scatterplot-card.component';

describe('TinxScatterplotCardComponent', () => {
  let component: TinxScatterplotCardComponent;
  let fixture: ComponentFixture<TinxScatterplotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinxScatterplotCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinxScatterplotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
