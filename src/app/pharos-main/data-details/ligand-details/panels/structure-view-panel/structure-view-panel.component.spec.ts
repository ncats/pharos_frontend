import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureViewPanelComponent } from './structure-view-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {PharosProperty} from '../../../../../models/pharos-property';

describe('StructureViewPanelComponent', () => {
  let component: StructureViewPanelComponent;
  let fixture: ComponentFixture<StructureViewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureViewPanelComponent ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureViewPanelComponent);
    component = fixture.componentInstance;
    component.data = new PharosProperty({term: 'c1ccc2CCCc2c1'});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
