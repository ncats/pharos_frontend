import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdarkViewerComponent } from './tdark-viewer.component';

describe('TdarkViewerComponent', () => {
  let component: TdarkViewerComponent;
  let fixture: ComponentFixture<TdarkViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdarkViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdarkViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
