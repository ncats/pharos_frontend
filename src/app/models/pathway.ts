import {Serializer} from "./pharos-base";
import {PharosProperty} from "./pharos-property";
import {Facet} from "./facet";


export class Pathway{
  /**
   * number of targets related to disease association
   */
  targetCounts?: any[];
  targetCountsTotal: number;
  sourceID?: string;
  name?: string;
  type?: string;
  url?: string;
}

export class PathwaySerializer implements Serializer{
  fromJson(json: any): any {
    const obj = new Pathway();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    return obj;
  }

  _asProperties(object: any): any {
    const newObj: any = {};
    Object.keys(object).map(field => {
      newObj[field] = new PharosProperty({name: field, label: field, term: object[field]});
    });
    if(object.url){
      if(!object.sourceID){
        newObj.sourceID = new PharosProperty(newObj.type);
      }
      newObj.sourceID.externalLink = object.url;
    }
    const facetName = this.dataSourceToFacetName(object.type);
    if(facetName){
      const targetCount = object.targetCounts.reduce((prev, cur) => prev + cur.value, 0);
      newObj.facetLink = new PharosProperty({
        name: 'facetLink',
        label: 'facetLink',
        term: targetCount + ' targets',
        internalLink: '/targets',
        queryParams: {facet: `${facetName}${Facet.separator}${object.name}`}});
    }
    return newObj;
  }

  dataSourceToFacetName(dataSource: string){
    if(dataSource.includes('PathwayCommons')){
      return 'PathwayCommons Pathway';
    }
    return dataSource + ' Pathway';
  }
}
