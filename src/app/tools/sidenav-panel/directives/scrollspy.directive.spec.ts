import {ScrollspyDirective} from './scrollspy.directive';
import {async, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../shared/shared.module';
import {SidenavPanelComponent} from '../sidenav-panel.component';

describe('ScrollspyDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  }));

  it('should create an instance', () => {
    const directive = new ScrollspyDirective(null, null, null, null);
    directive._intersectionObserver = new IntersectionObserver(() => {});
    expect(directive).toBeTruthy();
  });
});
