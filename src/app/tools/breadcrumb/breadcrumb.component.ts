import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from "rxjs/index";

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
  protected _data = new BehaviorSubject<any>({});

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
  get data() {
    return this._data.getValue();
  }

  /**
   * string array of current links based o nthe url
   */
  links: string[];

  /**
   * uses {ActivatedRoute} path to populate links
   * @param {ActivatedRoute} route
   */
  constructor(private route: ActivatedRoute) { }

  /**
   * Build array of links based on current url path
   */
  ngOnInit() {
    console.log(this);
    this._data.subscribe(x => {
      this.links = [];
      this.links.push(this.route.snapshot.data.path);
    })
  }

  /**
   * Checks to see if a displayed link is the current one and returns the disabled class, blocking navigation
   * @param link
   * @return {string}
   */
  isCurrent(link): string {
    if (link) {
      return (this.links.includes(link.toLowerCase()) ? 'disabled' : null);
    }
  }

}
