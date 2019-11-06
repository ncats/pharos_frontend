import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import gql from 'graphql-tag';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';
import {Publication, PublicationSerializer} from './publication';
import {PharosPoint} from './pharos-point';
import {Disease, DiseaseSerializer} from './disease';

const TARGETLISTFIELDS =  gql`
  fragment targetsListFields on Target {
    _tcrdid:tcrdid
    name
    gene: sym
    accession: uniprot
    idgFamily: fam
    idgTDL: tdl
    novelty
    description
    uniProtFunction: props (name: "UniProt Function"){
      value
    }
    jensenScore: props(name: "JensenLab PubMed Score") {
      value
    }
    pubTatorScore: props(name: "PubTator Score") {
      value
    }
    antibodyCount: props(name: "Ab Count") {
      value
    }
    ppiCount: ppiCounts {
      value
    }
    hgdata:harmonizome {
      summary{
        name
        value
      }
    }
    diseaseCounts {
     value
    }
  }
`;


const TARGETDETAILSFIELDS = gql`
  #import "./targetsListFields.gql"
  fragment targetsDetailsFields on Target {
    ...targetsListFields
    symbols: synonyms(name: "symbol") {
      name
      value
    }
    uniprotIds: synonyms(name: "uniprot") {
      name
      value
    }
    ensemblIDs: xrefs(source:"Ensembl") { 
    value 
    }
    pdbs: xrefs(source: "PDB") {
      value
    }
    generifCount
    sequence: seq
    goCounts {value}
    
  pubTatorScores {
    year
    score
  }
    pubmedScores {
    year
    score
  }
  patentCounts {
  year
  count
  }
   publicationCount: pubCount
    publications: pubs(top: $publicationstop, skip: $publicationsskip) {
      year
      pmid
      title
      journal
      abstract
    }
   omimCount: mimCount 
   omimTerms:  mim{
      term
      mimid
    }
  }
  
  ${TARGETLISTFIELDS}
`;



/**
 * main target object
 */
export class Target extends PharosBase {

  static targetListFragments  = TARGETLISTFIELDS;

  static targetDetailsFragments = TARGETDETAILSFIELDS;

  /**
   * target name
   */
  name: string;

  /**
   * target gene name
   */
  gene: string;

  /**
   * target accession id
   */
  accession: string;

  /**
   * target description
   */
  description: string;

  /**
   * idg family distinction
   */
  idgFamily: string;

  /**
   * idg development level
   */
  idgTDL: string;

  /**
   * idg novelty score
   */
  novelty:  number;

  /**
   * text mined publication score
   */
  jensenScore:  number;

  uniprotIds: string[] | any[];

  symbols: string[];

  sequence: string;

  pdbs: any[];

  hgdata: any[];
  /**
   * antibodipedia.org? count
   */
  antibodyCount:  number;

  /**
   * Gene RiF count
   */
  generifCount:  number;


  drugs: any[];

  pubTatorScores: [{year, score}];
  pubmedScores: [{year, score}];
  patentCounts: [{year, count}];
  ensemblIDs: any[];

  goCount: number;
  omimCount: number;
  /**
   * monoclonal count
   * // todo: not used
   */
  monoclonalCount: number;

  /**
   * number of publications
   */
  pubmedCount:  number;

  diseases: Disease[];

  diseaseCount: number;

tinx: any;


  /**
   * number of patents
   */
  patentCount:  number;

  /**
   * number of grants
   */
  grantCount:  number;

  /**
   * amount of grant funding
   */
  grantTotalCost:  number;

  /**
   * number of r01 grants
   */
  r01Count:  number;

  /**
   * number of protein-protein interactions
   */
  ppiCount:  number | any[];

  /**
   * knowledge availability score
   */
  knowledgeAvailability:  number;

  /**
   * pubtator literature score
   */
  pubTatorScore:  number;

  publicationCount: number;

  publications: Publication[];

}

/**
 * serializer for publicaiton object operations
 */
export class TargetSerializer implements PharosSerializer {

  /**
   * no args constructor
   */
  constructor () {}

  /**
   * create target object from json
   * @param json
   * @return {Target}
   */
  fromJson(json: any): Target {
    const obj = new Target();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    /**
     * mapping graphql responses, since they are returned as arrays
     */
    if (json.novelty) {
    obj.novelty = +json.novelty.toFixed(2);
    }

    if (json.jensenScore && json.jensenScore.length) {
    obj.jensenScore = +(+json.jensenScore[0].value).toFixed(2);
    }

    if (json.pubTatorScore && json.pubTatorScore.length) {
    obj.pubTatorScore = +(+json.pubTatorScore[0].value).toFixed(2);
    }

    if (json.antibodyCount && json.antibodyCount.length) {
    obj.antibodyCount = +(+json.antibodyCount[0].value).toFixed(2);
    }

    if (json.ppiCount) {
    obj.ppiCount = json.ppiCount.reduce((prev, cur) => prev + cur.value, 0);
    }

    if (json.uniprotIds) {
      obj.uniprotIds = [{uniprotId: obj.accession}, ...json.uniprotIds.map(id => id = {uniprotId: id.value})];
    } else {
      obj.uniprotIds = [{uniprotId: obj.accession}];
    }

    if (json.ensemblIDs) {
      obj.ensemblIDs = json.ensemblIDs.map(id => id = {ensemblId: id.value});
    }

    if (json.pdbs) {
      obj.pdbs = json.pdbs.map(id => id = {pdbs: id.value});
    }

    if (json.symbols) {
      obj.symbols = [...new Set<string>(json.symbols.map(sym => sym = {symbol: sym.value}))];
    }

    if (json.uniProtFunction) {
      obj.description = `${(json.uniProtFunction.map(id => id.value)).join(' ')} ${obj.description}`;
    }

    if (json.goCounts) {
      obj.goCount = json.goCounts.reduce((prev, cur) => prev + cur.value, 0);
    }

    if (json.hgdata) {
      obj.hgdata = json.hgdata.summary;
    }

    if (json.diseaseCounts) {
      obj.diseaseCount = json.diseaseCounts.length;
    }

      if (json.publications) {
      const pubSerializer = new PublicationSerializer();
      obj.publications = json.publications.map(pub => pubSerializer.fromJson(pub));
    }

      if (json.diseases) {
      const diseaseerializer = new DiseaseSerializer();
      obj.diseases = json.diseases.map(disease => diseaseerializer.fromJson(disease));
    }

    return obj;
  }

  /**
   * flatten target to json
   * @param {PharosBase} obj
   * @return {any}
   */
  toJson(obj: PharosBase): any {
    return [];
  }

  /**
   * return target as properties
   * @param {PharosBase} obj
   * @return {any}
   * @private
   */
  _asProperties(obj: Target): any {
    const newObj: any = this._mapField(obj);
    if (newObj.accession && newObj.accession.term) {
      newObj.name.internalLink = ['/targets', newObj.accession.term];
    }

    if (newObj.gene && newObj.gene.term) {
      newObj.gene.externalLink = `https://www.genenames.org/data/gene-symbol-report/#!/symbol/${newObj.gene.term}`;
    }

    if (newObj.uniprotIds && newObj.uniprotIds.length) {
      newObj.uniprotIds.map(uniprot => uniprot.uniprotId.externalLink = `https://www.uniprot.org/uniprot/${uniprot.uniprotId.term}`);
    }

    if (newObj.publications) {
      const pubSerializer = new PublicationSerializer();
      newObj.publications = obj.publications.map(pub => pubSerializer._asProperties(pub));
    }

    if (newObj.diseases) {
      const diseaseSerializer = new DiseaseSerializer();
      newObj.diseases = obj.diseases.map(disease => diseaseSerializer._asProperties(disease));
    }
    return newObj;
  }

  private _mapField (obj: any) {
    const retObj: {} = Object.assign({}, obj);
      Object.keys(obj).map(objField => {
        if (Array.isArray(obj[objField])) {
          retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
        } else {
          retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
        }
      });
    return retObj;
  }

  _fromProperties(properties: any): Target {
    const target = new Target();
    Object.keys(properties).forEach(prop => target[prop] = properties[prop].term);
    return target;
  }


}




