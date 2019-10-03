import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationInfoPanelComponent } from './publication-info-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';

describe('PublicationInfoPanelComponent', () => {
  let component: PublicationInfoPanelComponent;
  let fixture: ComponentFixture<PublicationInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PublicationInfoPanelComponent
      ],
      imports: [
        SharedModule,
        GenericTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
