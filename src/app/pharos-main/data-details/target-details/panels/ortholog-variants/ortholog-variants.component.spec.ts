import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthologVariantsComponent } from './ortholog-variants.component';
import {TESTTARGET} from "../../../../../../../test/test-target";

describe('OrthologVariantsComponent', () => {
  let component: OrthologVariantsComponent;
  let fixture: ComponentFixture<OrthologVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrthologVariantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthologVariantsComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
