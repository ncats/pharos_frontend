import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {EnvironmentVariablesService} from '../../../../../pharos-services/environment-variables.service';
import {PharosProperty} from '../../../../../models/pharos-property';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Ligand} from '../../../../../models/ligand';
import {PageData} from '../../../../../models/page-data';
import {takeUntil, takeWhile} from 'rxjs/operators';
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";


@Component({
  selector: 'pharos-ligands-panel',
  templateUrl: './ligands-panel.component.html',
  styleUrls: ['./ligands-panel.component.css']
})
export class LigandsPanelComponent extends DynamicPanelComponent implements OnInit {
  allLigands: Ligand[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  pageData: PageData;

  private _STRUCTUREURLBASE: string;
  constructor(
    private navSectionsService: NavSectionsService,
    private changeDetector: ChangeDetectorRef,
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
    const ligandsArr = [];
    const drugsArr = [];
      this.data[this.field].forEach(ligand => {
        const activity: any = this._getActivity(ligand);
            const refid: string = ligand.links.filter(link => link.kind === 'ix.core.models.Structure')[0].refid;
            const lig = {
              name: ligand.name,
              refid: refid,
              activityType: this._getActivityType(activity),
              activity: activity.numval,
              imageUrl: `${this._STRUCTUREURLBASE}${refid}.svg?size=250`,
              internalUrl: `/idg/ligands/${ligand.id}`
            };
            ligandsArr.push(lig);
            this.allLigands = ligandsArr;
            this.pageData = new PageData(
              {
                top: 10,
                skip: 0,
                total: this.allLigands.length,
                count: 10
              }
            );
          this.dataSource.data = this.allLigands.slice(this.pageData.skip, this.pageData.top);
           this.changeDetector.detectChanges();
          });
    }

paginate($event) {
  this.dataSource.data = this.allLigands.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
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

  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
