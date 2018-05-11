import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkVisualComponent } from './link-visual.component';
import {SettingsService} from "../../../services/settings.service";
import {Link} from "../../../models/link";

describe('LinkVisualComponent', () => {
  let component: LinkVisualComponent;
  let fixture: ComponentFixture<LinkVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkVisualComponent],
      providers: [SettingsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkVisualComponent);
    component = fixture.componentInstance;
    component.link = new Link(0, 0,{});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
