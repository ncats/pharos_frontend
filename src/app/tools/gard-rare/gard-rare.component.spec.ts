import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardRareComponent } from './gard-rare.component';

describe('GardRareComponent', () => {
  let component: GardRareComponent;
  let fixture: ComponentFixture<GardRareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardRareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
