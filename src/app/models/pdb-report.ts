import {PharosBase, PharosSerializer} from './pharos-base';
import {PharosProperty} from './pharos-property';
import {DataProperty} from "../tools/generic-table/components/property-display/data-property";
import {Data} from "@angular/router";

export class PDBResult {
  structureId: string;
  methods: string[];
  ligands?: PDBLigand[];
  citation?: PDBCitation;
  resolution?: number[];
  molecularWeight?: number;
}

export class PDBResultSerializer implements PharosSerializer {
  fromJson(json: any): any {
    const copy = JSON.parse(JSON.stringify(json));
    const obj = new PDBResult();
    const ligandSerializer = new PDBLigandSerializer();
    Object.entries((copy)).forEach((prop) => obj[prop[0]] = prop[1]);
    obj.structureId = copy.structureId;
    obj.methods = copy.exptl?.map(m => m.method);
    obj.ligands = copy.ligands?.map(l => l = ligandSerializer.fromJson(l));
    if (obj.citation && obj.citation.pubmedId){
      obj.citation.link = `http://www.ncbi.nlm.nih.gov/pubmed/${obj.citation.pubmedId}`;
    }
    obj.molecularWeight = copy.entryInfo.molecular_weight;
    obj.resolution = copy.entryInfo.resolution_combined;
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
    obj.names = json.nonpolymer_comp?.synonyms?.filter(n => {return n.provenance_source === "PDB Reference Data";})
      .map(n => n = n.name)
      .sort((a,b) => a.length - b.length) || [obj.id];
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
  pubYear: DataProperty;
  resolution: DataProperty;
  molecularWeight: DataProperty;

  methods: DataProperty[] = [];
  links: DataProperty[] = [];
  title: DataProperty;
  ligands: DataProperty[] = [];
  ligandIds: DataProperty[] = [];

  constructor(result: PDBResult) {
    if(!result) {return;}
    this.structureId = {term: result.structureId, label: result.structureId, externalLink: `https://www.rcsb.org/structure/${result.structureId}`};
    this.title = {term: result.citation?.title, label: result.citation?.title, externalLink: result.citation?.link};
    this.methods = result.methods?.map(c => {return {term: c, label: c};});
    this.ligands = result.ligands?.map(c => {return {term: c.names[0], label: c.names[0]};});
    this.ligandIds = result.ligands?.map(c => {return {term: c.id, label: c.id};});
    this.pubYear = {term: result.citation?.year?.toString(), label: result.citation?.year?.toString()};
    this.resolution = {term: result.resolution?.join(', ')?.toString(), label: result.resolution?.join(', ')?.toString()};
    this.molecularWeight = {term: result.molecularWeight?.toString(), label: result.molecularWeight?.toString()};
  }
}
