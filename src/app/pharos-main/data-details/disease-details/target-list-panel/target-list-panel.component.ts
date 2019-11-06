import {Component, InjectionToken, OnInit} from '@angular/core';
import {PharosProperty} from '../../../../models/pharos-property';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../models/target';
import {map, zipAll} from 'rxjs/operators';
import {from} from 'rxjs/index';
import {PageData} from '../../../../tools/generic-table/models/page-data';
import {DynamicTablePanelComponent} from '../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PharosConfig} from '../../../../../config/pharos-config';

/**
 * token to inject structure viewer into generic table component
 * @type {InjectionToken<any>}
 */
export const IDG_LEVEL_TOKEN = new InjectionToken('IDGLevelComponent');

@Component({
  selector: 'pharos-target-list-panel',
  templateUrl: './target-list-panel.component.html',
  styleUrls: ['./target-list-panel.component.css']
})
export class TargetListPanelComponent extends DynamicTablePanelComponent implements OnInit {

  disease: any = {};

  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'target',
      label: 'IDG Target'
    }),
    new PharosProperty({
      name: 'developmentLevel',
      label: 'Development Level',
      customComponent: IDG_LEVEL_TOKEN,
      width: '10vw'
    }),
    new PharosProperty({
      name: 'targetFamily',
      label: 'Target Family'
    }),
    new PharosProperty({
      name: 'dataSource',
      label: 'Data Source'
    }),
  ];

  tableArr: any[] = [];

  /**
   * pagination data object
   */
  pageData: PageData;

  /**
   * no args constructor
   * calls spuer object constructor
   */
  constructor(
    private http: HttpClient,
    private pharosConfig: PharosConfig
    ) {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if (this.data.targets && this.data.targets.length > 0) {
          this.tableArr = [];
          from(this.data.targets.map(target => {
            const data = {
              //  target: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target')[0]),
              developmentLevel: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Development Level')[0]),
              targetFamily: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target Family')[0]),
              dataSource: new PharosProperty(target.properties.filter(prop => prop.label === 'Data Source')[0]),
            };
            return {target: data, data: this.http.get(target.href)};
          })).pipe(
            map<any, any>(res => {
                return res.data.pipe(
                  map<Target, any>(response => {
                    res.target.target = new PharosProperty({
                      label: 'Target',
                      term: response.gene,
                      internalLink: ['/targets', response.accession]
                    });
                    return res.target;
                  })
                );
              }),
            zipAll()
          ).subscribe(res => {
            this.pageData = this.makePageData(this.disease._links.count);
            this.tableArr = res;
          });
        }
      });
  }

  getMoreTargets(event) {
    const url = `${this.pharosConfig.getApiPath()}diseases/${this.disease.id}/links(kind=ix.idg.models.Target)?skip=${event.pageIndex * event.pageSize}&top=${event.pageSize}`;
    // this.loading = true;
    this.http.get<any>(url)
      .subscribe(res => {
        from(res.map(target => {
          const data = {
            //  target: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target')[0]),
            developmentLevel: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Development Level')[0]),
            targetFamily: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target Family')[0]),
            dataSource: new PharosProperty(target.properties.filter(prop => prop.label === 'Data Source')[0]),
          };
          return {target: data, data: this.http.get(target.href)};
        })).pipe(
          map<any, any>(resp => {
            return resp.data.pipe(
              map<Target, any>(response => {
                res.target.target = new PharosProperty({
                  label: 'Target',
                  term: response.gene,
                  internalLink: ['/targets', response.accession]
                });
                return res.target;
              })
            );
          }),
          zipAll()
        ).subscribe(r => {
          this.tableArr = r;
          this.pageData.skip = event.pageIndex * event.pageSize;
        });
      });
  }

}


