import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {

  constructor() {
  }

  /**
   * todo: currently irrelevant - update with current graph functionality
   * @param term
   * @param type
   * @param properties
   * @returns Message
   */
  getMessage(term: any, type: string, properties?: any): Message {
    let msg: string;
    let params: {};
    switch (type) {

      case 'chembl':
      case 'target': {
        msg = 'MATCH (n:Target) WHERE n.uniprot_id= {qParam} MATCH (n)-[r:REGULATES]-(b) RETURN n, r, b';
        params = {qParam: term};
        break;
      }
    }

    /**
     *
     * @type {{type: string; message: string; params: {}}}
     */
    const message: Message = {
      type: type,
      message: msg,
      params: params
    };
    return message;

  }

}

/**
 * Interface for message object
 */
export interface Message {
  type: string;
  message: string;
  params: Object;
}

