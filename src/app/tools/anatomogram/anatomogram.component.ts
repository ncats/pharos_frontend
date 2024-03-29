import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AnatomogramImageComponent} from './anatomogram-image/anatomogram-image.component';
import {AnatomogramHoverService} from './anatomogram-hover.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatRadioChange, MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * anatomogram viewer, passes paramaters to various images based on the svg urls
 */
@Component({
  standalone: true,
  imports: [AnatomogramImageComponent, MatRadioGroup, MatRadioModule, MatButtonModule, CommonModule, FlexLayoutModule],
  selector: 'pharos-anatomogram',
  templateUrl: './anatomogram.component.html',
  styleUrls: ['./anatomogram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnatomogramComponent implements OnInit, OnDestroy {

  /**
   * import hover service
   * @param {AnatomogramHoverService} anatomogramHoverService
   * @param changeRef
   */
  constructor(
    private anatomogramHoverService: AnatomogramHoverService,
    private changeRef: ChangeDetectorRef
  ) { }
  protected ngUnsubscribe: Subject<any> = new Subject();
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
  @Input() shadingKey: string;
  @Input() shadingMap: Map<string, Map<string, number>>;
  @Input() redrawAnatomogram: Subject<boolean> = new Subject<boolean>();

  @Input() clickHandler;

  /**
   * View Children gives each instance of the anatomogram image to allow changes in highlighting to happen
   * in the parent component
   */
  @ViewChildren(AnatomogramImageComponent) anatomograms: QueryList<AnatomogramImageComponent>;
  handleClicks(event){
    if (this.clickHandler){
      this.clickHandler(event, 'anatomogram');
    }
  }

  /**
   * subscribe to changes in hovered tisse, iterate over all image instances, and apply changes
   */
  ngOnInit() {
    this.anatomogramHoverService.tissues$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
      this.anatomograms.forEach(instance => instance.highlightTissue(change));
    });
  }

  /**
   * switch the view between the brain and full body
   * @param {MatRadioChange} change
   */
  toggleView(change: MatRadioChange) {
    this.details = change.value;
    this.changeRef.markForCheck();
  }

  /**
   * reset the zoom level in each anatomogram instance
   */
  reset() {
    this.anatomograms.forEach(instance => instance.resetZoom());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
