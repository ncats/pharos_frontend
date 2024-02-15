import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomogramImageComponent } from './anatomogram-image.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AnatomogramImageComponent', () => {
  let component: AnatomogramImageComponent;
  let fixture: ComponentFixture<AnatomogramImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomogramImageComponent);
    component = fixture.componentInstance;
    component.species = 'homo_sapiens';
    component.details = 'female';
    component.tissues = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
