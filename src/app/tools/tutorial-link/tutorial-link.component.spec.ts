import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialLinkComponent } from './tutorial-link.component';

describe('TutorialLinkComponent', () => {
  let component: TutorialLinkComponent;
  let fixture: ComponentFixture<TutorialLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
