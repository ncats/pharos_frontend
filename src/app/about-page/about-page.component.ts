import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pharos-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  activeElement: string = "introduction";
  constructor() { }

  ngOnInit() {
  }

  public scroll(el: any, name: string): void {
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    this.activeElement = name;
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
