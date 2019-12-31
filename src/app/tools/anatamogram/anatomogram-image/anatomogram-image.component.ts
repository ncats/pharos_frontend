import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

/**
 * holder for different types of anatamogram svgs
 */
@Component({
  selector: 'ncats-anatomogram-image',
  templateUrl: './anatomogram-image.component.html',
  styleUrls: ['./anatomogram-image.component.scss']
})
export class AnatomogramImageComponent implements OnInit {
  /**
   * the html element to inject the svg content into
   */
  @ViewChild('anatamogram', {static: true}) anatamogram: ElementRef;

  /**
   * which species of anatamogram to show
   */
  @Input() species: string;

  /**
   * details to show, mainly between the bran and body, but also male or female
   * since both male and female are shown, they are manually set in the parent component
   */
  @Input() details: string;

  /**
   * list of tissues to highlight
   */
  @Input() tissues: string[];

  /**
   * zoom functino to be set on init, seeting it in scope here allows other methods to call it
   */
  zoom;

  /**
   * svg object from d3
   */
  svg;

  /**
   * id of the tissues that is currently hovered on
   */
  hovered: string;

  id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  /**
   * no args constructor
   */
  constructor() {}

  /**
   * set url and retrieve svg image
   * since the svg is generated externally, the xml needs to be parsed by d3, then injected into the element
   * this allows d3 to interact with the svg
   */
  ngOnInit() {
    const imageUrl = `./assets/images/svgs/${this.species}.${this.details}.svg`;
    d3.xml(imageUrl).then(data => {
      const sss = d3.select(this.anatamogram.nativeElement).node().append(data.documentElement);
      this.svg = d3.select('#anatamogram').attr('id', this.id) ;

      /**
       * zoom function called
       */
      const zoom = () => {
        this.svg.select(`#anatamogram-holder-${this.species}-${this.details}`).attr('transform', d3.event.transform);
      };

      /**
       * set the zoom function on the parent scope
       */
      this.zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', zoom);

      /**
       * iterate over the tissue ids and find them in d3
       * every path in the parent needs to be selected, since the tissues cna be made of multiple paths
       * set mouseover and mouseout funcitons on each tissue to cover selection and hover changes
       */
      this.tissues.forEach(tissue => this.svg.select(`#${tissue}`).selectAll('path')
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

      this.tissues.forEach(tissue => this.svg.select(`#${tissue}`)
        .on('mouseover', (d, i, f) => d3.select(f[i].parentNode)
          .style('stroke', 'rgba(255, 178, 89, 1')
          .style('stroke-width', '.5')
          .style('fill', 'rgba(255, 178, 89, 1')
        )
        .on('mouseout', (d, i, f) => d3.select(f[i].parentNode)
          .style('stroke', 'rgba(35, 54, 78, .4')
          .style('stroke-width', '.5')
          .style('fill', 'rgba(35, 54, 78, .4'))
        .style('stroke', 'rgba(35, 54, 78, .4')

        .style('stroke', 'rgba(35, 54, 78, .4')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(35, 54, 78, .4'));

      /**
       * set pointer events and zoom function
       */
      d3.select('#anatamogram')
        .style('pointer-events', 'all')
        .call(this.zoom);
    });

  }

  /**
   * reset zoom level (can also be called from external components)
   */
  resetZoom() {
    const holder = this.svg.select(`#anatamogram-holder-${this.species}-${this.details}`);
    if (holder) {
      holder
        .transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity);
    }
  }

  /**
   * highlighting function
   * todo could probably be merged with the above one, or called by the initializing function
   * can be called by external components
   * @param {string} tissue
   */
  highlightTissue(tissue?: string) {
    if (tissue) {
      this.svg.select(`#${tissue}`)
        .style('stroke', 'rgba(255, 178, 89, 1')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(255, 178, 89, 1');
      this.svg.select(`#${tissue}`).selectAll('path')
        .style('stroke', 'rgba(255, 178, 89, 1')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(255, 178, 89, 1');
    } else {
      this.svg.select(`#${this.hovered}`)
        .style('stroke', 'rgba(35, 54, 78, .4')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(35, 54, 78, .4');
      this.svg.select(`#${this.hovered}`).selectAll('path')
        .style('stroke', 'rgba(35, 54, 78, .4')
        .style('stroke-width', '.5')
        .style('fill', 'rgba(35, 54, 78, .4');
    }
    this.hovered = tissue;
  }

}
