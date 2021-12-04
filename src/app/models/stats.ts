import {PharosBase, PharosSerializer} from './pharos-base';
import {PharosProperty} from './pharos-property';

export class Stats extends PharosBase {
  schema: string;
  feature: string;
  uses: number;
  users: number;
  summary: string;
}


export class StatsSerializer implements PharosSerializer {
  _asProperties(object: Stats): any {
    const newObj: any = {};
    Object.keys(object).map(field => {
      newObj[field] = new PharosProperty({name: field, label: field, term: object[field]});
    });
    return newObj;
  }

  fromJson(json: any): Stats {
    const obj = new Stats();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    return obj;
  }

  toJson(object: PharosBase): any {
    return JSON.stringify(object);
  }
}
