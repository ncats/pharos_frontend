import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypesComponent } from './data-types.component';

describe('DataTypesComponent', () => {
  let component: DataTypesComponent;
  let fixture: ComponentFixture<DataTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
