import {PharosBase} from './pharos-base';

export class Topic extends PharosBase {
name: string;
description: string;
class: string;
kind?: string;
targetCt?: any;
diseaseCt?: any;
ligandCt?: any;
publicationCt?: any;

  constructor (obj: any) {
    super(obj);
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
    this.kind = 'ix.idg.models.Topic';
  }
}
