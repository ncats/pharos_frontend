import * as d3 from 'd3';


/**
 * configuration parameters to change the color of a node,
 * n is used to adjust both node and text size (text doesn't really change)
 * todo: currently not used
 * @type {{N: number; SPECTRUM: string[]}}
 */
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

/**
 * node object for d3 graph
 */
export class Node implements d3.SimulationNodeDatum {
  //  optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  /**
   * x axis value
   * @type {number}
   */
  x = 0;
  /**
   * y axis value
   * @type {number}
   */
  y = 0;
  /**
   * x axis velocity
   * @type {number}
   */
  vx = 0;
  /**
   * y axis velocity
   * @type {number}
   */
  vy = 0;
  /**
   * x axis function
   */
  fx?: number | null;
  /**
   * y axis function
   */
  fy?: number | null;
  /**
   * number of links to each node
   * @type {number}
   */
  linkCount = 0;
  /**id string   */
  uuid: string;
  /**id string   */
  id: string;
  /**
   * array of node labels
   */
  labels?: string[];
  /**
   * knowledge graph id
   */
  kgraph: string;
  /**
   * node name
   */
  name: string;
  /**
   * node type
   */
  type: string;
  /**
   * pharos link for more details
   */
  uri: string;

  /**
   * Neo4j has their own uuid that will need to be used to track nodes, since some relationships are sepnt with the start
   * and end nodes notated solely by the Neo4j ids, rather than the full node object
   * @param {string} uuid
   * @param data
   */
  constructor(uuid: string, data: any) {
    this.uuid = uuid;
    //  uuid is still saved here
    this.labels = data.labels;
    this.linkCount = 1;
    this.kgraph = data.properties ? data.properties.kgraph.low : 0;
//  this.created = data.created;
    this.name = data.properties ? data.properties.name : '';
    this.type = data.properties ? data.properties.type : '';
    this.uri = data.properties ? data.properties.uri : '';
  }

  /**
   * returns baseline proportional size number
   * @return {number}
   */
  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  /**
   * return node radius size based on link count
   * @return {number}
   */
  get r() {
    return 50 * this.normal() + 15;
  }

  /**
   * returns font size based on link count
   * todo: not currently used
   * @return {string}
   */
  get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }

  /**
   * return a color based on node diameter
   * //todo this can probably be done better using d3
   * @return {string | string | string | string | string | string}
   */
  get color() {
    const index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
    return APP_CONFIG.SPECTRUM[index];
  }
}

/**
 * protein that extends node ovject
 */
export class Protein extends Node {
  /**
   * uniprot id
   */
  uniprot_id: string;
  /**
   * description paragraph of the protein
   */
  description: string;
  /**
   * list of protein synonyms
   */
  synonyms: string[];
  /**
   * protein family
   */
  family: string;
  /**
   * protein dark level
   */
  tdl: string;
  /**
   * pharos link of protein
   * currently to a different pharos instance
   * todo: sync with current database
   */
  uri: string;

  /**
   * new protein
   * @param {string} uuid
   * @param data
   */
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

/**
 * Article class node type
 */
export class Article extends Node {
  /**
   * article journal
   */
  journal: string;
  /**
   * year article published
   */
  year: number;
  /**
   * pubmed id
   */
  pmid: string;

  /**
   * new article
   * @param {string} uuid
   * @param data
   */
  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.journal = data.properties.journal;
    this.year = data.properties.year.low;
  }
}

/**
 * base query of knowlege graph
 */
export class Query extends Node {
  /**
   * knowledge graph search term
   */
  term: string;

  /**
   * new query
   * @param {string} uuid
   * @param data
   */
  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.term = data.properties.term;
  }
}

/**
 * Mesh terms associated with results
 */
export class Mesh extends Node {
  /**
   * comma separated list of trees
   */
  treeNumbers: string;
  /**
   * todo: ask trung what this is
   */
  ui: string;

  /**
   * new mesh
   * @param {string} uuid
   * @param data
   */
  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.ui = data.properties.ui;
    this.treeNumbers = data.treeNumbers;
  }
}

/**
 * drug object will correspond to pharos ligand
 */
export class Drug extends Node {
  /**
   * list of drug synonyms
   */
  synonyms: string[];

  /**
   * new drug
   * @param {string} uuid
   * @param data
   */
  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.synonyms = data.properties.synonyms.split(',');

  }
}

/**
 * disease object
 */
export class Disease extends Node {
  /**
   * list of disease synonyms
   */
  synonyms: string[];

  /**
   * new disease
   * @param {string} uuid
   * @param data
   */
  constructor(uuid: string, data: any) {
    super(uuid, data);
    this.synonyms = data.properties.synonyms.split(',');

  }
}





