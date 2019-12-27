import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import {AnatomogramImageComponent} from './anatomogram-image/anatomogram-image.component';
import {AnatamogramHoverService} from './anatamogram-hover.service';

/**
 * anatamabram viewer, passes paramaters to various images based on the svg urls
 */
@Component({
  selector: 'pharos-anatamogram',
  templateUrl: './anatamogram.component.html',
  styleUrls: ['./anatamogram.component.scss']
})

export class AnatamogramComponent implements OnInit {
  /**
   * species selected to dispaly, defaults to human, mouse is the other option
   * @type {string}
   */
  @Input() species = 'homo_sapiens';

  /**
   * string to track whether to shoow the full body, or just the brain. full body is set by default
   */
  details: string;

  /**
   * list of tissues to be modified. currently jsut strings
   * todo expand to tissue, label and value object
   */
  @Input() tissues: string[];

  /**
   * View Children gives each instance of the anatamogram image to allow changes in highlighting to happen
   * in the parent component
   */
  @ViewChildren(AnatomogramImageComponent) anatamograms: QueryList<AnatomogramImageComponent>;


  /**
   * import hover service
   * @param {AnatamogramHoverService} anatamogramHoverService
   */
  constructor(
    private anatamogramHoverService: AnatamogramHoverService
  ) { }

  /**
   * subscribe to changes in hovered tisse, iterate over all image instances, and apply changes
   */
  ngOnInit() {
    this.anatamogramHoverService.tissues$.subscribe(change => {
      this.anatamograms.forEach(instance => instance.highlightTissue(change));
    });
  }

  /**
   * switch the view between the brain and full body
   * @param {MatRadioChange} change
   */
  toggleView(change: MatRadioChange) {
    this.details = change.value;

  }

  /**
   * reset the zoom level in each anatamogram instance
   */
  reset() {
    this.anatamograms.forEach(instance => instance.resetZoom());
  }
}
