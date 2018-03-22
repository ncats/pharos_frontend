import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pharos-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  routeParams: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route);
    this.routeParams = this.route.snapshot;
  }

}
