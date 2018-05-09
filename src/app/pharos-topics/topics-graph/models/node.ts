import * as d3 from 'd3';

export class Params {
  startNode = false;
  endNode = false;

  constructor() {}
}

const APP_CONFIG = {
  N : 50,
  SPECTRUM: [

    //  "rgb(222,237,250)"
    'rgb(176,212,243)',
    'rgb(128,186,236)',
    'rgb(77,158,228)',
    'rgb(38,137,223)',
    'rgb(0,116,217)',
    'rgb(0,106,197)'
    //  "rgb(0,94,176)"
    //  "rgb(0,82,154)"
    //  "rgb(0,60,113)"
  ]
};


export class Node implements d3.SimulationNodeDatum {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  fx?: number | null;
  fy?: number | null;

  uuid: string;
  id: string;
 // properties: any;
  labels?: string[];
  linkCount = 0;
  params: Params;
  kgraph: string;
// created: number;
  name: string;
  type: string;
  uri: string;

  /*
  * Neo4j has their own uuid that will need to be used to track nodes, since some relationships are sepnt with the start
  * and end nodes notated solely by the Neo4j ids, rather than the full node object
  * */
  constructor(uuid: string, data: any) {
    console.log(uuid);
    this.uuid = uuid;
    //  uuid is still saved here
  //  this.properties = data.properties;
    this.labels = data.labels;
    this.linkCount = 1;
    this.params = new Params();
    this.kgraph = data.properties.kgraph.low;
//  this.created = data.created;
    this.name = data.properties.name;
    this.type = data.properties.type;
    this.uri = data.properties.uri;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    return 50 * this.normal() + 15;
  }

  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  get color() {
    const index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[index];
  }
}


export class Protein extends Node {
  uniprot_id: string;
  description: string;
  synonyms: string[];
  family: string;
  tdl: string;
  uri: string;


  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.uniprot_id = data.properties.uniprot_id;
    this.description = data.properties.description;
    this.synonyms = data.properties.synonyms.split(',');
    this.family = data.properties.family;
    this.tdl = data.properties.tdl;
    this.uri = data.properties.uri;
  }
}

export class Article extends Node {
  journal: string;
  year: number;
  pmid: string;

  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.journal = data.properties.journal;
    this.year = data.properties.year.low;
  }
}
export class Query extends Node {
  term: string;

  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.term = data.properties.term;
  }
}
export class Mesh extends Node {
  treeNumbers: string;
  ui: string;

  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.ui = data.properties.ui;
    this.treeNumbers = data.treeNumbers;
    this.uri = data.properties.uri;
  }
}

export class Drug extends Node {
  synonyms: string[];

  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.synonyms = data.properties.synonyms.split(',');

  }
}

export class Disease extends Node {
  synonyms: string[];

  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.synonyms = data.properties.synonyms.split(',');

  }
}





