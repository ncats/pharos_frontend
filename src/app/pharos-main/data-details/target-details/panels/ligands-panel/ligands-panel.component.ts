import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {EnvironmentVariablesService} from '../../../../../pharos-services/environment-variables.service';
import {Property} from '../../../../../models/property';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Ligand} from "../../../../../models/ligand";


@Component({
  selector: 'pharos-ligands-panel',
  templateUrl: './ligands-panel.component.html',
  styleUrls: ['./ligands-panel.component.css']
})
export class LigandsPanelComponent extends DynamicPanelComponent implements OnInit, AfterViewInit {

  /**
   * todo this may need to be removed, it is to temporarily take data to display topics ligands
   */
  @Input() ligands?: Ligand[];

  ligandsMap: Map<string, any> = new Map<string, any>();
  drugsDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();
  ligandsDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();

  /* Paginator object from Angular Material */
  @ViewChild(MatPaginator) drugPaginator: MatPaginator;

  /* Paginator object from Angular Material */
  @ViewChild(MatPaginator) ligandPaginator: MatPaginator;

  private _STRUCTUREURLBASE: string;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private environmentVariablesService: EnvironmentVariablesService,
    private _http: HttpClient) {
    super();
  }

  ngOnInit() {
    if(this.ligands){ this.data = this.ligands};
    this._STRUCTUREURLBASE = this.environmentVariablesService.getStructureImageUrl();
    this._data.subscribe(d => {
      if (this.data.ligands) {
        this.setterFunction();
      }
    });
  }

  ngAfterViewInit() {
    this.drugsDataSource.paginator = this.drugPaginator;
    this.ligandsDataSource.paginator = this.ligandPaginator;
    this.changeDetector.detectChanges();
  }

  setterFunction(): void {
    const ligandsArr = [];
    const drugsArr = [];
      this.data.ligands.forEach(ligand => {
        const activity: any = this._getActivity(ligand);
        if (ligand.href && !this.ligandsMap.get(ligand.id)) {
          // placeholder to block repetitive calls
          this.ligandsMap.set(ligand.id, {});
          this._http.get<any>(ligand.href + '?view=full').subscribe(res => {
            this.ligandsMap.set(ligand.id, res);
            const refid: string = res.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
              const lig = {
               name: res.name,
               refid: refid,
               activityType: activity.label === 'Potency' ? activity.label : 'p' + activity.label,
               activity: activity.numval,
               imageUrl: this._STRUCTUREURLBASE + refid + '.svg?size=250'
             };
              const drug = res.properties.filter( prop => prop.label === 'Ligand Drug');
              if (drug.length > 0 && drug[0].term === 'YES') {
                drugsArr.push(lig);
              } else {
                ligandsArr.push(lig);
              }
            this.ligandsDataSource.data = ligandsArr;
            this.drugsDataSource.data = drugsArr;
          });
        }
      });

    }

    private _getActivity(ligand: any): string {
    let ret: any = {};
    ligand.properties.map(prop => {
      if (prop.label === 'IC50') {
        ret = prop;
      } else if (prop.label === 'Ligand Activity') {
        ret = ligand.properties.filter(p => p.label === prop.term)[0];
      }
    });
    return ret;
    }
}
