import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TopicCardComponent} from './topic-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../../../../app-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {SuggestApiService} from '../../../../tools/search-component/suggest-api.service';
import {APP_BASE_HREF} from '@angular/common';
import {Topic} from '../../../../models/topic';
import {RouterTestingModule} from '@angular/router/testing';

describe('TopicCardComponent', () => {
  let component: TopicCardComponent;
  let fixture: ComponentFixture<TopicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        RouterTestingModule
      ],
      declarations: [
        TopicCardComponent
      ],
      providers: [
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCardComponent);
    component = fixture.componentInstance;
    const top: Topic = new Topic();
    /*top = {
      name: 'Bromodomain Inhibitors',
      class: 'target',
      diseaseCt: 45,
      ligandCt: 43,
      targetCt: 0,
      publicationCt: 25
    }*/
  //  component.toi = top;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
