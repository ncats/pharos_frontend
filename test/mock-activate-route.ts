import {of, from, BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TESTTARGET, TESTTARGETPROPS} from './test-target';

export const MOCKACTIVATEDROUTE = {
  // here you can add your mock objects, like snapshot or parent or whatever
  // example:
  fragment: new BehaviorSubject({ foo: 'bar' }),
    snapshot: {
      fragment: new BehaviorSubject({ foo: 'bar' }),
      queryParamMap: new Map([
        ["associatedDisease","benign ependymoma"]
      ]),
      data: {
        results: {
          count: 666,
          targets: [TESTTARGET],
          targetsProps: TESTTARGETPROPS
        },
        components: [],
        data: { data: 'myTitle ',
          components: [{}],
        },
        pharosObject: {}
      }
    },
    routeConfig: { children: { filter: () => {} } }
};
