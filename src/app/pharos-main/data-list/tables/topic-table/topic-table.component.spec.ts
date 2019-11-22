import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTableComponent } from './topic-table.component';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopicCardComponent} from '../../cards/topic-card/topic-card.component';
import {SharedModule} from '../../../../shared/shared.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../../../test/firestore-stub';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';

describe('TopicTableComponent', () => {
  let component: TopicTableComponent;
  let fixture: ComponentFixture<TopicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],

      declarations: [
        TopicCardComponent,
        TopicTableComponent
      ],
      providers: [
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
