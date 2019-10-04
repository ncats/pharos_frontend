import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosMainComponent } from './pharos-main.component';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('PharosMainComponent', () => {
  let component: PharosMainComponent;
  let fixture: ComponentFixture<PharosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PharosMainComponent
      ],
      providers: [
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
