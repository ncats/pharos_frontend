import gql from "graphql-tag";

/**
 * apollo graphQL query fragment to retrieve fields for disease associations for a target details view
 */
const DISEASE_FIELDS = gql`
  fragment disease_fields on Disease {
    name
    associationCount
    associations {
      did
      drug
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

/*
* apollo graphQL query to fetch the next page of disease association data
* */
const TARGET_DISEASE_QUERY = gql`
  query fetchDiseasePage($term: String, $diseasetop: Int, $diseaseskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      diseases(top: $diseasetop, skip: $diseaseskip) {
        ...disease_fields
      }
    }
  }
${DISEASE_FIELDS}`;

/**
 * apollo graphQL query fragment to retrieve fields for orthologs for a target details view
 */
const ORTHOLOG_FIELDS = gql`
  fragment ortholog_fields on Ortholog {
    species
    sym
    name
    dbid
    geneid
    source
  }`;

/*
* apollo graphQL query to fetch the next page of orthologs data
* */
const TARGET_ORTHOLOG_QUERY = gql`
  query fetchOrthologPage($term: String, $orthologstop: Int, $orthologsskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      orthologs (top: $orthologstop, skip: $orthologsskip){
        ...ortholog_fields
      }
    }
  }
${ORTHOLOG_FIELDS}`;

/**
 * apollo graphQL query fragment to retrieve ligand fields for a target list view or a target details view
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

export const LIGANDCARDFIELDS = gql`
  fragment ligandCardFields on Ligand {
    ligid
    name
    isdrug
    smiles
    synonyms {
      name
      value
    }
    activityCount:actcnt
    activities(all: false) {
      type
      moa
      value
    }
  }
`;

/**
 * apollo graphQL query fragment to retrieve ligand fields for a target details view
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
        accession:uniprot
      }
      pubs {
        pmid
      }
    }
  }
  ${LIGANDLISTFIELDS}
`;

export const LIGANDDETAILSQUERY = gql`
  query fetchLigandDetails(
    $term: String
  ) {
    ligands: ligand(ligid: $term){
      ...ligandsDetailsFields
    }
  }
  ${LIGANDDETAILSFIELDS}
`;

/*
* apollo graphQL query to fetch the next page of ligand data
* */
const TARGET_LIGAND_QUERY = gql`
  query fetchLigandPage($term: String, $ligandstop: Int, $ligandsskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      ligands (top: $ligandstop, skip: $ligandsskip, isdrug: false){
        ...ligandCardFields
      }
    }
  }
${LIGANDCARDFIELDS}`;

/*
* apollo graphQL query to fetch the next page of drugs data
* */
const TARGET_DRUG_QUERY = gql`
  query fetchDrugPage($term: String, $drugstop: Int, $drugsskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      drugs:ligands (top: $drugstop, skip: $drugsskip, isdrug: true){
        ...ligandCardFields
      }
    }
  }
${LIGANDCARDFIELDS}`;

export const TARGETCARDFIELDS = gql`
  fragment targetCardFields on Target {
    _tcrdid: tcrdid
    name
    gene: sym
    idgTDL: tdl
    idgFamily: fam
    accession: uniprot
    hgdata:harmonizome {
      summary {
        name
        value
      }
    }
  }
`;
export const TARGETLISTEXTRAS = gql`
    fragment targetsExtras on TargetResult {
      similarityTarget {
        gene: sym
        idgTDL: tdl
        accession: uniprot
      }
    }`;
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
    interactionDetails: ppiTargetInteractionDetails{
      ppitypes
      interaction_type
      evidence
      score
      p_ni
      p_int
      p_wrong
    }
    diseaseAssociationDetails{
      name
      type: dataType
      evidence
      zscore
      conf
      reference
      drug: drug_name
      log2foldchange
      pvalue
      score
      source
      O2S
      S2O
    }
    similarityDetails: similarity {
      jaccard
      overlap
      baseSize
      testSize
      commonOptions
    }
    uniProtFunction: props (name: "UniProt Function"){
      value
    }
    jensenScore: props(name: "JensenLab PubMed Score") {
      value
    }
    pubTatorScore: props(name: "PubTator Score") {
      value
    }
    antibodyURL: props(name: "Antibodypedia.com URL"){
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
        sources
      }
    }
    diseaseCounts {
      value
    }
  }
`;

/*
* apollo graphQL query to fetch the next page of protein-protein interaction data
* */
const TARGET_PPI_QUERY = gql`
  query fetchPPIpage($term: String, $ppistop: Int, $ppisskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      ...targetsListFields
      ppis (top: $ppistop, skip: $ppisskip){
        props{
          name
          value
        }
        target{
          ...targetCardFields
        }
      }
    }
  }
  ${TARGETCARDFIELDS}
${TARGETLISTFIELDS}`;

/**
 * apollo graphQL query fragment to retrieve fields for publications for a target details view
 */
export const PUBLICATION_FIELDS = gql`
  fragment publication_fields on PubMed {
    year
    pmid
    title
    journal
    abstract
  }`;

export const PATHWAY_FIELDS = gql`
  fragment pathway_fields on Pathway {
    name
    type
    url
    sourceID
    targetCounts{
      name
      value
    }
  }`;

/*
* apollo graphQL query to fetch the next page of publications data
* */
const TARGET_PUBS_QUERY = gql`
  query fetchPublicationPage($term: String, $publicationstop: Int, $publicationsskip: Int, $publicationsterm: String) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      publications: pubs(top: $publicationstop, skip: $publicationsskip, term: $publicationsterm) {
        ...publication_fields
      }
    }
  }
${PUBLICATION_FIELDS}`;

/*
* apollo graphQL query to fetch the next page of generifs data
* */
const TARGET_GENERIFS_QUERY = gql`
  query fetchGenerifPage($term: String, $generifstop: Int, $generifsskip: Int, $generifsterm: String) {
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

const TARGET_PATHWAYS_QUERY = gql`
  query fetchPathwaysPage($pwtype: String, $term: String, $pathwaystop: Int, $pathwaysskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      pathways(type:[$pwtype], top:$pathwaystop, skip:$pathwaysskip){
        ...pathway_fields
      }
    }
  }
${PATHWAY_FIELDS}`;

const TARGET_GO_COMPONENT_QUERY = gql`
  query fetchGoTerms($gotype: String, $term: String, $gotop: Int, $goskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      goComponent: go(top: $gotop, skip: $goskip, filter: {facets: [ {
        facet: "type"
        values: [$gotype]
      }]})
      {
        term
        evidence
        explanation
        assigned_by
      }
    }
  }`;
const TARGET_GO_PROCESS_QUERY = gql`
  query fetchGoTerms($gotype: String, $term: String, $gotop: Int, $goskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      goProcess: go(top: $gotop, skip: $goskip, filter: {facets: [ {
        facet: "type"
        values: [$gotype]
      }]})
      {
        term
        evidence
        explanation
        assigned_by
      }
    }
  }`;
const TARGET_GO_FUNCTION_QUERY = gql`
  query fetchGoTerms($gotype: String, $term: String, $gotop: Int, $goskip: Int) {
    targets: target(q: { sym: $term, uniprot: $term, stringid: $term }) {
      goFunction: go(top: $gotop, skip: $goskip, filter: {facets: [ {
        facet: "type"
        values: [$gotype]
      }]})
      {
        term
        evidence
        explanation
        assigned_by
      }
    }
  }`;

/**
 * apollo graphQL query fragment to retrieve target fields for a target details view
 */
export const TARGETDETAILSFIELDS = gql`
  fragment targetsDetailsFields on Target {
    ...targetsListFields
    dataSources
    sequence_variants {
      startResidue
      residue_info{
        aa
        bits
      }
    }
    sequence_annotations{
      startResidue
      endResidue
      type
      name
    }
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
    pathwayCounts{
      name
      value
    }
    pathways(top: 5, getTopForEachType: true){
      ...pathway_fields
    }
    pantherClasses {
      name
      pcid
      parents
    }
    pdbs: xrefs(source: "PDB") {
      name
    }
    ppis (top: $ppistop, skip: $ppisskip){
      props{
        name
        value
      }
      target{
        ...targetCardFields
      }
    }
    generifCount
    sequence: seq
    goCounts {
      value
      name
    }
    orthologCounts {value}
    orthologs (top: $orthologstop, skip: $orthologsskip){
      ...ortholog_fields
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
      ...ligandCardFields
    }
    ligands(top: $ligandstop, skip: $ligandsskip, isdrug: false) {
      ...ligandCardFields
    }

    publicationCount: pubCount
    publications: pubs(top: $publicationstop, skip: $publicationsskip, term: $publicationsterm) {
      ...publication_fields
    }
    generifCount
    generifs (top: $generifstop, skip: $generifsskip term: $generifsterm){
      text
      pubs {
        ...publication_fields
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
    expressions (top: 10000, filter: {
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
      url
      value
      evidence
      zscore
      conf
      pub {
        pmid
      }
      uberon {
        name
        uid
      }
    }
    uniprotKeyword:xrefs (source: "UniProt Keyword") {
      value
      name
    }
    goComponent:go (top: 10, filter: {facets: [ {
      facet: "type"
      values: ["C"]
    }
    ]
    }
    ) {
      term
      evidence
      explanation
      assigned_by
    }
    goFunction:go (top: 10, filter: {
      facets: [
        {
          facet: "type"
          values: ["F"]
        }
      ]
    }
    ) {
      term
      evidence
      explanation
      assigned_by
    }
    goProcess:go (top: 10, filter: {
      facets: [
        {
          facet: "type"
          values: ["P"]
        }
      ]
    }
    ) {
      term
      evidence
      explanation
      assigned_by
    }
    gwasAnalytics{
      ensgID
      traitCount
      studyCount
      associations {
        trait
        efoID
        studyCount
        snpCount
        wSnpCount
        geneCountForTrait
        studyCountForTrait
        medianPvalue
        medianOddsRatio
        betaCount
        meanStudyN
        rcras
        meanRank
        meanRankScore
        diseaseName
      }
    }
    gwasTrait: facetValues(facetName: "GWAS")
    mgiPhenotype: facetValues(facetName: "JAX/MGI Phenotype")
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
    interactingViruses {
      taxonomyID
      name
      nucleic1
      nucleic2
      order
      family
      subfamily
      genus
      species
      interactionDetails {
        finalLR
        protein_name
        protein_ncbi
        pdbIDs
      }
    }
  }

  ${TARGETLISTFIELDS}
  ${TARGETCARDFIELDS}
  ${LIGANDCARDFIELDS}
  ${ORTHOLOG_FIELDS}
  ${PUBLICATION_FIELDS}
  ${PATHWAY_FIELDS}
`;

/**
 * apollo graphQL query to retrieve the data for a target details view
 */
export const TARGETDETAILSQUERY = gql`
  query fetchTargetDetails(
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
        ...disease_fields
      }
    }
  }
  ${TARGETDETAILSFIELDS}
  ${DISEASE_FIELDS}
`;

/*
* Retrieves the appropriate apollo graphql query for pagination for the given component
* */
export class TargetComponents {
  static getComponentPageQuery(component: TargetComponents.Component) {
    switch (component) {
      case(TargetComponents.Component.DiseaseSources):
        return TARGET_DISEASE_QUERY;
      case(TargetComponents.Component.Orthologs):
        return TARGET_ORTHOLOG_QUERY;
      case(TargetComponents.Component.Ligands):
        return TARGET_LIGAND_QUERY;
      case(TargetComponents.Component.Drugs):
        return TARGET_DRUG_QUERY;
      case(TargetComponents.Component.ProteinProteinInteractions):
        return TARGET_PPI_QUERY;
      case(TargetComponents.Component.Publications):
        return TARGET_PUBS_QUERY;
      case(TargetComponents.Component.Generifs):
        return TARGET_GENERIFS_QUERY;
      case(TargetComponents.Component.PathwayPage):
        return TARGET_PATHWAYS_QUERY;
      case(TargetComponents.Component.GoComponent):
        return TARGET_GO_COMPONENT_QUERY;
      case(TargetComponents.Component.GoFunction):
        return TARGET_GO_FUNCTION_QUERY;
      case(TargetComponents.Component.GoProcess):
        return TARGET_GO_PROCESS_QUERY;
    }
    return null;
  }
}

/* Components which can be Paginated via getComponentPage */
export namespace TargetComponents {
  export enum Component {
    DiseaseSources,
    Orthologs,
    Ligands,
    Drugs,
    ProteinProteinInteractions,
    Publications,
    Generifs,
    PathwayPage,
    GoComponent,
    GoProcess,
    GoFunction
  }
}




