import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTableComponent } from './topic-table.component';
import {SharedModule} from "../../shared/shared.module";
import {Topic} from "../../models/topic";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TopicTableComponent', () => {
  let component: TopicTableComponent;
  let fixture: ComponentFixture<TopicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],

      declarations: [ TopicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTableComponent);
    component = fixture.componentInstance;
    component.data = [new Topic({name: "sdfsdf", description: 'sdfgsdfsdf'})];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
