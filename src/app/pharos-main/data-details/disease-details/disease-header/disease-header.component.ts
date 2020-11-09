import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Disease} from '../../../../models/disease';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {UnfurlingMetaService} from "../../../../pharos-services/unfurling-meta.service";
import {NavSectionsService} from "../../../../tools/sidenav-panel/services/nav-sections.service";

/**
 * header component for disease details page display
 */
@Component({
  selector: 'pharos-disease-header',
  templateUrl: './disease-header.component.html',
  styleUrls: ['./disease-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DiseaseHeaderComponent extends DynamicPanelComponent implements OnInit  {
  /**
   * disease object
   */
  @Input() disease: Disease;
  @Input() data: any;

  /**
   * no args constructor
   * call super object constructor
   */
  constructor(
    private changeRef: ChangeDetectorRef,
    private metaService: UnfurlingMetaService,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
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

        let newDescription = this.disease.doDescription || this.disease.uniprotDescription;
        let newTitle = `Pharos: ${this.disease.name} (${this.disease.targetCountsTotal} associated targets)`;
        this.metaService.setMetaData({description: newDescription, title: newTitle});

        this.changeRef.markForCheck();
      });
  }

}
