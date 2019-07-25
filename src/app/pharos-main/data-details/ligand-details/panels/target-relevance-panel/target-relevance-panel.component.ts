import {Component, OnInit} from '@angular/core';
import {PharosProperty} from '../../../../../models/pharos-property';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {PageData} from '../../../../../models/page-data';
import {IDG_LEVEL_TOKEN} from '../../../disease-details/target-list-panel/target-list-panel.component';

/**
 * shows what targets the ligand was tested on
 */
@Component({
  selector: 'pharos-target-relevance-panel',
  templateUrl: './target-relevance-panel.component.html',
  styleUrls: ['./target-relevance-panel.component.css']
})

export class TargetRelevancePanelComponent extends DynamicTablePanelComponent implements OnInit {

  /**
   * table config fields
   * @type {PharosProperty[]}
   */
  fields: PharosProperty[] = [
    new PharosProperty( {
      name: 'target',
      label: 'IDG Target',
      sortable: true
    }),
    new PharosProperty( {
      name: 'developmentLevel',
      label: 'IDG Development Level',
      sortable: true,
      customComponent: IDG_LEVEL_TOKEN
    }),
    new PharosProperty({
      name: 'targetFamily',
      label: 'Target Family',
      sortable: true
    }),
    new PharosProperty( {
      name: 'activity',
      label: 'Ligand Activity',
      sortable: true,
      externalLink: true
    }),
    new PharosProperty( {
      name: 'developmentLevelValue',
      label: 'Activity Value',
      sortable: true,
      externalLink: true
    })
    ];

  /**
   * array of data shown in the table
   * @type {any[]}
   */
    tableArr: any[] = [];

  /**
   * page data object to track pagination
   */
  pageData: PageData;

  targets: any[] = [];

  /**
   * no args constructor
   * calls super object constructor
   */
  constructor() {
    super();
  }

  /**
   * subscribe to data changes and map data to PharosProperty objects for table display
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        if (this.data.targetRelevance && this.data.targetRelevance.length > 0) {
          this.tableArr = [];
          this.data.targetRelevance.forEach(target => {
            const data = {
              target: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target')[0]),
              developmentLevel: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Development Level')[0]),
              targetFamily: new PharosProperty(target.properties.filter(prop => prop.label === 'IDG Target Family')[0]),
              activity: new PharosProperty(target.properties
                .filter(prop => prop.label === 'Ligand Activity' || prop.label === 'Pharmalogical Action')[0])
            };
            data['developmentLevelValue'] = new PharosProperty(
              target.properties.filter(prop => prop.label === data.activity.term)[0] ?
                target.properties.filter(prop => prop.label === data.activity.term)[0] :
                data.activity
            );
           // data['developmentLevelValue'].term = `p${data['developmentLevelValue'].term}`;
            data.target.internalLink = ['/targets', data.target.term as string];
            if (data.activity && data.activity.term !== 'Pharmalogical Action') {
              data.activity.term = `p${data.activity.term}`;
            }
            this.targets.push(data);
          });
          this.pageData = new PageData(
            {
              top: 10,
              skip: 0,
              total: this.targets.length,
              count: 10
            });
          this.tableArr = this.targets
            .slice(this.pageData.skip, this.pageData.top);
      }
      });
  }

  page(event) {
    this.tableArr = this.targets.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

}
