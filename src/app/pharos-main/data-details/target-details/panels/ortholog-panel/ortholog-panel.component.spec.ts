import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthologPanelComponent } from './ortholog-panel.component';

describe('OrthologPanelComponent', () => {
  let component: OrthologPanelComponent;
  let fixture: ComponentFixture<OrthologPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthologPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthologPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
