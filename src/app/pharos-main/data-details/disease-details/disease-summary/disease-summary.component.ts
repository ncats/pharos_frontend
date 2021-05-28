import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Disease} from '../../../../models/disease';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';
import {DynamicServicesService} from '../../../../pharos-services/dynamic-services.service';

/**
 * header component for disease details page display
 */
@Component({
  selector: 'pharos-disease-summary',
  templateUrl: './disease-summary.component.html',
  styleUrls: ['./disease-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiseaseSummaryComponent extends DynamicPanelComponent implements OnInit  {
  /**
   * disease object
   */
  @Input() disease: Disease;

  /**
   * no args constructor
   * call super object constructor
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    private metaService: UnfurlingMetaService,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.disease = this.data.diseases;

        const newDescription = this.disease.doDescription || this.disease.uniprotDescription;
        const newTitle = `Pharos: ${this.disease.name} (${this.disease.targetCountsTotal} associated targets)`;
        this.metaService.setMetaData({description: newDescription, title: newTitle});

        this.changeRef.markForCheck();
      });
  }

}
