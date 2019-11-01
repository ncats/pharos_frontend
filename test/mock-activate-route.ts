import {of, from} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

export class MockActivatedRoute {
  // here you can add your mock objects, like snapshot or parent or whatever
  // example:

    snapshot: {
      data: {
        results: {
          count: 666,
          targets: [{}],
          targetsProps: {}
        },
        components: [{}],
        data: { data: 'myTitle ',
          components: [{}],
        }
        pharosObject: {}
      }
    };
    routeConfig: { children: { filter: () => {} } };
}
