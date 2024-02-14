import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PharosProperty} from '../../../../../../models/pharos-property';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {LigandSerializer} from '../../../../../../models/ligand';
import { MatTableDataSource } from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {IdgLevelIndicatorComponent} from '../../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {GenericTableComponent} from '../../../../../../tools/generic-table/generic-table.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIcon} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatExpansionModule, MatAccordion, IdgLevelIndicatorComponent,
    GenericTableComponent, RouterModule, FlexLayoutModule, MatIcon],
  selector: 'pharos-target-relevance-table',
  templateUrl: './target-relevance-table.component.html',
  styleUrls: ['./target-relevance-table.component.scss']
})
export class TargetRelevanceTableComponent implements OnInit, OnDestroy {

  @Input() activitiesTargetDataSource = new MatTableDataSource<any>();
  @Input() singlePair = false;

  protected ngUnsubscribe: Subject<any> = new Subject();

  /**
   * initialize a private variable _data, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _rawData = new BehaviorSubject<any>({});

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set rawData(value: any) {
    if (value.rawData) {
      this._rawData.next(value.rawData);
    } else {
      this._rawData.next(value);
    }
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get rawData() {
    return this._rawData.getValue();
  }

  /**
   * table config fields
   * @type {PharosProperty[]}
   */
  fields: PharosProperty[] = [
    /*    new PharosProperty( {
          name: 'target.symbol',
          label: 'IDG Target',
          sortable: true
        }),
        new PharosProperty( {
          name: 'target.idgTdl',
          label: 'IDG Development Level',
          sortable: true,
          customComponent: IDG_LEVEL_TOKEN
        }),
        new PharosProperty({
          name: 'targetFamily',
          label: 'Target Family',
          sortable: true
        }),*/
    new PharosProperty({
      name: 'type',
      label: 'Activity Type'
    }),
    new PharosProperty({
      name: 'value',
      label: 'Activity Value -log(M)'
    }),
    new PharosProperty({
      name: 'moa',
      label: 'Mechanism of Action'
    }),
    new PharosProperty({
      name: 'reference',
      label: 'Activity Reference'
    }),
    new PharosProperty({
      name: 'pmids',
      label: 'Publications (PubMed IDs)'
    })
  ];

  constructor() { }

  ngOnInit(): void {
    this._rawData
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        if (this.rawData.length > 0) {
          this.activitiesTargetDataSource = new MatTableDataSource<any>();
          const serializer = new LigandSerializer();
          const ligand = serializer.fromJson({activities: this.rawData});
          this.activitiesTargetDataSource.data = serializer._asProperties(ligand).activities;
        }
      });
  }

  /**
   * clean up on leaving component
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
