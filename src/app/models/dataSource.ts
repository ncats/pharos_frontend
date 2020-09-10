import {PharosBase, PharosSerializer, Serializer} from "./pharos-base";
import {DiseaseAssociation} from "./disease-association";
import {PharosProperty} from "./pharos-property";
import {Publication} from "./publication";
import {Facet} from "./facet";


export class DataSource extends PharosBase {
  dataSource: String;
  url?: String;
  license?: String;
  licenseURL?: String;
  targetCount?: number;
  diseaseCount?: number;
  ligandCount?: number;
}


export class DataSourceSerializer implements PharosSerializer {
  _asProperties(object: DataSource): any {
    const newObj: any = {};
    Object.keys(object).map(field => {
      newObj[field] = new PharosProperty({name: field, label: field, term: object[field]});
    });

    if (object.targetCount > 0) {
      newObj.targetCount.internalLink = "/targets";
      newObj.targetCount.queryParams = {facet: `Data Source${Facet.separator}${object.dataSource}`};
    } else {
      newObj.targetCount = {}
    }

    if (object.ligandCount > 0) {
      newObj.ligandCount.internalLink = "/ligands";
      newObj.ligandCount.queryParams = {facet: `Data Source${Facet.separator}${object.dataSource}`};
    } else {
      newObj.ligandCount = {}
    }

    if (object.diseaseCount > 0) {
      const unFilterableSources = ["Monarch Ortholog Disease Associations", "TIN-X Data", "Disease Ontology"];
      if (!unFilterableSources.includes(object.dataSource.toString())) {
        newObj.diseaseCount.internalLink = "/diseases";
        newObj.diseaseCount.queryParams = {facet: `Data Source${Facet.separator}${object.dataSource}`};
      }
    } else {
      newObj.diseaseCount = {}
    }

    if (newObj.url) {
      newObj.dataSource.externalLink = object.url;
    }
    return newObj;
  }

  fromJson(json: any): DataSource {
    const obj = new DataSource();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    return obj;
  }

  toJson(object: PharosBase): any {
    return JSON.stringify(object);
  }
}
