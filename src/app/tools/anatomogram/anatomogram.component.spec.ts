import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomogramComponent } from './anatomogram.component';
import {AnatomogramHoverService} from './anatomogram-hover.service';

describe('AnatomogramComponent', () => {
  let component: AnatomogramComponent;
  let fixture: ComponentFixture<AnatomogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AnatomogramHoverService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomogramComponent);
    component = fixture.componentInstance;
    component.species = 'homo_sapiens';
    component.details = 'brain';
    component.tissues = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
