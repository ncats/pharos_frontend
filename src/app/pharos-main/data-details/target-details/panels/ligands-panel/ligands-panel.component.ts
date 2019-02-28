import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {EnvironmentVariablesService} from '../../../../../pharos-services/environment-variables.service';
import {PharosProperty} from '../../../../../models/pharos-property';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Ligand} from '../../../../../models/ligand';
import {PageData} from '../../../../../models/page-data';
import {takeUntil, takeWhile} from 'rxjs/operators';


@Component({
  selector: 'pharos-ligands-panel',
  templateUrl: './ligands-panel.component.html',
  styleUrls: ['./ligands-panel.component.css']
})
export class LigandsPanelComponent extends DynamicPanelComponent implements OnInit {
  allLigands: Ligand[];
  allDrugs: Ligand[];
  ligandsMap: Map<string, any> = new Map<string, any>();
  drugsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  ligandsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  ligandPageData: PageData;
  drugPageData: PageData;

  private _STRUCTUREURLBASE: string;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private environmentVariablesService: EnvironmentVariablesService,
    private _http: HttpClient) {
    super();
    this._STRUCTUREURLBASE = this.environmentVariablesService.getStructureImageUrl();
  }

    ngOnInit() {
      this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(x => {
          if (Object.values(this.data).length > 0) {
            this.ngUnsubscribe.next();
            this.setterFunction();
          }
        });
    }


  setterFunction(): void {
    const ligandsArr = [];
    const drugsArr = [];
      this.data.ligands.forEach(ligand => {
        const activity: any = this._getActivity(ligand);
        if (ligand.href && !this.ligandsMap.get(ligand.id)) {
          // placeholder to block repetitive calls
          this.ligandsMap.set(ligand.id, {});
          this._http.get<any>(`${ligand.href}?view=full`).subscribe(res => {
            this.ligandsMap.set(ligand.id, res);
            const refid: string = res.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
            const lig = {
              name: res.name,
              refid: refid,
              activityType: this._getActivityType(activity),
              activity: activity.numval,
              imageUrl: `${this._STRUCTUREURLBASE}${refid}.svg?size=250`,
              internalUrl: `/idg/ligands/${res.id}`
            };
            const drug = res.properties.filter(prop => prop.label === 'Ligand Drug');
            if (drug.length > 0 && drug[0].term === 'YES') {
              drugsArr.push(lig);
            } else {
              ligandsArr.push(lig);
            }
            this.allDrugs = drugsArr;
            this.allLigands = ligandsArr;
            this.ligandPageData = new PageData(
              {
                top: 10,
                skip: 0,
                total: this.allLigands.length,
                count: 10
              }
            );
            this.drugPageData = new PageData(
              {
                top: 10,
                skip: 0,
                total: this.allDrugs.length,
                count: 10
              }
            );

          this.ligandsDataSource.data = this.allLigands.slice(this.ligandPageData.skip, this.ligandPageData.top);
           this.drugsDataSource.data = this.allDrugs.slice(this.drugPageData.skip, this.drugPageData.top);
           this.changeDetector.detectChanges();
          });
        }
      });

    }

paginateDrugs($event) {
  this.drugsDataSource.data = this.allDrugs.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
}

paginateLigands($event) {
  this.ligandsDataSource.data = this.allLigands.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
}

    private _getActivity(ligand: any): any {
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
}
