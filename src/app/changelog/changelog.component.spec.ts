import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangelogComponent } from './changelog.component';
import {MarkdownModule} from 'ngx-markdown';

describe('ChangelogComponent', () => {
  let component: ChangelogComponent;
  let fixture: ComponentFixture<ChangelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          MarkdownModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
