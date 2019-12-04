import {PharosBase, PharosSerializer, PharosSubList} from './pharos-base';
import {PharosProperty} from './pharos-property';
import gql from 'graphql-tag';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';
import {Publication, PublicationSerializer} from './publication';
import {PharosPoint} from './pharos-point';
import {Disease, DiseaseSerializer} from './disease';
import {Generif, GenerifSerializer} from './generif';
import {Ortholog, OrthologSerializer} from './ortholog';
import {Ligand, LigandSerializer} from './ligand';
import {LIGANDDETAILSFIELDS} from './ligand';

/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
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

/**
 * apollo graphQL query fragment to retrieve common fields for a target details view
 */
const TARGETDETAILSFIELDS = gql`
  #import "./targetsListFields.gql"
  #import "./ligandsDetailsFields.gql"
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
    name 
    }
    pdbs: xrefs(source: "PDB") {
      name
    }
    ppis (top: $ppistop, skip: $ppisskip){
      target{
        ...targetsListFields
      }
    }
    generifCount
    sequence: seq
    goCounts {value}
    orthologCounts {value}
     orthologs (top: $orthologstop, skip: $orthologsskip){
      species
      sym
      name
      dbid
      geneid
      source 
     }
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
    ligandCounts{
      name
      value
    }
  drugs:ligands(top: $drugstop, skip: $drugsskip, isdrug: true) {
      ...ligandsDetailsFields
    }
    ligands(top: $ligandstop, skip: $ligandsskip, isdrug: false) {
      ...ligandsDetailsFields
    }
    
    publicationCount: pubCount
    publications: pubs(top: $publicationstop, skip: $publicationsskip, term: $publicationsterm) {
      year
      pmid
      title
      journal
      abstract
    }
    generifCount
    generifs (top: $generifstop, skip: $generifsskip term: $generifsterm){
      text
      pubs {
        year
        pmid
        title
        journal
        abstract
      }
    }
    tinx {
      score
      novelty
      disease{
        doid
        name
      }
    }
   omimCount: mimCount 
   omimTerms:  mim {
      term
      mimid
    }
     expressions (top: 1000, filter: {
    facets: [ 
    {
      facet: "type"
      values: [ 
        "HPA",
       # "HCA RNA",
      "JensenLab Experiment HPA",
      "JensenLab Experiment GNF",
        "HPM Gene",
        "HPM Protein",
        "JensenLab Experiment HPA-RNA",
        "JensenLab Experiment HPM",
        "JensenLab Experiment Exon array",
        "Uniprot Tissue",
      # "Consensus",
        "JensenLab Experiment RNA-seq",
        "JensenLab Knowledge UniProtKB-RC",
        "JensenLab Text Mining",
        "JensenLab Experiment UniGene",
       "JensenLab Experiment Cardiac proteome"
      ]
    }
  ]
  }) {
    type
    tissue
    qual
    value
    evidence
  zscore
  conf
    uberon {
      name
      uid
    }
  }
     uniprotKeyword:xrefs (source: "UniProt Keyword") {
      value
      name
    }
    goComponent:go (filter: {facets: [ {
          facet: "type"
          values: ["C"]
        }
      ]
    }
    ) {
      term
    }
  goFunction:go (filter: {
      facets: [
        {
          facet: "type"
          values: ["F"]
        }
      ]
    }
    ) {
      term
    }
  goProcess:go (filter: {
      facets: [
        {
          facet: "type"
          values: ["P"]
        }
      ]
    }
    ) {
      term
    }

    hpaTissueSpecificityIndex: props(name: "HPA Tissue Specificity Index") {
      name
      value
    }
    hpmProteinTissueSpecificityIndex: props(name: "HPM Protein Tissue Specificity Index") {
      name
      value
    }
    gtexTissueSpecificityIndex: props(name: "GTEx Tissue Specificity Index") {
      name
      value
    }
    hpaRNATissueSpecificityIndex: props(name: "HPA RNA Tissue Specificity Index") {
      name
      value
    }
    hpaProteinTissueSpecificity: props(name: "HPA Protein Tissue Specificity") {
      name
      value
    }
    hpmGeneTissueSpecificityIndex: props(name: "HPM Gene Tissue Specificity Index") {
      name
      value
    }
  }
  
  ${TARGETLISTFIELDS}
  ${LIGANDDETAILSFIELDS}
`;



/**
 * main target object
 */
export class Target extends PharosBase {

  /**
   * fragment of common fields. fetched by the route resolver
   */
  static targetListFragments  = TARGETLISTFIELDS;

  /**
   * fragment of common fields. fetched by the route resolver
   */
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

  /**
   * list of uniprot ids
   */
  uniprotIds: string[] | any[];

  /**
   * list of gene symbols
   */
  symbols: string[];

  /**
   * gene sequence
   */
  sequence: string;

  /**
   * list of pdb ids
   */
  pdbs: any[];

  /**
   * list of harmonizome data
   */
  hgdata: any[];

  /**
   * antibodipedia.org antibody count
   */
  antibodyCount:  number;

  /**
   * Gene RiF count
   */
  generifCount:  number;

  /**
   * list of approved drugs
   */
  drugs: Ligand[];

  /**
   *list of active ligands
   */
  ligands: Ligand[];

  /**
   * array of pubtator scores for timeline
   */
  pubTatorScores: [{year, score}];

  /**
   * array of pubmed scores for timeline
   */
  pubmedScores: [{year, score}];

  /**
   * array of patent counts for timeline
   */
  patentCounts: [{year, count}];

  /**
   * list of ensembl ids
   */
  ensemblIDs: any[];

  /**
   * count og GO terms
   */
  goCount: number;

  /**
   * number of OMIM phenotypes
   */
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

  /**
   * pageable list of associated diseases
   * todo see how this relates to the disease association object
   */
  diseases: Disease[];

  /**
   * number of associated diseases
   */
  diseaseCount: number;

  /**
   * tin-x data
   */
  tinx: any;

  /**
   * number of patents
   */
  patentCount:  number;

  /**
   * knowledge availability score
   */
  knowledgeAvailability:  number;

  /**
   * pubtator literature score
   */
  pubTatorScore:  number;

  /**
   * number of associated publications
   */
  publicationCount: number;

  /**
   * pageable list of associated publications
   */
  publications: Publication[];

  /**
   * pageable list of generifs
   */
  generifs: Generif[];

  /**
   * pageable list of orthologs
   */
  orthologs: Ortholog[];

  /**
   * number of orthologs
   */
  orthologCounts: number;

  /**
   * pageable list of protein-protein interactions
   */
  ppis: Target[];

  /**
   * number of protein-protein interactions
   */
  ppiCount:  number | any[];

  /**
   * list of expression data
   */
  expressions: any[];

  ligandCount = 0;

  drugCount = 0;

  goComponent: string[];
  goFunction: string[];
  goProcess: string[];
  uniprotKeyword: string[];
  hpaTissueSpecificityIndex: [{name, value}];
  hpmProteinTissueSpecificityIndex: [{name, value}];
  gtexTissueSpecificityIndex: [{name, value}];
  hpaRNATissueSpecificityIndex: [{name, value}];
  hpaProteinTissueSpecificity: [{name, value}];
  hpmGeneTissueSpecificityIndex: [{name, value}];

}

/**
 * serializer for target object operations
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
      if (json.ppiCount.length > 0) {
        obj.ppiCount = json.ppiCount.reduce((prev, cur) => prev + cur.value, 0);
      }
    }

    if (json.uniprotIds) {
      obj.uniprotIds = [{uniprotId: obj.accession}, ...json.uniprotIds.map(id => id = {uniprotId: id.value})];
    } else {
      obj.uniprotIds = [{uniprotId: obj.accession}];
    }

    if (json.ensemblIDs) {
      obj.ensemblIDs = json.ensemblIDs.map(id => id = {ensemblId: id.name});
    }

    if (json.pdbs) {
      obj.pdbs = json.pdbs.map(id => id = {pdbs: id.name});
    }

    if (json.symbols) {
      obj.symbols = [...new Set<string>(json.symbols.map(sym => sym = {symbol: sym.value}))];
    }

    if (json.uniProtFunction && json.uniProtFunction.length > 0) {
      obj.description = `${(json.uniProtFunction.map(id => id.value)).join(' ')} ${obj.description}`;
    }

    if (json.goCounts) {
      obj.goCount = json.goCounts.reduce((prev, cur) => prev + cur.value, 0);
    }

    if (json.hgdata) {
      obj.hgdata = json.hgdata.summary.map(hg => {
        hg.value = hg.value.toFixed(2);
      return hg;
      });
    }

    if (json.diseaseCounts) {
      obj.diseaseCount = json.diseaseCounts.length;
    }

    if (json.orthologCounts) {
      obj.orthologCounts = json.orthologCounts.length;
    }

      if (json.ppis) {
      const targetSerializer = new TargetSerializer();
      obj.ppis = json.ppis.map(ppi =>  targetSerializer.fromJson(ppi['target']));
    }

    if (json.ligandCounts) {
      json.ligandCounts.forEach(count => {
        if (count.name === 'drug') {
          obj.drugCount = count.value;
        }
        if (count.name === 'ligand') {
          obj.ligandCount = count.value;
        }
    });
    }

  if (json.ligands) {
    const ligandSerializer = new LigandSerializer();
    obj.ligands = json.ligands
      .filter(lig => !lig['isdrug'])
      .map(ligand => ligandSerializer.fromJson(ligand));
  }

  if (json.drugs) {
    const ligandSerializer = new LigandSerializer();
    obj.drugs = json.drugs.map(ligand => ligandSerializer.fromJson(ligand));
  }

    if (json.publications) {
      const pubSerializer = new PublicationSerializer();
      obj.publications = json.publications.map(pub => pubSerializer.fromJson(pub));
    }

    if (json.generifs) {
      const generifSerializer = new GenerifSerializer();
      obj.generifs = json.generifs.map(rif => generifSerializer.fromJson(rif));
    }

      if (json.diseases) {
      const diseaseSerializer = new DiseaseSerializer();
      obj.diseases = json.diseases.map(disease => diseaseSerializer.fromJson(disease));
    }

    if (json.orthologs) {
      const orthologSerializer = new OrthologSerializer();
      obj.orthologs = json.orthologs.map(ortholog => orthologSerializer.fromJson(ortholog));
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

    if (newObj.ppis) {
      const targetSerializer = new TargetSerializer();
      newObj.ppis = obj.ppis.map(ppi => targetSerializer._asProperties(ppi));
    }

    if (newObj.generifs) {
      const generifSerializer = new GenerifSerializer();
      newObj.generifs = obj.generifs.map(generif => generifSerializer._asProperties(generif));
    }

    if (newObj.diseases) {
      const diseaseSerializer = new DiseaseSerializer();
      newObj.diseases = obj.diseases.map(disease => diseaseSerializer._asProperties(disease));
    }

    if (newObj.drugs) {
      const drugSerializer = new LigandSerializer();
      newObj.drugs = obj.drugs.map(drug => drugSerializer._asProperties(drug));
    }

    if (newObj.ligands) {
      const ligandSerializer = new LigandSerializer();
      newObj.ligands = obj.ligands.map(ligand => ligandSerializer._asProperties(ligand));
    }

    if (newObj.orthologs) {
      const orthologSerializer = new OrthologSerializer();
      newObj.orthologs = obj.orthologs.map(ortholog => orthologSerializer._asProperties(ortholog));
    }

    if (newObj.goComponent) {
       newObj.goComponent.forEach(component => {
          component.term.internalLink = ['/targets'];
          component.term.queryParams = {facet: `GO Component/${component.term.term}`};
          return component;
      });
    }

  if (newObj.goProcess) {
       newObj.goProcess.forEach(component => {
          component.term.internalLink = ['/targets'];
          component.term.queryParams = {facet: `GO Process/${component.term.term}`};
          return component;
      });
    }

  if (newObj.goFunction) {
       newObj.goFunction.forEach(component => {
          component.term.internalLink = ['/targets'];
          component.term.queryParams = {facet: `GO Function/${component.term.term}`};
          return component;
      });
    }
  if (newObj.uniprotKeyword) {
       newObj.uniprotKeyword.forEach(component => {
          component.value.internalLink = ['/targets'];
          component.value.externalLink = `https://www.uniprot.org/keywords/${component.name.term}`;
          component.value.queryParams = {facet: `UniProt Keyword/${component.value.term}`};
          return component.value;
      });
    }

    return newObj;
  }

  /**
   * recursive mapping function
   * @param obj
   * @return {{}}
   * @private
   */
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
}




