import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TchemViewerComponent } from './tchem-viewer.component';

describe('TchemViewerComponent', () => {
  let component: TchemViewerComponent;
  let fixture: ComponentFixture<TchemViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TchemViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TchemViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
