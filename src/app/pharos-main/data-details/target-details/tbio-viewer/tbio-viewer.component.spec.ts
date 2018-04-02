import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbioViewerComponent } from './tbio-viewer.component';

describe('TbioViewerComponent', () => {
  let component: TbioViewerComponent;
  let fixture: ComponentFixture<TbioViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbioViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbioViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
