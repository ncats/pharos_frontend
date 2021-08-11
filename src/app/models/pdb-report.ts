import {PharosSerializer} from './pharos-base';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';

export class PDBResult {
  structureId: string;
  methods: string[];
  peptides?: PDBPeptide[];
  ligands?: PDBLigand[];
  citation?: PDBCitation;
  resolution?: number[];
  molecularWeight?: number;

  peptideCount(accession) {
    const peptides = this.peptides.filter(p => {
      return p.alignments.filter(a => {
        return a.peptideAccession === accession;
      }).length > 0;
    });
    if (peptides && peptides.length > 0) {
      return peptides[0].count;
    }
    return 1;
  }

  accessionRegions(accession) {
    const regions: PDBRegion[] = [];
    this.peptides.forEach(p => {
      p.alignments.forEach(a => {
        a.regions.forEach(r => {
          if (a.peptideAccession === accession) {
            regions.push(r);
          }
        });
      });
    });
    return regions;
  }

  totalPeptideLength(accession) {
    const regions = this.accessionRegions(accession);
    return regions.reduce((prev, cur) => prev + cur.length, 0);
  }

  residues(accession) {
    const regions = this.accessionRegions(accession);
    return regions.map(r => {
      return r.refStart + '-' + (r.refStart + r.length);
    }).join(', ');
  }
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
    if (obj.citation && obj.citation.pubmedId) {
      obj.citation.link = `http://www.ncbi.nlm.nih.gov/pubmed/${obj.citation.pubmedId}`;
    }
    obj.molecularWeight = copy.entryInfo.molecular_weight;
    obj.resolution = copy.entryInfo.resolution_combined;
    obj.peptides = copy.peptides?.map(p => {
      return new PDBPeptide(p);
    });
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
  canonicalSmiles: string;
}

export class PDBRegion {
  refStart: number;
  entityStart: number;
  length: number;

  constructor(json: any) {
    this.refStart = json.refStart;
    this.entityStart = json.entityStart;
    this.length = json.length;
  }
}

export class PDBAlignment {
  regions: PDBRegion[];
  peptideAccession: string;

  constructor(json: any) {
    this.peptideAccession = json.peptideAccession;
    this.regions = json.regions.map(r => new PDBRegion(r));
  }
}

export class PDBPeptide {
  alignments: PDBAlignment[];
  count: number;
  constructor(json: any) {
    this.alignments = json.alignments?.map(a => new PDBAlignment(a)) || [];
    this.count = json.entity_poly.pdbx_strand_id.split(',').length;
  }
}

export class PDBLigandSerializer implements PharosSerializer {
  smileFormat: string = 'CACTVS'.toUpperCase();

  fromJson(json: any): any {
    const obj = new PDBLigand();
    obj.id = json.nonpolymer_comp.rcsb_id;
    obj.names = json.nonpolymer_comp?.synonyms?.filter(n => n.provenance_source === 'PDB Reference Data')
      .map(n => n = n.name)
      .sort((a, b) => a.length - b.length) || [obj.id];
    obj.type = json.nonpolymer_comp.chem_comp.type;
    obj.smiles = json.nonpolymer_comp.smiles
      .find(smile => smile.type.toUpperCase() === 'SMILES' && smile.program.toUpperCase() === this.smileFormat)?.descriptor;
    obj.canonicalSmiles = json.nonpolymer_comp.smiles
      .find(smile => smile.type.toUpperCase() === 'SMILES_CANONICAL' && smile.program.toUpperCase() === this.smileFormat)?.descriptor;
    return obj;
  }
}

export class PDBViewObject {
  structureId: DataProperty;
  pubYear: DataProperty;
  resolution: DataProperty;
  molecularWeight: DataProperty;
  residues: DataProperty;
  fraction: DataProperty;
  peptideCount: DataProperty;

  methods: DataProperty[] = [];
  links: DataProperty[] = [];
  title: DataProperty;
  ligands: DataProperty[] = [];
  ligandIds: DataProperty[] = [];

  constructor(result: PDBResult, target: any) {
    if (!result) {
      return;
    }
    this.structureId = {
      term: result.structureId,
      label: result.structureId,
      externalLink: `https://www.rcsb.org/structure/${result.structureId}`
    };
    this.title = {term: result.citation?.title, label: result.citation?.title, externalLink: result.citation?.link};
    this.methods = result.methods?.map(c => ({term: c, label: c}));
    this.ligands = result.ligands?.map(c => ({term: c.names[0], label: c.names[0]}));
    this.ligandIds = result.ligands?.map(c => ({term: c.id, label: c.id}));
    this.pubYear = {term: result.citation?.year?.toString(), label: result.citation?.year?.toString()};
    this.resolution = {term: result.resolution?.join(', ')?.toString(), label: result.resolution?.join(', ')?.toString()};
    this.molecularWeight = {term: result.molecularWeight?.toString(), label: result.molecularWeight?.toString()};
    let residues = result.residues(target.accession);
    const count = result.peptideCount(target.accession);
    if (count > 1) {
      residues = `${residues} (x${count})`;
    }
    this.residues = {term: residues, label: residues};
    const fraction = result.totalPeptideLength(target.accession) / target.sequence.length;
    this.fraction = {term: fraction.toFixed(2), label: fraction.toFixed(2)};
  }
}
