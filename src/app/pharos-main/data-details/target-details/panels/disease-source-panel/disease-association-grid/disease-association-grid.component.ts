import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DiseaseAssociation} from '../../../../../../models/disease-association';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {
  PropertyDisplayComponent
} from '../../../../../../tools/generic-table/components/property-display/property-display.component';
import {MatCardSubtitle} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {DiseaseAssociationComponent} from '../disease-association/disease-association.component';

@Component({
  standalone: true,
  imports: [CommonModule,
    PropertyDisplayComponent,
    MatCardSubtitle, DiseaseAssociationComponent
  ],
  selector: 'pharos-disease-association-grid',
  templateUrl: './disease-association-grid.component.html',
  styleUrls: ['./disease-association-grid.component.scss']
})
export class DiseaseAssociationGridComponent implements OnInit, OnDestroy {

  protected _associations = new BehaviorSubject<any>({});
  protected ngUnsubscribe: Subject<any> = new Subject();

  @Input()
  set associations(value: any) {
    if (value.data) {
      this._associations.next(value.data);
    } else {
      this._associations.next(value);
    }
  }

  get associations() {
    return this._associations.getValue();
  }

  drugs: DiseaseAssociation[];
  nonDrugs: DiseaseAssociation[];

  @Input() apiSources: any[];

  drugType = 'DrugCentral Indication';
  constructor() { }

  ngOnInit(): void {
    this._associations
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.nonDrugs = this.associations.filter(assoc => {
          return assoc.type !== this.drugType;
        });
        this.drugs = this.associations.filter(assoc => {
          return assoc.type === this.drugType;
        });
      });
  }

    ngOnDestroy() {
      this.ngUnsubscribe.next(true);
      this.ngUnsubscribe.complete();
    }
}
