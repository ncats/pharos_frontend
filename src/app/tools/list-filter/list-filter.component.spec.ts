import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as test_data from '../../../../test/test-data-sources';
import { ListFilterComponent } from './list-filter.component';
import {Observable} from 'rxjs';
import {PageData} from '../../models/page-data';
import {BaseResource} from '../../models/idg-resources/base-resource';
import { PageEvent } from '@angular/material/paginator';

describe('ListFilterComponent', () => {
  let component: ListFilterComponent;
  let fixture: ComponentFixture<ListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterComponent);
    component = fixture.componentInstance;
    component.fullList = [test_data.TEST_RESOURCE_CELL1, test_data.TEST_RESOURCE_CELL2, test_data.TEST_RESOURCE_MOUSE1];
    component.fullListUpdates = new Observable<void>();
    component.visibleList = [];
    component.pageData = new PageData({top: 10, skip: 0, total: component.fullList.length, count: 10});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.visibleList.length > 0).toBeTruthy();
  });

  it('should update visibleList', () => {
    expect(component.visibleList.length === component.fullList.length).toBeTruthy();
  });

  it('should figure out the types', () => {
    expect(component.types.length === 2).toBeTruthy();
  });

  it('should filter based on selection', () => {
    expect(component.visibleList.length === 3).toBeTruthy();
    const change = ['Mouse'];
    component.filterValueChanged(change);
    fixture.detectChanges();
    expect(component.visibleList.length === 1).toBeTruthy();
  });

  it('should paginate', () => {
    component.pageData.top = 1;
    component.sliceFilteredList();
    expect(component.visibleList.length === 1).toBeTruthy();
    const first: BaseResource = component.visibleList[0];
    const event = new PageEvent();
    event.pageIndex = 1;
    event.pageSize = 1;
    component.paginate(event);
    expect(component.visibleList.length === 1).toBeTruthy();
    const second: BaseResource = component.visibleList[0];
    expect(first === component.fullList[0]).toBeTruthy();
    expect(second === component.fullList[1]).toBeTruthy();
    expect(first === second).toBeFalsy();
  });

});
