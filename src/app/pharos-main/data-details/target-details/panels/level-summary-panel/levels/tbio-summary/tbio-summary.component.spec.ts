import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbioSummaryComponent } from './tbio-summary.component';

describe('TbioSummaryComponent', () => {
  let component: TbioSummaryComponent;
  let fixture: ComponentFixture<TbioSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbioSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbioSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
