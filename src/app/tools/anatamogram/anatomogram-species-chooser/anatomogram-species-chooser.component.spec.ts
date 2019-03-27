import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomogramSpeciesChooserComponent } from './anatomogram-species-chooser.component';

describe('AnatomogramSpeciesChooserComponent', () => {
  let component: AnatomogramSpeciesChooserComponent;
  let fixture: ComponentFixture<AnatomogramSpeciesChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnatomogramSpeciesChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomogramSpeciesChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
