import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

/**
 * Component to track the hierarchy of a target
 */
@Component({
  selector: 'pharos-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent extends DynamicPanelComponent implements OnInit {
  /**
   * Target, used to display the name
   */
  @Input() target: Target;

  /**
   * string array of current links based on the url
   */
  links: any[] = [];

  /**
   * object to hold path data. prevents bad links
   */
  path: any;

  /**
   * uses {ActivatedRoute} path to populate links
   * @param {ActivatedRoute} route
   */
  constructor(private route: ActivatedRoute,
              public navSectionsService: NavSectionsService) {
  super(navSectionsService);
  }

  /**
   * Build array of links based on current url path
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.path = this.route.snapshot.data.path;
        this.target = this.data.targets;
        if (this.target && this.target.pantherClass) {
          this.links = this.target.pantherClass;
        }

        if (this.target && this.target.pantherPath) {
          this.links = this.target.pantherPath;
        }

        if (this.target && this.target.dto) {
          this.links = this.target.dto;
        }
      });
  }

}
