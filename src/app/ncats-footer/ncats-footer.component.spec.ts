import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsFooterComponent } from './ncats-footer.component';

describe('NcatsFooterComponent', () => {
  let component: NcatsFooterComponent;
  let fixture: ComponentFixture<NcatsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
