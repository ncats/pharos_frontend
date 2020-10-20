import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactomePathwayBrowserComponent } from './reactome-pathway-browser.component';

describe('ReactomePathwayBrowserComponent', () => {
  let component: ReactomePathwayBrowserComponent;
  let fixture: ComponentFixture<ReactomePathwayBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactomePathwayBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactomePathwayBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
