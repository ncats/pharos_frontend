import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetRelevancePanelComponent } from './target-relevance-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('TargetRelevancePanelComponent', () => {
  let component: TargetRelevancePanelComponent;
  let fixture: ComponentFixture<TargetRelevancePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetRelevancePanelComponent ],
      imports: [
        SharedModule,
        GenericTableModule,
        BrowserAnimationsModule,
        ApolloTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetRelevancePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
