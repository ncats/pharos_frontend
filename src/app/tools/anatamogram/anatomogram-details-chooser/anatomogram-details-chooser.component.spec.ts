import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomogramDetailsChooserComponent } from './anatomogram-details-chooser.component';

describe('AnatomogramDetailsChooserComponent', () => {
  let component: AnatomogramDetailsChooserComponent;
  let fixture: ComponentFixture<AnatomogramDetailsChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnatomogramDetailsChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomogramDetailsChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
