import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'pharos-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  links: string[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.links = [];
    this.links.push(this.route.snapshot.data.path);
  }

  isCurrent(link): string {
    if(link) {
      return (this.links.includes(link.toLowerCase()) ? 'disabled' : null);
    }
  }

}
