import {
  Component,
  ElementRef,
  EventEmitter, Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import {Subject} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

/**
 * holder for different types of anatamogram svgs
 */
@Component({
  selector: 'ncats-anatomogram-image',
  templateUrl: './anatomogram-image.component.html',
  styleUrls: ['./anatomogram-image.component.scss']
})
export class AnatomogramImageComponent implements OnInit, OnChanges {
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
  @Input() shadingKey: string;
  @Input() shadingMap: Map<string, Map<string, number>>;

  @Input() redrawAnatamogram: Subject<boolean> = new Subject<boolean>();

  /**
   * event emitter for click events
   * @type {EventEmitter<any>}
   */
  @Output() readonly tissueClick: EventEmitter<any> = new EventEmitter<any>();

  /**
   * zoom function to be set on init, seeting it in scope here allows other methods to call it
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
  default_opacity: number = 0.4;
  max_opacity: number = 0.6;

  id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  /**
   * no args constructor
   */
  constructor(@Inject(PLATFORM_ID) private platformID: Object) {
  }

  /**
   * set url and retrieve svg image
   * since the svg is generated externally, the xml needs to be parsed by d3, then injected into the element
   * this allows d3 to interact with the svg
   */
  ngOnInit() {
    const imageUrl = `./assets/images/svgs/${this.species}.${this.details}.svg`;
    if(isPlatformBrowser(this.platformID)) {
      d3.xml(imageUrl).then(data => {
        d3.select(this.anatamogram.nativeElement).node().append(data.documentElement);
        this.svg = d3.select('#anatamogram').attr('id', this.id);

        /**
         * set the zoom function on the parent scope
         */
        this.zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on('zoom', () => {
            var holder = this.svg.select(`#anatamogram-holder`);
            var zoomFn = this.zoom.on('zoom', function() {
              holder.attr("transform", d3.event.transform);
            });
            this.svg.call(zoomFn);
          });

        /**
         * set pointer events and zoom function
         */
        d3.select(this.anatamogram.nativeElement)
          .style('pointer-events', 'all')
          .call(this.zoom);
        this.updateImage();
      });
    }
    this.redrawAnatamogram.subscribe(response => {
      if (response) {
        this.updateImage();
      }
    });
  }

  normalizedCount = 0;
  normalizeMaps(){
    if(this.tissues.length > this.normalizedCount){
      this.shadingMap.forEach((oneMap) => {
        let maxVal = Math.max(...Array.from(oneMap.values()));
        oneMap.forEach((value, key) => {
            oneMap.set(key, this.max_opacity * value / maxVal)
          }
        );
      });
      this.normalizedCount = this.tissues.length;
    }
  }
  /**
   * iterate over the tissue ids and find them in d3
   * every path in the parent needs to be selected, since the tissues cna be made of multiple paths
   * set mouseover and mouseout funcitons on each tissue to cover selection and hover changes
   */
  updateImage() {
    if (!this.svg) {
      return;
    }
    this.normalizeMaps();
    let shadingMap = this.shadingMap?.get(this.shadingKey);
    this.tissues.forEach(tissue => {
        const opacity = this.getOpacity(tissue);
        this.unhighlight_tissue(this.svg.select(`#${tissue}`).selectAll('path'), tissue)
          .on('mouseover', (d, i, f) => this.highlight_tissue(d3.select(f[i].parentNode).selectAll('path'))
          )
          .on('mouseout', (d, i, f) => this.unhighlight_tissue(d3.select(f[i].parentNode).selectAll('path'), f[i].parentNode.id)
          );
      }
    );
    this.tissues.forEach(tissue => {
        const opacity = this.getOpacity(tissue);
        this.unhighlight_tissue(this.svg.select(`#${tissue}`), tissue)
          .on('click', (d, i, f) => {
            this.tissueClick.emit(tissue);
          }, tissue, this.tissueClick)
          .on('mouseover', (d, i, f) => this.highlight_tissue(d3.select(f[i]))
          )
          .on('mouseout', (d, i, f) => this.unhighlight_tissue(d3.select(f[i]), f[i].id));
      }
    );
  }

  private highlight_tissue(segment: any): any {
    segment
      .style('stroke', 'rgba(255, 178, 89, 1')
      .style('stroke-width', '.5')
      .style('fill', 'rgba(255, 178, 89, 1');
    return segment;
  }

  private unhighlight_tissue(segment: any, tissue: string): any {
    const opacity = this.getOpacity(tissue);
    segment
      .style('stroke', 'rgba(35, 54, 78, ' + opacity)
      .style('stroke-width', '.5')
      .style('fill', 'rgba(35, 54, 78, ' + opacity);
    return segment;
  }

  ngOnChanges(change: any) {
    if (change.tissues && !change.tissues.firstChange) {
      this.updateImage();
    }
  }

  /**
   * reset zoom level (can also be called from external components)
   */
  resetZoom() {
    var holder = this.svg.select(`#anatamogram-holder`);
    holder.transition().duration(750).call(this.zoom.transform, d3.zoomIdentity);
  }

  getOpacity(tissue?: string) {
    let opacity = this.default_opacity;
    if (!tissue) {
      return 0;
    }
    if (this.shadingMap) {
      let shadingMap = this.shadingMap?.get(this.shadingKey);
      opacity = shadingMap?.get(tissue) || 0;
    }
    return opacity;
  }

  /**
   * highlighting function
   * todo could probably be merged with the above one, or called by the initializing function
   * can be called by external components
   * @param {string} tissue
   */
  highlightTissue(tissue?: string) {
    if (tissue) {
      this.highlight_tissue(this.svg.select(`#${tissue}`));
      this.highlight_tissue(this.svg.select(`#${tissue}`).selectAll('path'));
    } else {
      this.unhighlight_tissue(this.svg.select(`#${this.hovered}`), this.hovered);
      this.unhighlight_tissue(this.svg.select(`#${this.hovered}`).selectAll('path'), this.hovered);
    }
    this.hovered = tissue;
  }

}
