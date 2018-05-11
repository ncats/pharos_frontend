import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
    this.links = [];
    this.links.push(this.route.snapshot.data.path);
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
