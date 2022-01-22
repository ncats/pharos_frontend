import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {ActivatedRoute} from '@angular/router';
import {SequenceAlignmentsComponent} from '../../../tools/visualizations/sequence-alignments/sequence-alignments.component';

@Component({
  selector: 'pharos-sequence-search',
  templateUrl: './sequence-search.component.html',
  styleUrls: ['./sequence-search.component.scss']
})
export class SequenceSearchComponent extends DynamicPanelComponent implements OnInit {

  @ViewChild('sequenceViewer', {static: true}) sequenceAlignmentsComponent: SequenceAlignmentsComponent;

  constructor(
    public dynamicServices: DynamicServicesService,
    private pharosApiService: PharosApiService,
    private _route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(dynamicServices);
  }
  sequence: string;
  results: any;

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.sequence = this._route.snapshot.queryParamMap.get('sequence');
        this.runBlast();
      });
  }

  runBlast() {
    if(this.sequence && this.sequence.length > 0) {
      const variables = {sequence: this.sequence};
      this.pharosApiService.adHocQuery(this.pharosApiService.blastpSearch(), variables).toPromise().then((results: any) => {
        this.results = results.data.alignments;
        this.loadingComplete();
        this.changeDetectorRef.detectChanges();
        this.sequenceAlignmentsComponent.redraw();
      }).catch(err => {
        err;
      });
    }
  }
}
