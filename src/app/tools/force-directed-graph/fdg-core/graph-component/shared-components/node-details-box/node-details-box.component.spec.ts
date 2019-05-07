import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsBoxComponent } from './node-details-box.component';

describe('NodeDetailsBoxComponent', () => {
  let component: NodeDetailsBoxComponent;
  let fixture: ComponentFixture<NodeDetailsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDetailsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
