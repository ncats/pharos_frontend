import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';

@Component({
  selector: 'pharos-ortholog-variants',
  templateUrl: './ortholog-variants.component.html',
  styleUrls: ['./ortholog-variants.component.scss']
})
export class OrthologVariantsComponent extends DynamicPanelComponent implements OnInit {
  /**
   * target to display
   */
  @Input() target: Target;

  constructor(
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets || this.target;

        if (this.hasSequenceInfo()) {
          this.showSection();
        } else {
          this.hideSection();
        }

        this.loadingComplete();
      });
  }

  hasSequenceInfo() {
    return this.target && (this.target.sequenceVariants || (this.target.sequenceAnnotations && this.target.sequenceAnnotations.length > 0));
  }
}
