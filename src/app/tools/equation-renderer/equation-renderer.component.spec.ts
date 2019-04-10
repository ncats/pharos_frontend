import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationRendererComponent } from './equation-renderer.component';

describe('EquationRendererComponent', () => {
  let component: EquationRendererComponent;
  let fixture: ComponentFixture<EquationRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquationRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
