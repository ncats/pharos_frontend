import {PharosBase, Serializer} from './pharos-base';
import {PharosProperty} from './pharos-property';

/**
 * topic object
 */
export class Topic extends PharosBase {
  /**
   * topic name/title
   */
  name: string;

  /**
   * topic description
   */
  description: string;
  /**
   * topic class? might not be used
   */
  topicClass: string;

  /**
   * fake java model for topic
   */
  kind = 'ix.idg.models.Topic';

  /**
   * number of targets for a topic
   */
  targetCt?: any;

  /**
   * number of diseases for a topic
   */
  diseaseCt?: any;

  /**
   * number of ligands for a topic
   */
  ligandCt?: any;

  /**
   * number of publications for a target
   * // todo: not really used
   */
  publicationCt?: any;

  /**
   * show specific targets to highlight (cheating!)
   */
  displayTargets?: any;

  /**
   * list of cheater targets
   */
  targetList?: string[];

  url?: string;

  etag?: string;

  graphData?: any;
  targets?: any;
}

/**
 * serializer for topic operations
 */
export class TopicSerializer implements Serializer {

  /**
   * no args
   */
  constructor () {}

  /**
   * create topic from json
   * @param json
   * @return {Topic}
   */
  fromJson(json: any): Topic {
    const obj = new Topic();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    return obj;
  }

  /**
   * flatten topic
   * @param {Topic} obj
   * @return {any}
   */
  toJson(obj: Topic): any {
    return [];
  }

  /**
   * topic as properties
   * @param {PharosBase} obj
   * @return {any}
   * @private
   */
  _asProperties<T extends PharosBase>(obj: PharosBase): any {
    const newObj: any = {};
    Object.keys(obj).map(field => {
      const property: PharosProperty = new PharosProperty({name: field, label: field, term: obj[field]});
      newObj[field] = property;
    });
    // newObj._name.internalLink = obj.uuid;
    return newObj;
  }
}

