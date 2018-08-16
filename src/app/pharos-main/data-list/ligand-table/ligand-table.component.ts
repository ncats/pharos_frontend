import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';
import {PageData} from '../../../models/page-data';
import {TargetTableComponent} from '../target-table/target-table.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';
import {LigandsPanelComponent} from '../../data-details/target-details/panels/ligands-panel/ligands-panel.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'pharos-ligand-table',
  templateUrl: './ligand-table.component.html',
  styleUrls: ['./ligand-table.component.css']
})
export class LigandTableComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  ligandsMap: Map<string, any> = new Map<string, any>();
  ligandsDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();

  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * page data object set by parent component
   */
  @Input() pageData: PageData;

  private _STRUCTUREURLBASE: string;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private environmentVariablesService: EnvironmentVariablesService,
    private _http: HttpClient) {
    super();
  }

  ngOnInit() {
    this._STRUCTUREURLBASE = this.environmentVariablesService.getStructureImageUrl();
    this._data.subscribe(d => {
      if (this.data) {
        this.setterFunction();
      }
    });
  }

  changeSort($event): void {
    this.sortChange.emit($event);
  }

  changePage($event): void {
    this.pageChange.emit($event);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setterFunction(): void {
    const ligandsArr = [];
    this.data.forEach(ligand => {
        const url = ligand.self ? ligand.self : ligand.href + '?view=full';
        this._http.get<any>(url).subscribe(res => {
          const activity: any = this._getActivity(res);
          const mappedLig = this.ligandsMap.get(res.id);
          if (!mappedLig) {
            // placeholder to block repetitive calls
            this.ligandsMap.set(res.id, {});
          }
          else {
              ligandsArr.push(mappedLig);
              this.ligandsDataSource.data = ligandsArr;
            }
            const refid: string = res.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
            const newLigand = {
              name: res.name,
              refid: refid,
              activityType: this._getActivityType(activity),
              activity: activity.numval,
              imageUrl: this._STRUCTUREURLBASE + refid + '.svg'
            };

            if (ligand.target) {
              newLigand['target'] = ligand.target;
            }
            this.ligandsMap.set(ligand.id, newLigand);
            ligandsArr.push(newLigand);
            this.ligandsDataSource.data = ligandsArr;
        });
    });
  }

  private _getActivity(ligand: any): any {
    console.log(ligand);
    let ret: any = {};
    ligand.properties.map(prop => {
      if (prop.label === 'IC50') {
        ret = prop;
      } else if (prop.label === 'Ligand Activity') {
        ret = ligand.properties.filter(p => p.label === prop.term)[0];
      }
      else {
        ret = {label: 'N/A', numval: ''}
      }
    });
    return ret;
  }

  private _getActivityType(activity: any): string {
    let ret: string = '';
    if (activity.label === 'Potency') {
      ret = activity.label;
    } else if (activity.label === 'N/A') {
      ret = '';
    } else {
      ret = `p${activity.label}`;
    }
    return ret;
  }


}
