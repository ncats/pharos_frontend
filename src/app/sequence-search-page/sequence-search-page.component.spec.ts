import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSearchPageComponent } from './sequence-search-page.component';

describe('SequenceSearchPageComponent', () => {
  let component: SequenceSearchPageComponent;
  let fixture: ComponentFixture<SequenceSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
