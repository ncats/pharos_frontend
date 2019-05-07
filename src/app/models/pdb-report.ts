import {PharosBase, PharosSerializer} from "./pharos-base";
import {PharosProperty} from "./pharos-property";

export class PdbReportData extends PharosBase {
  structureId: string;
  chainId: string;
  ligandId: string;
  ligandSmiles: string;
  activities: any[];
  pubmedId: string;
  releaseDate: string;
  experimentalTechnique: string;
  structureTitle: string;
}

/**
 * serializer for pdb object
 */
export class PdbReportSerializer implements PharosSerializer {
  /**
   * no args constructor
   */
  constructor () {}

  /**
   * generatate pdb from json
   * @param json
   * @return {PdbReportData}
   */
  fromJson(json: any): PdbReportData {
    const obj = new PdbReportData();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    if(json.EC50) {
      obj.activities.push(`EC50: ${json.EC50}`);
    }
    if(json.IC50) {
      obj.activities.push(`IC50: ${json.IC50}`);
    }
    if(json.Ka) {
      obj.activities.push(`Ka: ${json.Ka}`);
    }
    if(json.Kd) {
      obj.activities.push(`Kd: ${json.Kd}`);
    }
    if(json.Ki) {
      obj.activities.push(`Ki: ${json.Ki}`);
    }
    return obj;
  }

  /**
   * flatten pdb
   * @param {PdbReportData} obj
   * @return {any}
   */
  toJson(obj: PdbReportData): any {
    return [];
  }

  /**
   * pdb as properties
   * @param {PharosBase} obj
   * @return {any}
   * @private
   */
  _asProperties<T extends PharosBase>(obj: PdbReportData): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = new PharosProperty({name: field, label: field, term: obj[field]});
      newObj[field] = property;
    });
    if (newObj.pubmedId) {
      newObj.pubmedId.externalLink = `http://www.ncbi.nlm.nih.gov/pubmed/${obj.pubmedId}`;
    }
    return newObj;
  }
}
