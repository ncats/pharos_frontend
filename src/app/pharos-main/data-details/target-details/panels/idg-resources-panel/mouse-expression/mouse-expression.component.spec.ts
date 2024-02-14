import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseExpressionComponent } from './mouse-expression.component';
import {AnatomogramHoverService} from '../../../../../../tools/anatomogram/anatomogram-hover.service';
import * as test_data from '../../../../../../../../test/test-data-sources';
import {Observable} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MouseExpressionComponent', () => {
  let component: MouseExpressionComponent;
  let fixture: ComponentFixture<MouseExpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          BrowserAnimationsModule
      ],
      providers: [
        AnatomogramHoverService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseExpressionComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.mouseExpressions = [test_data.TEST_RESOURCE_MOUSE_IMAGING1, test_data.TEST_RESOURCE_MOUSE_IMAGING2];
    component.mouseExpressionUpdates = new Observable<void>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
