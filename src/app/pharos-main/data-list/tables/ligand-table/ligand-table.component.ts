import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {PageData} from '../../../../models/page-data';
import {MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {PharosConfig} from "../../../../../config/pharos-config";

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
    private pharosConfig: PharosConfig,
    private _http: HttpClient) {
    super();
  }

  ngOnInit() {
    this._STRUCTUREURLBASE = this.pharosConfig.getStructureImageUrl();
    this._data.subscribe(d => {
      if (this.data) {
        this.setterFunction();
      }
    });
  }

  /**
   * this changes the sort order
   * @param $event
   */
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
          const mappedLig = this.ligandsMap.get(ligand.id);
          if (!mappedLig) {
            // placeholder to block repetitive calls
            this.ligandsMap.set(ligand.id, {});
          } else {
            ligandsArr.push(mappedLig);
            this.ligandsDataSource.data = ligandsArr;
          }
          let activity: any[] = [];
          let refid = '';

          if (ligand.links) {
             activity = ligand.links.filter(link => link.kind === 'ix.idg.models.Target').map(target => this._getActivity(target));
             refid = ligand.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
          }
            const newLigand = {
              name: ligand.name,
              refid: refid,
              activities: activity,
              imageUrl: ligand.image ? ligand.image : this._STRUCTUREURLBASE + refid + '.svg?size=250'
            };

            if (ligand.target) {
              newLigand['target'] = ligand.target;
            }
            this.ligandsMap.set(ligand.id, newLigand);
            ligandsArr.push(newLigand);
            this.ligandsDataSource.data = ligandsArr;
        });
  }

  private _getActivity(ligand: any): any {
    const otherActivity = [];
    const ret: any[] = [];
    const na = {label: 'N/A', numval: ''};
    ligand.properties.filter(prop => {
      if (prop.label === 'Ligand Activity') {
        otherActivity.push({
            activity: ligand.properties.filter(p => p.label === prop.term)[0],
            target: ligand.properties.filter(p => p.label === 'IDG Target')[0].term,
            targetFamily: ligand.properties.filter(p => p.label === 'IDG Target Family')[0].term,
            idgLevel: ligand.properties.filter(p => p.label === 'IDG Development Level')[0].term,
          }
        );
      }
    });
        return otherActivity ? otherActivity[0] : na;
      }



 /* private _getActivity(ligand: any): any {
    let ret: any = {};
    ligand.properties.map(prop => {
      if (prop.label === 'IC50') {
        ret = prop;
      } else if (prop.label === 'Ligand Activity') {
        ret = ligand.properties.filter(p => p.label === prop.term)[0];
      } else {
        ret = {label: 'N/A', numval: ''};
      }
    });
    return ret;
  }

  private _getActivityType(activity: any): string {
    let ret = '';
    if (activity.label === 'Potency') {
      ret = activity.label;
    } else if (activity.label === 'N/A') {
      ret = '';
    } else {
      ret = `p${activity.label}`;
    }
    return ret;
  }

*/
}
