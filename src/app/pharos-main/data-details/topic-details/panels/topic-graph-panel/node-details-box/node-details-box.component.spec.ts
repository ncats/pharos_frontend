import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsBoxComponent } from './node-details-box.component';
import {SharedDetailsModule} from '../../../../../../shared/shared-details.module';
import {TargetCardComponent} from '../../../../../data-list/cards/target-card/target-card.component';

describe('NodeDetailsBoxComponent', () => {
  let component: NodeDetailsBoxComponent;
  let fixture: ComponentFixture<NodeDetailsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TargetCardComponent,
        NodeDetailsBoxComponent
      ],
      imports: [
        SharedDetailsModule
      ]
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
