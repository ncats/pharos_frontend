import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Facet} from '../../../../../models/facet';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {ComponentHeaderComponent} from '../../../../../tools/component-header/component-header.component';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollspyDirective} from '../../../../../tools/sidenav-panel/directives/scrollspy.directive';
import {MatTooltipModule} from '@angular/material/tooltip';

/**
 * Component to track the hierarchy of a target
 */
@Component({
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatTooltipModule, RouterModule, ComponentHeaderComponent, ScrollspyDirective
  ],
  selector: 'pharos-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent extends DynamicPanelComponent implements OnInit {
  /**
   * Target, used to display the name
   */
  @Input() target: Target;
  Facet = Facet;
  /**
   * string array of current links based on the url
   */
  dtoLinks: any[] = [];
  pcLinks: string[][] = [];

  /**
   * object to hold path data. prevents bad links
   */
  path: any;

  /**
   * uses {ActivatedRoute} path to populate links
   * @param {ActivatedRoute} route
   */
  constructor(private route: ActivatedRoute,
              public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  /**
   * Build array of links based on current url path
   */
  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.path = this.route.snapshot.data.path;
        this.target = this.data.targets;

        this.pcLinks = [];
        this.dtoLinks = [];
        if (this.target) {
          if ((this.target.pantherClasses.length > 0 || this.target.dto.length > 0)) {
            this.showSection();
            this.initialize();
          } else {
            this.hideSection();
          }
        }
      });
  }

  initialize() {
    if (this.target.pantherClasses) {
      this.pcLinks = [];
      this.target.pantherClasses.forEach(pc => {
        this.pcLinks.push(...pc.getPaths());
      });
    }
    if (this.target.dto) {
      this.dtoLinks = this.target.dto;
    }
  }
}
