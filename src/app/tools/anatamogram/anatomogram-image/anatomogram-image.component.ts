import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {HttpClient} from "@angular/common/http";


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
    this.imageUrl = `./assets/images/svgs/homo_sapiens.${this.details}.svg`;
    console.log(this);
    d3.xml(this.imageUrl).then(data => {
      d3.select(this.anatamogram.nativeElement).node().append(data.documentElement);
      //this.anatamogram.nativeElement.node()a
   //   style="width:100%;height:auto;padding-left:10px"
      d3.select("#UBERON_0000029").selectAll('path').style('fill', 'green');
    })

  }
}
