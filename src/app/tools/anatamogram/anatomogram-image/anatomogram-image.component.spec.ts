import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomogramImageComponent } from './anatomogram-image.component';

describe('AnatomogramImageComponent', () => {
  let component: AnatomogramImageComponent;
  let fixture: ComponentFixture<AnatomogramImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnatomogramImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomogramImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
