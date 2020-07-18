import {PharosBase, PharosSerializer} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {DataProperty} from "../tools/generic-table/components/property-display/data-property";

export class PDBResult {
  structureId: string;
  methods: string[];
  ligands?: PDBLigand[];
  citation?: PDBCitation;
}

export class PDBResultSerializer implements PharosSerializer {
  fromJson(json: any): any {
    const obj = new PDBResult();
    const ligandSerializer = new PDBLigandSerializer();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    obj.structureId = json.structureId;
    obj.methods = json.exptl?.map(m => m.method);
    obj.ligands = json.ligands?.map(l => l = ligandSerializer.fromJson(l));
    if(obj.citation && obj.citation.pubmedId){
      obj.citation.link = `http://www.ncbi.nlm.nih.gov/pubmed/${obj.citation.pubmedId}`;
    }
    return obj;
  }
}

export class PDBCitation {
  pubmedId?: number;
  link?: string;
  title?: string;
  journal?: string;
  year?: number;
}

export class PDBLigand {
  id: string;
  names: string[];
  type: string;
  smiles: string;
  canonical_smiles: string;
}

export class PDBLigandSerializer implements PharosSerializer {
  smileFormat: string = "CACTVS".toUpperCase();
  fromJson(json: any): any {
    const obj = new PDBLigand();
    obj.id = json.nonpolymer_comp.rcsb_id;
    obj.names = json.nonpolymer_comp.synonyms.filter(n => {return n.provenance_source === "PDB Reference Data";})
      .map(n => n = n.name)
      .sort((a,b) => a.length - b.length);
    obj.type = json.nonpolymer_comp.chem_comp.type;
    obj.smiles = json.nonpolymer_comp.smiles
      .find(smile => {return smile.type.toUpperCase() === "SMILES" && smile.program.toUpperCase() === this.smileFormat})?.descriptor;
    obj.canonical_smiles = json.nonpolymer_comp.smiles
      .find(smile => {return smile.type.toUpperCase() === "SMILES_CANONICAL" && smile.program.toUpperCase() === this.smileFormat})?.descriptor;
    return obj;
  }
}

export class PDBViewObject {
  structureId: DataProperty;
  methods: DataProperty[] = [];
  links: DataProperty[] = [];
  title: DataProperty;
  ligands: DataProperty[] = [];
  ligandIds: DataProperty[] = [];
  constructor(result: PDBResult) {
    this.structureId = {term: result.structureId, label: result.structureId};
    this.title = {term: result.citation?.title, label: result.citation?.title, externalLink: result.citation?.link};
    this.methods = result.methods?.map(c => {return {term: c, label: c};});
    this.ligands = result.ligands?.map(c => {return {term: c.names[0], label: c.names[0]};});
    this.ligandIds = result.ligands?.map(c => {return {term: c.id, label: c.id};});
  }
}
