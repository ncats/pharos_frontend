import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseExpressionComponent } from './mouse-expression.component';
import {AnatamogramHoverService} from "../../../../../../tools/anatamogram/anatamogram-hover.service";
import * as test_data from "../../../../../../../../test/test-data-sources";
import {MouseImageData} from "../../../../../../models/idg-resources/data-resource";
import {Observable} from "rxjs";

describe('MouseExpressionComponent', () => {
  let component: MouseExpressionComponent;
  let fixture: ComponentFixture<MouseExpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouseExpressionComponent ],
      providers: [
        AnatamogramHoverService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseExpressionComponent);
    component = fixture.componentInstance;
    component.mouseExpressions = [(test_data.TEST_RESOURCE_MOUSE_IMAGING1 as MouseImageData), (test_data.TEST_RESOURCE_MOUSE_IMAGING2 as MouseImageData)];
    component.mouseExpressionUpdates = new Observable<void>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
