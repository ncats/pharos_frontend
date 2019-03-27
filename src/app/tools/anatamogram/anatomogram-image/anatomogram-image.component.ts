import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {HttpClient} from "@angular/common/http";
import {text} from "@angular/core/src/render3";


@Component({
  selector: 'ncats-anatomogram-image',
  templateUrl: './anatomogram-image.component.html',
  styleUrls: ['./anatomogram-image.component.css']
})
export class AnatomogramImageComponent implements OnInit {
  @ViewChild('anatamogram') anatamogram: ElementRef;
  @Input() species: string;

  @Input() details: string;

  imageUrl: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.imageUrl = `./assets/images/svgs/homo_sapiens.male.svg`;
    console.log(this);
    const svg = d3.select(this.anatamogram.nativeElement).select('svg');
    console.log(svg);
    console.log(svg.classList);
    this.http.get(this.imageUrl, {responseType: 'text'}).subscribe(res => console.log(res))
  }
}
