import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {EnvironmentVariablesService} from '../../../../../pharos-services/environment-variables.service';
import {MatTableDataSource} from '@angular/material';
import {Ligand, LigandSerializer} from '../../../../../models/ligand';
import {PageData} from '../../../../../models/page-data';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Publication, PublicationSerializer} from '../../../../../models/publication';
import {Target} from '../../../../../models/target';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'pharos-ligands-panel',
  templateUrl: './ligands-panel.component.html',
  styleUrls: ['./ligands-panel.component.css']
})
export class LigandsPanelComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;
  dataSource: MatTableDataSource<Ligand[]> = new MatTableDataSource<Ligand[]>();
  pageData: PageData;

  private _STRUCTUREURLBASE: string;
  constructor(
    private navSectionsService: NavSectionsService,
    private changeDetector: ChangeDetectorRef,
    private _http: HttpClient,
    private ref: ChangeDetectorRef,
    private environmentVariablesService: EnvironmentVariablesService
  ) {
    super();
    this._STRUCTUREURLBASE = this.environmentVariablesService.getStructureImageUrl();
  }

    // todo pagination might still be a little slow, as the first load is not paginated
    ngOnInit() {
      this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(x => {
          if (this.data[this.field] && this.data[this.field].length > 0) {
            this.ngUnsubscribe.next();
            this.setterFunction();
          }
        });
    }


  setterFunction(): void {
    this.pageData = new PageData(
      {
        top: 10,
        skip: 0,
        total: this.data.count,
        count: 10
      });
this._mapLigands(this.data[this.field]);
           this.changeDetector.detectChanges();
    }

  paginate($event) {
    const url = `${this.environmentVariablesService.getApiPath()}targets/${this.target.accession}/${this.field}?skip=${($event.pageIndex) * $event.pageSize}&top=${$event.pageSize}&view=full`;
    this.loading = true;
    this._http.get<Ligand[]>(
      url)
      .subscribe(res => {
       this._mapLigands(res);
        this.loading = false;
      });
  }

private _mapLigands(data: any[]): void {
  const ligandsArr = [];
  data.forEach(ligand => {
    const activity: any = ligand.links
      .filter(link => link.kind === 'ix.idg.models.Target')
      .map(target => this._getActivity(target));
      // .sort(activity => activity.target !== this.target.gene);
    const refid: string = ligand.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
    const lig = {
      name: ligand.name,
      refid: refid,
      activities: activity,
      imageUrl: `${this._STRUCTUREURLBASE}${refid}.svg?size=250`,
      internalUrl: `/idg/ligands/${ligand.id}`
    };
    ligandsArr.push(lig);

    this.dataSource.data = ligandsArr;
  });
}

  private _getActivity(ligand: any): any {
    let otherActivity: any;
    const ret: any[] = [];
    const na = {label: 'N/A', numval: ''};
    ligand.properties.filter(prop => {
      if (prop.label === 'Ligand Activity') {
        otherActivity = {
            activity: ligand.properties.filter(p => p.label === prop.term)[0],
            target: ligand.properties.filter(p => p.label === 'IDG Target')[0].term,
            targetFamily: ligand.properties.filter(p => p.label === 'IDG Target Family')[0].term,
            idgLevel: ligand.properties.filter(p => p.label === 'IDG Development Level')[0].term,
          };
      } else if (prop.label === 'Pharmalogical Action') {
        otherActivity = {
            activity: prop,
            target: ligand.properties.filter(p => p.label === 'IDG Target')[0].term,
            targetFamily: ligand.properties.filter(p => p.label === 'IDG Target Family')[0].term,
            idgLevel: ligand.properties.filter(p => p.label === 'IDG Development Level')[0].term,
          };
      }
    });
    return otherActivity ? otherActivity : na;
  }



  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
