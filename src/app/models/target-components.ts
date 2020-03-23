import gql from "graphql-tag";

const DISEASE_FIELDS = gql`
  fragment disease_fields on Disease {
    name
    associationCount
    associations {
      type
      name
      source
      zscore
      evidence
      conf
      reference
      log2foldchange
      pvalue
      score
    }
  }
`;

const TARGET_DISEASE_QUERY = gql`
  #import "./disease_fields.gql"
  query fetchDetails($term: String, $diseasetop: Int, $diseaseskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      diseases(top: $diseasetop, skip: $diseaseskip) {
        ...disease_fields
      }
    }
  }
${DISEASE_FIELDS}`;

const ORTHOLOG_FIELDS = gql`
  fragment ortholog_fields on Ortholog {
    species
    sym
    name
    dbid
    geneid
    source
  }`;

const TARGET_ORTHOLOG_QUERY = gql`
  #import "./ortholog_fields.gql"
  query fetchDetails($term: String, $orthologstop: Int, $orthologsskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      orthologs (top: $orthologstop, skip: $orthologsskip){
        ...ortholog_fields
      }
    }
  }
${ORTHOLOG_FIELDS}`;

/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
export const LIGANDLISTFIELDS = gql`
  fragment ligandsListFields on Ligand {
    ligid
    name
    description
    isdrug
    smiles
    synonyms {
      name
      value
    }
    activityCount:actcnt
  }
`;
/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
export const LIGANDDETAILSFIELDS = gql`
  fragment ligandsDetailsFields on Ligand {
    ...ligandsListFields
    activities(all: false) {
      type
      moa
      value
      reference
      target {
        symbol:sym
        idgTDL:tdl
        name:name
      }
      pubs {
        pmid
      }
    }
  }
  ${LIGANDLISTFIELDS}
`;
export const LIGANDDETAILSQUERY = gql`
  #import "./ligandsDetailsFields.gql"
  query fetchDetails(
    $term: String
  ) {
    ligands: ligand(ligid: $term){
      ...ligandsDetailsFields
    }
  }
  ${LIGANDDETAILSFIELDS}
`;

const TARGET_LIGAND_QUERY = gql`
  #import "./ligandsDetailsFields.gql"
  query fetchDetails($term: String, $ligandstop: Int, $ligandsskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      ligands (top: $ligandstop, skip: $ligandsskip, isdrug: false){
        ...ligandsDetailsFields
      }
    }
  }
${LIGANDDETAILSFIELDS}`;

const TARGET_DRUG_QUERY = gql`
  #import "./ligandsDetailsFields.gql"
  query fetchDetails($term: String, $ligandstop: Int, $ligandsskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      drugs:ligands (top: $ligandstop, skip: $ligandsskip, isdrug: true){
        ...ligandsDetailsFields
      }
    }
  }
${LIGANDDETAILSFIELDS}`;

/**
 * apollo graphQL query fragment to retrieve common fields for a target list view
 */
export const TARGETLISTFIELDS = gql`
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

const TARGET_PPI_QUERY = gql`
  #import "./targetsListFields.gql"
  query fetchDetails($term: String, $ppistop: Int, $ppisskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      ...targetsListFields
      ppis (top: $ppistop, skip: $ppisskip){
        target{
          ...targetsListFields
        }
      }
    }
  }
${TARGETLISTFIELDS}`;

export const PUBLICATION_FIELDS = gql`
  fragment publication_fields on PubMed {
    year
    pmid
    title
    journal
    abstract
  }`;

const TARGET_PUBS_QUERY = gql`
  #import "./publication_fields.gql"
  query fetchDetails($term: String, $publicationstop: Int, $publicationsskip: Int, $publicationsterm: String) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      publications: pubs(top: $publicationstop, skip: $publicationsskip, term: $publicationsterm) {
        ...publication_fields
      }
    }
  }
${PUBLICATION_FIELDS}`;


const TARGET_GENERIFS_QUERY = gql`
  #import "./publication_fields.gql"
  query fetchDetails($term: String, $generifstop: Int, $generifsskip: Int, $generifsterm: String) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      generifs (top: $generifstop, skip: $generifsskip term: $generifsterm){
        text
        pubs{
          ...publication_fields
        }
      }
    }
  }
${PUBLICATION_FIELDS}`;

export class TargetComponents {

  static getComponentPageQuery(component) {
    switch (component) {
      case('diseaseSources'):
        return TARGET_DISEASE_QUERY;
      case('orthologs'):
        return TARGET_ORTHOLOG_QUERY;
      case('ligands'):
        return TARGET_LIGAND_QUERY;
      case('drugs'):
        return TARGET_DRUG_QUERY;
      case('ppi'):
        return TARGET_PPI_QUERY;
      case('publications'):
        return TARGET_PUBS_QUERY;
      case('generifs'):
        return TARGET_GENERIFS_QUERY;
    }
    return null;
  }

}

/**
 * apollo graphQL query fragment to retrieve common fields for a target details view
 */
export const TARGETDETAILSFIELDS = gql`
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
    dto {
      name
    }
    pantherPaths{
      name
    }
    pantherClasses {
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
export const TARGETDETAILSQUERY = gql`
  #import "./targetsListFields.gql"
  #import "./ligandsDetailsFields.gql"
  query fetchDetails(
    $term: String,
    $diseasetop: Int,
    $diseaseskip: Int,
    $publicationstop: Int,
    $publicationsskip: Int,
    $publicationsterm: String,
    $generifstop: Int,
    $generifsskip: Int,
    $generifsterm: String,
    $orthologstop: Int,
    $orthologsskip: Int,
    $ppistop: Int,
    $ppisskip: Int,
    $drugstop: Int,
    $drugsskip: Int,
    $ligandstop: Int,
    $ligandsskip: Int
  ) {
    targets: target(q: {
      sym: $term,
      #tcrdid: $term,
      uniprot: $term,
      stringid:$term
    }) {
      ...targetsDetailsFields
      diseases(top: $diseasetop, skip: $diseaseskip) {
        name
        associationCount
        associations {
          type
          name
          source
          zscore
          evidence
          conf
          reference
          log2foldchange
          pvalue
          score
        }
      }
    }
  }
  ${TARGETDETAILSFIELDS}
`;
