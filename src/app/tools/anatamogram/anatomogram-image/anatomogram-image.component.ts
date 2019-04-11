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
    this.imageUrl = `./assets/images/svgs/homo_sapiens.male.svg`;
    console.log(this);
    const svg = d3.select(this.anatamogram.nativeElement).select('svg');
    console.log(svg);
    console.log(svg.classList);

    d3.xml(this.imageUrl).then(data => {
      console.log(data.documentElement);
      d3.select(this.anatamogram.nativeElement).node().append(data.documentElement)
     // console.log(svg);
      console.log("appending");
    }).then(() => {
      console.log("doin stuff");
      d3.select("#UBERON_0000029").selectAll('path').style('fill', 'green');
    //  d3.select("#UBERON_0000029").attr('class', 'filled');
      console.log(d3.select("#UBERON_0000029").node());
      // console.log(d3.selectAll("#UBERON_0000956").node());
    }
  )

/*    this.http.get(this.imageUrl, {responseType: 'text'}).subscribe(res => {
      console.log(res)
      console.log(d3.select("#UBERON_0000956"));
      console.log(d3.select("#UBERON_0000956").node().attribute(":inkscape:label"));

    })*/
  }
}
