import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AlignmentDataOptions,
  SequenceAlignmentsComponent
} from '../../../tools/visualizations/sequence-alignments/sequence-alignments.component';
import {FieldSelectionDialogComponent} from '../../../tools/field-selection-dialog/field-selection-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
    private changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private dialog: MatDialog,
  ) {
    super(dynamicServices);
  }
  sequence: string;
  results: any[];
  alignmentPlotOptions: AlignmentDataOptions = {
    labelClick: this.labelClick.bind(this)
  };

  labelClick(event) {
    const url = this._router.serializeUrl(
      this._router.createUrlTree([`/targets/${event.preferredSymbol}`], {fragment: 'sequence'})
    );
    window.open(url, '_blank');
  }

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.results = [];
        this.sequence = this._route.snapshot.queryParamMap.get('sequence');
        this.runBlast();
      });
  }

  runBlast() {
    if(this.sequence && this.sequence.length > 0) {
      this.pharosApiService.runBlastpSearch(this._route.snapshot, this.sequence)
        .then((results: any) => {
          this.results = results.data.alignments;
          this.loadingComplete();
          this.changeDetectorRef.detectChanges();
          this.sequenceAlignmentsComponent.redraw();
        }).catch(err => {
          err;
        });
    } else {
      this.loadingComplete();
    }
  }

  downloadData() {
    const dialogRef = this.dialog.open(FieldSelectionDialogComponent, {
      data: {count: this.data.count, model: 'Target', route: this._route, defaultSubset: 'Sequence Search Results'},
      height: '75vh', width: '66vw'
    }).afterClosed();
  }
}
