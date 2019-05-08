import {Component, Input} from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {PageData} from '../../models/page-data';
import {PharosProperty} from '../../models/pharos-property';

/**
 * extendable component that also adds table -related operations to a dynamic panel
 */
@Component({
  template: ''
})
export class DynamicTablePanelComponent extends DynamicPanelComponent {

  /**
   * main substance object
   */
  @Input()
  substance: any;

  /**
   * array of all data shown
   */
  allData: any[];

  /**
   * page data object for pagination
   */
  pageData: PageData;

  /**
   * pharos property objects for table layout
   */
  @Input()
  tableFields: PharosProperty[];

  /**
   * field name
   */
  field: string;

  /**
   * no args constructor
   * calls super object constructor
   */
  constructor() {
    super();
  }

  /**
   * paginate ...
   * todo does this ever get used?
   * @param $event
   */
  paginateData($event) {
    this.loading = true;
  }

  /**
   * function to create page data object based on total results
   * @param {number} total
   * @return {PageData}
   */
  makePageData(total: number): PageData {
    return new PageData(
      {
        top: 10,
        skip: 0,
        total: total,
        count: 10
      });
  }

  /**
   * merge passed table data fields with other config objects
   */
  mergeFields() {
    const fieldsMap: Map<string, PharosProperty> = new Map<string, PharosProperty>();
    const defaultFields: PharosProperty[] = Object.values(this.allData[0]);
    const customFields: PharosProperty[] = this.tableFields;
    customFields.forEach(field => {
      field.visible = field.visible === false ? field.visible : true;
      const term = defaultFields.filter(defField => defField.name === field.name);
      if (term.length) {
        field.term = term[0].term;
      }
      fieldsMap.set(field.name, field);
    });

    defaultFields.forEach(field => {
      if (!fieldsMap.has(field.name)) {
        fieldsMap.set(field.name, field);
      }
    });
    this.tableFields = Array.from(fieldsMap.values());
  }

  /**
   * updage the table with new fields
   * used when dynamically showing/hiding columns
   * @param {PharosProperty[]} changeFields
   */
  updateFields(changeFields: PharosProperty[]) {
    this.tableFields = [...changeFields];
  }
}
