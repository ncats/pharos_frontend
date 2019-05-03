import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'ncats-anatomogram-image',
  templateUrl: './anatomogram-image.component.html',
  styleUrls: ['./anatomogram-image.component.css']
})
export class AnatomogramImageComponent implements OnInit {
  @ViewChild('anatamogram') anatamogram: ElementRef;
  @Input() species: string;
  @Input() details: string;
  @Input() tissues: string[];
  imageUrl: string;
  zoom;
  svg;
  hovered: string;

  constructor() {
  }

  ngOnInit() {
    this.imageUrl = `./assets/images/svgs/${this.species}.${this.details}.svg`;
    d3.xml(this.imageUrl).then(data => {
      d3.select(this.anatamogram.nativeElement).node().append(data.documentElement);
      this.svg = d3.select('#anatamogram');

      const zoom = () => {
        this.svg.select('#anatamogram-holder').attr('transform', d3.event.transform);
      };

      this.zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', zoom);

      this.tissues.forEach(tissue => d3.select(`#${tissue}`).selectAll('path')
        .on('mouseover', (d, i, f) => d3.select(f[i].parentNode).selectAll('path')
          .style('stroke', 'rgba(255, 178, 89, 1')
          .style('stroke-width', '.5')
          .style('fill', 'rgba(255, 178, 89, 1')
        )

        .on('mouseout', (d, i, f) => d3.select(f[i].parentNode).selectAll('path')
          .style('stroke', 'rgba(35, 54, 78, .4')
          .style('stroke-width', '.5')
          .style('fill', 'rgba(35, 54, 78, .4'))
        .style('stroke', 'rgba(35, 54, 78, .4')

        .style('stroke', 'rgba(35, 54, 78, .4')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(35, 54, 78, .4'));


      d3.select('#anatamogram')
        .style('pointer-events', 'all')
        .call(this.zoom);
    });

  }

  resetZoom() {
    const holder = this.svg.select('#anatamogram-holder');
    if (holder) {
      holder
        .transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity);
    }
  }

  highlightTissue(tissue?: string) {
    if (tissue) {
      this.svg.select(`#${tissue}`).selectAll('path')
        .style('stroke', 'rgba(255, 178, 89, 1')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(255, 178, 89, 1');
    } else {
      this.svg.select(`#${this.hovered}`).selectAll('path')
        .style('stroke', 'rgba(35, 54, 78, .4')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(35, 54, 78, .4');
    }
    this.hovered = tissue;
  }

}
