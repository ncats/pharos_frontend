import {PharosBase} from "./pharos-base";

export class Target extends PharosBase {
  name: string;
  description: string;
  idgFamily: string;
  idgTDL: string;
  novelty:  number;
  antibodyCount:  number;
  monoclonalCount: number;
  pubmedCount:  number;
  jensenScore:  number;
  patentCount:  number;
  grantCount:  number;
  grantTotalCost:  number;
  r01Count:  number;
  ppiCount:  number;
  knowledgeAvailability:  number;
  pubTatorScore:  number;
  self: string;
  _organism: string;
  _links: any;
  _properties: any;
  _synonyms: any;
  _publications: any;
}
