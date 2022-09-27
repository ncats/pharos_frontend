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
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.disease = this.data.diseases;

        const newDescription = this.disease.mondoDescription || this.disease.doDescription || this.disease.uniprotDescription;
        const newTitle = `Pharos: ${this.disease.name} (${this.disease.targetCountsTotal || this.disease.associationCount} associated targets)`;
        this.metaService.setMetaData({description: newDescription, title: newTitle});

        this.changeRef.markForCheck();
      });
  }
  trimZeros(term) {
    return term.replace(/^0+/, '');
  }
  getExternalLink(id: {name: string, id: string}) {
    const pieces = id.id.split(':');
    const format = pieces[0];
    const term = pieces[1];

    switch (format) {
      case 'UMLS':
        return `http://linkedlifedata.com/resource/umls/id/${term}`;
      case 'DOID':
      case 'NCIT':
        return `http://purl.obolibrary.org/obo/${format}_${term}`;
      case 'SCTID':
        return `https://snomedbrowser.com/Codes/Details/${term}`;
      case 'OMIM':
      case 'OMIMPS':
        return `https://omim.org/entry/${term}`;
      case 'MESH':
        return `https://meshb-prev.nlm.nih.gov/record/ui?ui=${term}`;
      case 'GARD':
        return `https://rarediseases.info.nih.gov/diseases/${this.trimZeros(term)}/origin_pharos`;
      case 'EFO':
        return `http://www.ebi.ac.uk/efo/${format}_${term}`;
      case 'Wikidata':
        return `https://www.wikidata.org/wiki/${term}`;
    }
    return null;
  }

}
