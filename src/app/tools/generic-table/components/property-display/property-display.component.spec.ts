import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDisplayComponent } from './property-display.component';
import {SharedModule} from '../../../../shared/shared.module';

describe('PropertyDisplayComponent', () => {
  let component: PropertyDisplayComponent;
  let fixture: ComponentFixture<PropertyDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDisplayComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
