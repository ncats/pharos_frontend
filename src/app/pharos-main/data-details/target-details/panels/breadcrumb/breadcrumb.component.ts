import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/index';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';

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
  links: any[];

  /**
   * object to hold path data. prevents bad links
   */
  path: any;

  /**
   * uses {ActivatedRoute} path to populate links
   * @param {ActivatedRoute} route
   */
  constructor(private route: ActivatedRoute) {
  super();
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
        if (this.target.pantherClass) {
          this.links = this.target.pantherClass;
        }

        if (this.target.pantherPath) {
          this.links = this.target.pantherPath;
        }

        if (this.target.dto) {
          this.links = this.target.dto;
        }
        //  this.targetProps = this.data.targetsProps;


//    this.path = {term: pt, label: pt};
        /*this._data.subscribe(x => {
          if (this.data) {
            if (this.data.dto && this.data.dto.length > 0) {
              this.links = this.data.dto.sort((a, b) => b.label < a.label);
            } else if (this.data.breadcrumb && this.data.breadcrumb.length > 0) {
              this.links = this.data.breadcrumb.sort((a, b) => b.label < a.label);
            }
          }
        });*/
      });
  }

  /**
   * navigate to url, using link the same way facets are used
   * @param link
   */
  goTo(link: any): void {
    console.log(link);
   // this.pathResolverService.mapSelection({name: link.label, change: {added: [link.term]}});
   // this.pathResolverService.navigate(this.route.snapshot.data.path);
}

}
