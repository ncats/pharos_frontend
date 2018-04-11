import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TclinViewerComponent } from './tclin-viewer.component';

describe('TclinViewerComponent', () => {
  let component: TclinViewerComponent;
  let fixture: ComponentFixture<TclinViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TclinViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TclinViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
