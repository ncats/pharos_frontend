import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {DynamicPanelComponent} from "../../../tools/dynamic-panel/dynamic-panel.component";
import {takeUntil} from "rxjs/operators";
import {PageData} from "../../../models/page-data";
import {TargetTableComponent} from "../target-table/target-table.component";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {EnvironmentVariablesService} from "../../../pharos-services/environment-variables.service";
import {LigandsPanelComponent} from "../../data-details/target-details/panels/ligands-panel/ligands-panel.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'pharos-ligand-table',
  templateUrl: './ligand-table.component.html',
  styleUrls: ['./ligand-table.component.css']
})
export class LigandTableComponent extends DynamicPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  ligandsMap: Map<string, any> = new Map<string, any>();
  ligandsDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();

//  displayColumns: string[] = ['name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();

  /* Paginator object from Angular Material */
  @ViewChild(MatPaginator) ligandPaginator: MatPaginator;

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

  ngAfterViewInit() {
    this.ligandsDataSource.paginator = this.ligandPaginator;
    this.changeDetector.detectChanges();
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
    console.log(this);
    this.data.forEach(ligand => {
      console.log(ligand);
    //  const activity: any = this._getActivity(ligand);
      if (!this.ligandsMap.get(ligand.id)) {
        // placeholder to block repetitive calls
        this.ligandsMap.set(ligand.id, {});
        const url = ligand.self ? ligand.self : ligand.href + '?view=full';
        console.log(url);
        this._http.get<any>(url).subscribe(res => {
          this.ligandsMap.set(ligand.id, res);
          const refid: string = res.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
          const lig = {
            name: res.name,
            refid: refid,
        //    activityType: activity.label === 'Potency' ? activity.label : 'p' + activity.label,
         //   activity: activity.numval,
            imageUrl: this._STRUCTUREURLBASE + refid + '.svg'
          };
            ligandsArr.push(lig);
          this.ligandsDataSource.data = ligandsArr;
        });
      }
    });

  }

 /* private _getActivity(ligand: any): string {
    let ret: any = {};
    ligand.properties.map(prop => {
      if (prop.label === 'IC50') {
        ret = prop;
      } else if (prop.label === 'Ligand Activity') {
        ret = ligand.properties.filter(p => p.label === prop.term)[0];
      }
    });
    return ret;
  }*/



}
