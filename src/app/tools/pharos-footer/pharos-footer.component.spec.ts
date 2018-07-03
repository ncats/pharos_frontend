import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosFooterComponent } from './pharos-footer.component';

describe('PharosFooterComponent', () => {
  let component: PharosFooterComponent;
  let fixture: ComponentFixture<PharosFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharosFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
