import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from "rxjs/index";
import {PathResolverService} from "../../pharos-services/path-resolver.service";

/**
 * Component to track the hierarchy of a target
 * todo: this needs to be reconfigured, as it should be using the panther protein class for targets
 */
@Component({
  selector: 'pharos-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {

  /**
   * initialize a private variable _data, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _data = new BehaviorSubject<any>(null);

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set data(value: any) {
    this._data.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data(): any {
    return this._data.getValue();
  }

  /**
   * string array of current links based on the url
   */
  links: any[];

  /**
   * uses {ActivatedRoute} path to populate links
   * @param {ActivatedRoute} route
   */
  constructor(private route: ActivatedRoute,
  private pathResolverService: PathResolverService) { }

  /**
   * Build array of links based on current url path
   */
  ngOnInit() {
    this._data.subscribe(x => {
      if(this.data.breadcrumb) {
        const path: string = this.pathResolverService.getPath();
        this.links = [{term: path, label: path}];
        this.links = this.links.concat(this.data.breadcrumb.sort((a, b) =>  b.label < a.label));
      }
    })
  }

  /**
   * navigate to url, using link the same way facets are used
   * @param link
   */
  goTo(link: any): void {
    this.pathResolverService.mapSelection({facet: link.label, fields: [link.term]});
    this.pathResolverService.navigate(this.pathResolverService.getPath());
}

}
