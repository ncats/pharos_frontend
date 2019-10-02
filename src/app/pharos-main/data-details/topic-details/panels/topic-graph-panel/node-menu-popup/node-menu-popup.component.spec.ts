import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeMenuPopupComponent } from './node-menu-popup.component';
import {SharedModule} from '../../../../../../shared/shared.module';

describe('NodeMenuPopupComponent', () => {
  let component: NodeMenuPopupComponent;
  let fixture: ComponentFixture<NodeMenuPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeMenuPopupComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeMenuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
