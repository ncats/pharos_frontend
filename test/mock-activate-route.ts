import {of, from, BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TESTTARGET, TESTTARGETPROPS} from './test-target';

export const MOCKACTIVATEDROUTE = {
  // here you can add your mock objects, like snapshot or parent or whatever
  // example:
  fragment: new BehaviorSubject({ foo: 'bar' }),
    snapshot: {
      fragment: new BehaviorSubject({ foo: 'bar' }),
      queryParamMap: {
        keys: ['associatedDisease'],
        getAll: (key) => ['benign ependymoma'],
        get: (key) => 'benign ependymoma',
        has: (key) => true
      },
      data: {
        path: 'targets',
        results: {
          count: 666,
          targets: [TESTTARGET],
          targetsProps: TESTTARGETPROPS
        },
        components: [],
        data: { data: 'myTitle ',
          components: [{}],
          results: {
            dataSourceCounts: [
              {dataSource: 'CCLE', targetCount: 1881}
            ]
          }
        },
        pharosObject: {}
      }
    },
    routeConfig: { children: { filter: () => {} } }
};
