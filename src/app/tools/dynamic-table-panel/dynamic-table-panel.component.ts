import {Component, Input} from '@angular/core';
import {DynamicPanelComponent} from "../dynamic-panel/dynamic-panel.component";
import {PageData} from "../../models/page-data";
import {PharosProperty} from "../../models/pharos-property";

@Component({
  template: ''
})
export class DynamicTablePanelComponent extends DynamicPanelComponent {
  @Input()
  substance: any;
  allData: any[];
  pageData: PageData;
  @Input()
  tableFields: PharosProperty[];
  field: string;

  constructor() {
    super();
  }

  paginateData($event) {
    this.loading = true;
  }

  makePageData(total: number): PageData {
    return new PageData(
      {
        top: 10,
        skip: 0,
        total: total,
        count: 10
      });
  }

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

  updateFields(changeFields: PharosProperty[]) {
    this.tableFields = [...changeFields];
  }
}
