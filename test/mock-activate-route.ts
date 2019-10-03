import {of, from} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

export class MockActivatedRoute {
  // here you can add your mock objects, like snapshot or parent or whatever
  // example:

    snapshot: {
      data: {
        data: { data: 'myTitle ' }
      }
    };
    routeConfig: { children: { filter: () => {} } };
}
