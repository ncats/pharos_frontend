import {Injectable} from '@angular/core';
import {NavSectionsService} from '../tools/sidenav-panel/services/nav-sections.service';
import {Location, ViewportScroller} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DynamicServicesService {
  constructor(
    public navSectionsService: NavSectionsService,
    public viewportScroller: ViewportScroller,
    public location: Location,
    public route: ActivatedRoute) {
  }
}
