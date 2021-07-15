import {InjectionToken} from '@angular/core';
import {TOKENS} from '../config/component-tokens';
import {ARTICLES} from '../config/help-article-tokens';

enum Position {
  Header = 'headerPortalOutlet',
  Content = 'contentPortalOutlet',
  Left = 'leftPortalOutlet',
  Right = 'rightPortalOutlet',
}

/**
 * basic interface for a pharos api call configuration object
 */
interface PharosApi {
  /**
   * field name
   */
  field: string;

  /**
   * readable label
   */
  label?: string;

  /**
   * description of field/api call to be used in help panel
   */
  description?: string;

  /**
   * link to data source for this field
   */
  source?: string;

  /**
   * option injection token for adding a detailed article about the api to be used in help panel
   */
  article?: InjectionToken<string>;
}

/**
 * navigation header object, sets us the details sidenav
 */
interface PharosNavHeader {
  /**
   * readable label for section
   */
  label?: string;

  /**
   * variable for section
   */
  section?: string;

  /**
   * description of section to be used in help panel
   */
  mainDescription?: string;

  /**
   * link for the overall nav section
   */
  mainSource?: string | string[];
}

/**
 * main panel object that is injected into the page
 */
export interface PharosPanel {
  /**
   * token for the panel component
   */
  token: InjectionToken<string>;

  section?: Position;
  /**
   * navigation header to add to the sidenav
   */
  navHeader?: PharosNavHeader;

  /**
   * list of various api calls to retrieve data specific to the panel
   */
  api?: PharosApi[];
}

const commonGwasFields: PharosApi[] = [
  {
    field: 'studyCount',
    label: 'Study Count',
    description: 'Number of studies that have found the association between the gene and the trait'
  },
  {field: 'snpCount', label: 'SNP Count', description: 'Number of SNPs involved in the association'},
  {field: 'betaCount', label: 'Beta Count', description: 'Count of beta values with 95% confidence intervals that support the association'},
  {field: 'medianOddsRatio', label: 'Odds Ratio', description: 'Median Odds Ratio that supports the association'},
  {
    field: 'evidence',
    label: 'Evidence',
    description: 'Gene-trait pairs (GTs) are ranked based on selected variables, determined by benchmarking versus gold standard associations'
  },
  {
    field: 'provenance',
    label: 'Provenance',
    description: 'Link to the TIGA page for study details and publications supporting the association'
  }
];

const ppiInteractionFields: PharosApi[] = [
  {
    field: 'Score',
    label: 'score',
    description: 'String-DB score representing the confidence in the protein protein interaction.'
  },
  {
    field: 'p_int',
    label: 'p_int',
    description: 'BioPlex score representing the probability of the protein protein interaction.'
  },
  {
    field: 'p_ni',
    label: 'p_ni',
    description: 'BioPlex score representing the probability that the interaction detected was non-specific.'
  },
  {
    field: 'p_wrong',
    label: 'p_wrong',
    description: 'BioPlex score representing the probability that the interacting protein was wrongly identified.'
  }
];

const diseaseAssociationFields: PharosApi[] =
  [
    {
      field: 'evidence',
      label: 'evidence',
      description: 'A note from the data source regarding the evidence behind the association between disease and target.'
    },
    {
      field: 'zscore',
      label: 'zscore',
      description: 'A measure from JensenLab Text Mining quantifying the strength of the association between the disease and the target.'
    },
    {
      field: 'conf',
      label: 'conf',
      description: 'A measure from the JensenLab data sources quantifying the confidence in the association between the disease and the target.'
    },
    {
      field: 'drug_name',
      label: 'DrugCentral Indication',
      description: 'Based on data from DrugCentral, these are the names of drugs whose indication has yielded this association between disease and target.'
    },
    {
      field: 'log2foldchange',
      label: 'log2foldchange',
      description: 'Based on data from Expression Atlas, this measure quantifies the change in expression between the disease and non-disease states which yielded this association between disease and target.'
    },
    {
      field: 'pvalue',
      label: 'pvalue',
      description: 'The significance of the association between disease and target based on the Expression Atlas log2foldchange.'
    },
    {
      field: 'score',
      label: 'score',
      description: 'From DisGeNET, this measure quantifies the strength of evidence for the association between disease and target.'
    },
    {
      field: 'source',
      label: 'source',
      description: 'A note from DisGeNET or eRAM regarding the dataset which supplied the data.'
    },
    {
      field: 'S2O',
      label: 'S2O',
      description: 'A measure from Monarch quantifying the association betweeen disease and target.'
    }
  ];

const similarityFields: PharosApi[] =
  [
    {
      field: 'jaccard',
      label: 'Jaccard Index',
      description: 'A measure of the degree of overlap between two sets of values. It is calculated as the size of the union between' +
        ' the two sets, divided by the size of the intersection between the two sets. J(A,B) = |A ∩ B| / |A ∪ B|'
    },
    {
      field: 'common',
      label: 'Common Values',
      description: 'The shared values for the given measure that are common between the two targets.'
    }
  ];

const predictorResultsFields: PharosApi[] =
  [
    {
      field: 'predictedActivity',
      label: 'Predicted Activity',
      description: 'Predicted Activity (-log M) of the query structure against the target, based on the QSAR model.'
    },
    {
      field: 'trainingActivity',
      label: 'Nearest Activity',
      description: 'Activity (-log M) of the most similar compound from the training set against the target.'
    },
    {
      field: 'queryStructure',
      label: 'Query Structure',
      description: 'Rendered image of the query structure.'
    },
    {
      field: 'nearestStructure',
      label: 'Nearest Structure',
      description: 'Rendered image of the most similar compound from the training set.'
    },
    {
      field: 'applicability',
      label: 'Applicability (Similarity)',
      description: 'The Tanimoto similarity of the most similar compound from the training set to the query structure.'
    },
    {
      field: 'model',
      label: 'Model',
      description: 'Name of the QSAR model that generated the prediction.',
      source: 'https://predictor.ncats.io/predictor/models'
    },
  ];

const ligandAssocFields: PharosApi[] =
  [
    {
      field: 'actVals',
      label: 'Activity Values (-log M)',
      description: 'Activity values (-log M) for the ligand target interaction. There may be multiple values reported for each ligand target pair.'
    },
    {
      field: 'modeOfAction',
      label: 'Mode of Action',
      description: 'Modes of action documented for targets in the list against the associated ligand.'
    }
  ];

/**
 * main target list table component
 * @type {PharosPanel}
 */
const TARGET_TABLE_COMPONENT: PharosPanel = {
  token: TOKENS.TARGET_TABLE_COMPONENT,
  navHeader: {
    mainDescription: 'Shows the list of targets matching the search term, and facet selections.',
    section: 'targetList',
    label: 'Target List Details'
  },
  section: Position.Content,
  api: [
    {
      field: 'facets'
    },
    {
      field: 'data'
    },
    {
      field: 'tdl',
      label: 'Target Development Level',
      description: 'A classification of the degree to which proteins are studied or not studied, as evidenced by publications, tool compounds and other features.'
    },
    {
      field: 'gene',
      label: 'Gene',
      description: 'Official gene symbol'
    },
    {
      field: 'uniprot',
      label: 'UniProt',
      description: 'Primary UniProt accession number'
    },
    {
      field: 'family',
      label: 'Family',
      description: 'A broad classification of protein families'
    },
    {
      field: 'ppis',
      label: 'PPIs',
      description: 'Number of high confidence protein protein interactions for this target.'
    },
    {
      field: 'pubmed',
      label: 'PubMed Score',
      description: 'Jensen Lab generated fractional counting score for the prevalence of this target in PubMed articles.'
    },
    {
      field: 'pubtator',
      label: 'PubTator Score',
      description: 'A score based on text mining PubMed data.'
    },
    {
      field: 'abcount',
      label: 'Antibody Count',
      description: 'Number of antibodies for this target listed in antibodypedia.com.'
    },
    {
      field: 'novelty',
      label: 'Novelty',
      description: 'Tin-X metric for the relative scarcity of specific publications for this target.'
    },
    ...ppiInteractionFields,
    ...diseaseAssociationFields,
    ...ligandAssocFields,
    ...similarityFields,
    ...predictorResultsFields,
    {
      field: 'illuminationGraph',
      label: 'Illumination Graph',
      description: 'Radar plot depicting the variety of knowledge obtained by Pharos for this target.'
    }
  ]
};
/**
 * main target facet component
 * @type {PharosPanel}
 */
const PHAROS_FACETS_COMPONENT: PharosPanel = {
  token: TOKENS.PHAROS_FACETS_COMPONENT,
  section: Position.Left
};

/**
 * main target facet component
 * @type {PharosPanel}
 */
const PHAROS_SELECTED_FACET_LIST_COMPONENT: PharosPanel = {
  token: TOKENS.PHAROS_SELECTED_FACET_LIST_COMPONENT,
  section: Position.Content
};

/**
 * main target donut chart visualization component
 * @type {PharosPanel}
 */
const PHAROS_FACET_VISUALIZATION_COMPONENT: PharosPanel = {
  token: TOKENS.PHAROS_VISUALIZATION_COMPONENT,
  section: Position.Content,
  navHeader: {
    mainDescription: 'Summary Visualizations.',
    section: 'visualizations',
    label: 'Facet Visualizations'
  },
  api: [
    {
      description: 'A bar chart showing counts for intersecting sets for each facet value. The top 5 facet values and their intersections are' +
        ' shown by default. Edit the facet values for custom plots, and filter the list by clicking the bars or circles.',
      field: 'upset',
      label: 'UpSet Chart',
      source: 'https://jku-vds-lab.at/tools/upset/'
    }]
};

/**
 * main target details sub-navigation component
 * @type {PharosPanel}
 */
const PHAROS_SUBNAV_COMPONENT: PharosPanel = {
  token: TOKENS.PHAROS_SUBNAV_COMPONENT,
  section: Position.Left
};

/**
 * main target help panel component
 * @type {PharosPanel}
 */
const PHAROS_HELPPANEL_COMPONENT: PharosPanel = {
  token: TOKENS.PHAROS_HELPPANEL_COMPONENT,
  section: Position.Right
};

/**
 * main target header component
 * @type {PharosPanel}
 */
const TARGET_HEADER_COMPONENT: PharosPanel = {
  token: TOKENS.TARGET_HEADER_COMPONENT,
  section: Position.Header,
  api: []
};

/**
 * target breadcrumb component
 * @type {PharosPanel}
 */
const PHAROS_BREADCRUMB_COMPONENT: PharosPanel = {
  token: TOKENS.PHAROS_BREADCRUMB_COMPONENT,
  section: Position.Content,
  navHeader: {
    mainDescription: 'Heirarchical classifications for this protein from different ontologies.',
    section: 'classes',
    label: 'Protein Classes'
  },
  api: [
    {
      description: 'Classes for this protein according to Protein ANalysis THrough Evolutionary Relationships (PANTHER) Classification System.',
      field: 'panther',
      label: 'PANTHER Classes',
      source: 'http://pantherdb.org/'

    },
    {
      description: 'Classes for this protein according to by Drug Target Ontology (DTO).',
      field: 'dto',
      label: 'DTO Classes',
      source: 'http://drugtargetontology.org/'
    }
  ]
};

/**
 * target details page component
 * primary holder for all subsequent panels
 * @type {PharosPanel}
 */
const TARGET_DETAILS_COMPONENT: PharosPanel = {
  token: TOKENS.TARGET_DETAILS_COMPONENT,
  section: Position.Content,
  api: []
};

/**
 * target summary component
 * @type {PharosPanel}
 */
const SUMMARY_PANEL: PharosPanel = {
  token: TOKENS.SUMMARY_PANEL,
  navHeader: {
    label: 'Protein Summary',
    section: 'summary',
    mainDescription: 'Gene symbols, accession ids and various other target identifiers. Also contains the illumination ' +
      'graph which highlights the amount of knowledge available. Click the \'?\' button for more information'
  },
  api: [
    {
      field: 'description',
      label: 'Description',
      description: 'Description of the protein which includes the UniProt Function and the NCBI Gene Summary.'
    },
    {
      field: 'synonyms',
      label: 'Uniprot Accession IDs',
      description: 'Uniprot linked accession values, symbols or commonly used abbreviations associated with' +
        ' this particular target.',
      source: ''
    },
    {
      field: 'gene',
      label: 'Gene Name',
      description: 'Approved gene symbol with link to HUGO Gene Nomenclature Committee.'
    },
    {
      field: 'ensembl',
      label: 'Ensembl ID',
      description: 'Ensembl identifier links.',
      source: 'https://uswest.ensembl.org/'
    },
    {
      field: 'symbol',
      label: 'Symbol',
      description: 'List of abbreviations or acronyms of the full target name.'
    },
    {
      field: 'knowledge',
      label: 'Illumination Graph',
      description: 'Radar plot depicting the variety of knowledge obtained by Pharos for a particular target. ' +
        'The more spikes in the plot, the more variety. The longer the length, the higher the quantity of that particular ' +
        'knowledge. Clicking the illumination graph opens an expanded view to explore the plot fuller by seeing ' +
        'plot with annotations of the different radii.',
      article: ARTICLES.ILLUMINATION_GRAPH_ARTICLE
    },
    {
      field: 'knowledgeTable',
      label: 'Knowledge Table',
      description: 'Table representing the top 5 knowledge attributes in the illumination graph. ' +
        'The knowledge value property is on a scale of 0 to 1.'
    },
  ]
};

/**
 * target idg level summary component
 * @type {PharosPanel}
 */
const LEVEL_SUMMARY_PANEL: PharosPanel = {
  token: TOKENS.LEVEL_SUMMARY_PANEL,
  navHeader: {
    label: 'IDG Development Level Summary',
    section: 'development',
    mainDescription: 'Descriptions of the IDG illumination level highlighting the milestones attained in the research of ' +
      'this target.'
  },
  api: [
    {
      field: 'idgTDL',
      label: 'Target Development Level',
      description: 'Computed IDG Target Development Level',
      article: ARTICLES.TARGET_DEVELOPMENT_ARTICLE
    },
    {
      field: 'pubmed',
      label: 'Pubmed Score',
      description: 'Jensen Lab generated fractional counting score for the prevalence of this gene in Pubmed articles. ',
      article: ARTICLES.PUBMED_SCORE_ARTICLE
    },
    {
      field: 'generif',
      label: 'GeneRIF',
      description: 'Total count of NCBI Gene Reference Into Function hits for target listed in parenthesis, ' +
        'and summary table with links to publications per PMID with the specific text in article that includes ' +
        'the reported target.'
    },
    {
      field: 'antibodies',
      label: 'Antibody Count',
      description: 'Number of antibodies for this target listed in antibodypedia.com'
    },
    {
      field: 'goMolecularFunctions',
      label: 'Gene Ontology Molecular Function',
      description: 'Number of Gene Ontology (GO) annotations for this target, consisting of the sum of GO Functions and GO Processes.'
    },
    {
      field: 'goFunction',
      label: 'GO Function',
      description: 'Function listed by GO database for target, with total count listed in parenthesis. ' +
        'Listing individual functions with links to GO.'
    },
    {
      field: 'goComponent',
      label: 'GO Component',
      description: 'Cellular component listed by GO database for target, with total count listed in ' +
        'parenthesis. Listing individual functions with links to GO.'
    },
    {
      field: 'goProcess',
      label: 'GO Process',
      description: 'Biological process listed by GO database for target, with total count listed in parenthesis.' +
        'Listing individual functions with links to GO. Click on bargraph icon to explore further the Summary ' +
        'of GO Function.'
    },
    {
      field: 'ligandsCount',
      label: 'Ligands Count',
      description: 'Ligands associated with a target, listed in ChEMBL, with activity over a cutoff relative to the target' +
        'class.',
      article: ARTICLES.LIGAND_ACTIVITY_ARTICLE
    },
    {
      field: 'drugsCount',
      label: 'Drugs Count',
      description: 'Approved drugs associated with a target.'
    }
  ]
};

/**
 * idg resources for target panel component
 * @type {PharosPanel}
 */
const IDG_RESOURCES_PANEL: PharosPanel = {
  token: TOKENS.IDG_RESOURCES_PANEL,
  navHeader: {
    label: 'IDG Generated Resources',
    section: 'resources',
    mainDescription: 'Reagents and data sources generated by IDG partner organizations'
  },
  api: [
    {
      field: 'reagentsTab',
      label: 'Reagents Tab',
      description: 'View and order IDG produced resources from vendors. This can include: Small Molecules, Peptides, ' +
        'Antibodies, Genetic Constructs, Cell Lines and Mice.'
    },
    {
      field: 'dataResourcesTab',
      label: 'Data Resources Tab',
      description: 'View and explore IDG produced data sets. This can include: Datasets and Probe data.'
    },
    {
      field: 'mouseImagingTab',
      label: 'Mouse Imaging Tab',
      description: 'View and explore mouse expression data for this target.'
    }
  ]
};

/**
 * target disease relevance component
 * @type {PharosPanel}
 */
const DISEASE_SOURCE_PANEL: PharosPanel = {
  token: TOKENS.DISEASE_SOURCE_PANEL,
  navHeader: {
    label: 'Disease Associations by Source',
    section: 'diseaseSources',
    mainDescription: `This is a list of diseases associated with this target, compiled by several resources. Each
    resource provides different confidence measurements and association values, which are described below.`
  },
  api: [
    {
      field: 'did',
      label: 'Disease ID',
      description: 'Identifier the data source is using for this disease association.'
    },
    ...diseaseAssociationFields,
    {
      field: 'dataSources',
      label: 'Data Source Links',
      description: 'Associations between targets and diseases are based on data from several data sources. Click the button for links to each of them.',
      article: ARTICLES.ASSOCIATION_DATA_SOURCES_ARTICLE
    },
    {
      field: 'tinx',
      label: 'Disease Novelty (Tin-x)',
      description: 'TIN-X is an interactive visualization tool for discovering interesting associations between diseases ' +
        'and potential drug targets. Click the \'?\' button for more information.',
      article: ARTICLES.TINX_ARTICLE
    },
  ]
};

/**
 * ligands associated with target component
 * @type {PharosPanel}
 */
const LIGANDS_PANEL: PharosPanel = {
  token: TOKENS.LIGANDS_PANEL,
  navHeader: {
    label: 'Active Ligands',
    section: 'ligands',
    mainDescription: 'Active ligands that are associated with this target.'
  },
  api: [
    {
      field: 'ligands',
      label: 'Ligands',
      description: 'Table allowing for paging of active ligands ligand lists.',
      article: ARTICLES.LIGAND_ACTIVITY_ARTICLE
    },
    {
      field: 'activity',
      label: 'Activity Value',
      description: 'Activity value measured for the ligand against the given target. Units are -log (M), for example 1nM would correspond to a value of 9.'
    }
  ]
};

/**
 * approved drugs associated with target component
 * @type {PharosPanel}
 */
const DRUGS_PANEL: PharosPanel = {
  token: TOKENS.DRUGS_PANEL,
  navHeader: {
    label: 'Approved Drugs',
    section: 'drugs',
    mainDescription: 'Approved drugs that are associated with this target.'
  },
  api: [
    {
      field: 'drugs',
      label: 'Approved Drugs',
      description: 'Table allowing for paging of associated drugs.'
    },
    {
      field: 'activity',
      label: 'Activity Value',
      description: 'Activity value measured for the drug against the given target. Units are -log (M), for example 1nM would correspond to a value of 9.'
    }
  ]
};

/**
 * Protein data bank viewer component
 * @type {PharosPanel}
 */
const PDB_PANEL: PharosPanel = {
  token: TOKENS.PDB_PANEL,
  navHeader: {
    label: 'PDB Viewer',
    section: 'pdbview',
    mainDescription: 'List of proteins and ligands sourced from the RCSB PDB database'
  },
  api: [
    {
      field: 'pdb',
      label: 'Data Source',
      description: 'Proteins and ligands sourced from the RCSB PDB database'
    }
  ]
};

/**
 * tissue expression component
 * @type {PharosPanel}
 */
const EXPRESSION_PANEL: PharosPanel = {
  token: TOKENS.EXPRESSION_PANEL,
  navHeader: {
    label: 'Target Expression Data',
    section: 'expression',
    mainDescription: 'Expression data from various sources. When possible, tissues on the anatomograms are shaded ' +
      'according to the level of reported expression for the current data source. Data sources are sorted by the number of ' +
      'tissues evaluated for expression, but can be resorted alphabetically. Expand the tissue sections to survey data from ' +
      'all data sources providing evidence for that tissue. Data from the currently selected data source is shown with a ' +
      'border.'
  },
  api: [
    {
      field: 'expression',
      label: 'Human Tab',
      description: 'Tissues with expression data for this target.'
    },
    {
      field: 'cellTypes',
      label: 'Cell Types Tab',
      description: 'Cell types and cell lines with expression data for this target.'
    },
    {field: 'tissue', label: 'Tissue', description: 'Name of the tissue corresponding to the expression data.'},
    {
      field: 'qual',
      label: 'Qualitative',
      description: 'Qualitative description of the expression level (one of: High, Medium, Low, Not Detected). '
    },
    {
      field: 'value',
      label: 'Value',
      description: 'Text from the data source about the level of expression in the given tissue.'
    },
    {
      field: 'evidence',
      label: 'Evidence',
      description: 'Text from the data source about the evidence (one of: Curated, Approved, Enhanced, Supported).'
    },
    {
      field: 'zscore',
      label: 'zscore',
      description: 'A normalized measure from JensenLab Text Mining quantifying the confidence in the expression for this target in this tissue.'
    },
    {
      field: 'conf',
      label: 'Confidence',
      description: 'A measure from JensenLab Data Sources quantifying the confidence in the degree of expression for this target in this tissue.'
    },
    {field: 'pmid', label: 'Pubmed ID', description: 'Link to the publication for this expression data.'},
    {field: 'url', label: 'url', description: 'Link to explore this data in the original data source.'},
    {
      field: 'dataSources',
      label: 'Data Source Links',
      description: 'Expression data comes from a number of data sources. Click the button for links to each of them.',
      article: ARTICLES.EXPRESSION_DATA_SOURCES_ARTICLE
    },
  ]
};

const ORTHOLOG_VARIANT_PANEL: PharosPanel = {
  token: TOKENS.ORTHOLOG_VARIANT_PANEL,
  navHeader: {
    label: 'Ortholog Sequence Conservation',
    section: 'variants',
    mainDescription: 'A plot of the degree of conservation of each residue for homologous kinases, across many different species. ' +
      'Zooming in on the variant plot reveals the specific amino acids at each residue. ' +
      'Annotations are shown for different domains, motifs, and key amino acids aligned with the sequence variants. Data is from ProKinO.',
    mainSource: 'https://prokino.uga.edu/kinview/'
  }, api: [
    {
      field: 'none',
      label: 'Variant Data',
      description: 'Amino acid propensities for each residue are calculated based on the alignment of many ' +
        'kinases from orthologous species.'
    },
    {
      field: 'weblogoColors',
      label: 'WebLogo Color Code',
      description: 'Color coding for the zoomed in sequence variant plot. Amino acids are color coded according to chemical' +
        ' properties including: polar, neutral, basic, acidic, and hydrophobic.'
    },
    {
      field: 'annotations',
      label: 'Kinase Annotations',
      description: 'Annotations are shown for different domains, motifs, and key amino acids aligned with the sequence variants.'
    },
  ]
};

const GWAS_TARGET_ANALYTICS_PANEL: PharosPanel = {
  token: TOKENS.GWAS_TARGET_ANALYTICS_PANEL,
  navHeader: {
    label: 'GWAS Traits',
    section: 'tiga',
    mainDescription: 'Genome-wide association studies (GWAS) find associations between phenotypic traits and genes. Target Illumination ' +
      'GWAS Analytics (TIGA) scores and ranks those traits according to a subset of study parameters.',
    mainSource: 'https://unmtid-shinyapps.net/shiny/tiga/'
  }, api: [
    {
      field: 'reference', label: 'Citation', description: 'TIGA scores and ranks traits (or genes) by meanRank based on three variables: ' +
        '(1) pVal_mlog which is max(-Log(pValue)), (2) N_snpw, SNP count weighted by genomic distance, and (3) RCRAS, Relative Citation ' +
        'Ratio Aggregated Score, based on iCite RCR. These variables were selected by benchmark against the gold standard target-phenotype associations.',
      source: 'https://www.biorxiv.org/content/10.1101/2020.11.11.378596v2'
    },
    {field: 'gwasTrait', label: 'GWAS Trait', description: 'The phenotypic trait found to be associated with the gene'},
    {field: 'efoID', label: 'EFO ID', description: 'Experimental Factor Ontology (EFO) ID for the trait'},
    ...commonGwasFields
  ]
};
const ORTHOLOGS_PANEL: PharosPanel = {
  token: TOKENS.ORTHOLOGS_PANEL,
  navHeader: {
    label: 'Orthologs',
    section: 'orthologs',
    mainDescription: 'Orthologous proteins from other species, from OMA, EggNOG, and Inparanoid.',
    mainSource: ['https://omabrowser.org/oma/home/', 'http://eggnog.embl.de', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4383983/']
  }, api: [
    {
      field: 'sourceID',
      label: 'Source ID',
      description: 'The ID the orthologous gene is referenced by in the original data source.'
    },
    {
      field: 'geneID',
      label: 'Gene ID',
      description: 'The ID the gene from the original data source.'
    },
    {
      field: 'sources',
      label: 'OMA, EggNOG, Inparanoid',
      description: 'Data Sources which have documented the orthologous genes.'
    }
  ]
};

const AFFILIATE_LINKS_PANEL: PharosPanel = {
  token: TOKENS.AFFILIATE_LINKS,
  navHeader: {
    label: 'Related Tools',
    section: 'affiliates',
    mainDescription: 'A list of related tools that have content for this sprotein. '
  }, api: [
    {
      field: 'gototool',
      label: 'Go to tool',
      description: 'Navigate to the tool, in a new tab.'
    }
  ]
};

const GO_TERMS_PANEL: PharosPanel = {
  token: TOKENS.GO_TERMS_PANEL,
  navHeader: {
    label: 'Gene Ontology Terms',
    section: 'goTerms',
    mainDescription: 'A network of biological classes describing the molecular function, cellular locations, and processes genes may carry out, as defined by the Gene Ontology Consortium.',
    mainSource: 'http://geneontology.org/'
  }, api: [
    {
      field: 'goFunction',
      label: 'Functions Tab',
      description: 'Function terms describe molecular activities performed by gene products. Terms may be broad, such as "catalytic activity" or narrow, such as "adenylate cyclase activity".'
    },
    {
      field: 'goComponent',
      label: 'Components Tab',
      description: 'Component terms describe locations relative to cellular structures in which a gene product performs a function.'
    },
    {
      field: 'goProcess',
      label: 'Processes Tab',
      description: 'Process terms describe larger "biological programs" accomplished by multiple molecular activities. Like Functions, Process terms can be broad, ' +
        'such as "DNA repair", or narrow, such as "pyrimidine nucleobase biosynthetic process".'
    },
    {
      field: 'evidence',
      label: 'Evidence',
      description: 'Evidence categories are defined by GO Consortium. The values shown here represent the evidence for the' +
        ' target\'s association with the assigned GO term. List are sorted by the evidence, starting with experimentally verified' +
        ' terms, phylogenetically-inferred terms, etc., as described below.',
      source: 'http://geneontology.org/docs/guide-go-evidence-codes/',
      article: ARTICLES.GO_TERMS_EVIDENCE_ARTICLE
    }
  ]
};

const PATHWAYS_PANEL: PharosPanel = {
  token: TOKENS.PATHWAYS_PANEL, navHeader: {
    label: 'Pathways',
    section: 'pathways',
    mainDescription: 'Biochemical pathways containing the current target.'
  },
  api: [
    {
      field: 'reactome',
      label: 'Reactome Tab',
      description: 'Pathways and diagrams from Reactome.',
    },

    {
      field: 'others',
      label: 'Other Resource Tabs',
      description: 'Pathways from other data sources, including KEGG, PathwayCommons, UniProt, and WikiPathways.',
    },
    {
      field: 'browser',
      label: 'Pathway Browser',
      description: 'Interactive representation of the selected pathway.',
      source: 'https://reactome.org/dev/diagram/js'
    },

    {
      field: 'name',
      label: 'Name',
      description: 'Name of the pathway'
    },
    {
      field: 'explore',
      label: 'Explore in Pharos',
      description: 'Explore within Pharos the list of targets in this pathway.'
    },
    {
      field: 'sourceLink',
      label: 'Explore in Source',
      description: 'Explore this pathway on the referenced data source.'
    },
    {
      field: 'dataSourceLinks',
      label: 'Links to Data Sources',
      description: 'Pathway data comes from multiple sources. Click the button for links to each of them',
      article: ARTICLES.PATHWAY_DATA_SOURCES_ARTICLE
    }
  ]
};
/**
 * protein to protein interaction component
 * @type {PharosPanel}
 */
const PROTEIN_PROTEIN_PANEL: PharosPanel = {
  token: TOKENS.PROTEIN_PROTEIN_PANEL,
  navHeader: {
    label: 'Protein to Protein Interactions',
    section: 'ppi',
    mainDescription: 'List of protein to protein interactions associated with this gene. Interactions are reported from Reactome, BioPlex, and StringDB. StringDB score must be above 0.400 to be shown here. Explore on the String-DB website to see lower likelihood targets.'
  },
  api: [
    {
      field: 'family',
      label: 'Family',
      description: 'A broad classification of protein families'
    },
    {
      field: 'Novelty',
      label: 'Novelty',
      description: 'Tin-X metric for the relative scarcity of specific publications for this target.'
    },
    ...ppiInteractionFields,
    {
      field: 'Data Source',
      label: 'Data Sources',
      description: 'Data Sources reporting this protein-protein interaction.'
    },
    {
      field: 'dataSourceLinks',
      label: 'Data Source Links',
      description: 'Interactions between targets are based on data from several data sources. Click the button for links to each of them.',
      article: ARTICLES.PPI_DATA_SOURCES_ARTICLE
    },
  ]
};

/**
 * Target predicted viral interactions
 */
const VIRAL_INTERACTIONS_PANEL: PharosPanel = {
  token: TOKENS.VIRAL_INTERACTIONS_PANEL,
  navHeader: {
    label: 'Predicted Viral Interactions',
    section: 'viral',
    mainDescription: 'Details about predicted viral interactions with this protein, from P-HIPSTer.'
  },
  api: [
    {
      field: 'LR',
      label: 'LR',
      description: 'The likelihood ratio (LR) describes the likelihood of an observed value for a particular feature ' +
        '(e.g. structural similarity of the two query proteins with respect to a protein complex) expected in a pair of ' +
        'interacting proteins in comparison with the likelihood for the same observed value in a pair of non-interacting ' +
        'proteins. Interactions shown here are limited to LR > 500.'
    }
  ]
};

/**
 * target publication statistics
 * @type {PharosPanel}
 */
const PUBLICATION_STATISTICS_PANEL: PharosPanel = {
  token: TOKENS.PUBLICATION_STATISTICS_PANEL,
  navHeader: {
    label: 'Publication Statistics',
    section: 'publicationStatistics',
    mainDescription: 'Statistics about the occurence of this target in literature, extracted via text mining. GeneRIFs,' +
      'and text-mined publications are also displayed. For more details, click the \'?\' button.'
  },
  api: [
    {
      field: 'pubmed',
      label: 'Pubmed Score',
      description: `The Pubmed Score (also sometimes referred to as the Jensen Score) is
      derived from text mining a set of Pubmed abstracts.`,
      article: ARTICLES.PUBMED_SCORE_ARTICLE
    },
    {
      field: 'pmscore',
      label: 'Pubmed Score Timeline',
      description: 'Timeline of pubmed scores for each available year.'
    },
    {
      field: 'pubtator',
      label: 'Pubtator Score Timeline',
      description: 'Timeline of pubtator scores for each available year.'
    },
    {
      field: 'patents',
      label: 'Patents Timeline',
      description: 'Timeline of patent counts for each available year.'
    }
  ]
};

/**
 * target publication and gene rif component
 * @type {PharosPanel}
 */
const RELATED_PUBLICATIONS_PANEL: PharosPanel = {
  token: TOKENS.RELATED_PUBLICATIONS_PANEL,
  navHeader: {
    label: 'Related Publications',
    section: 'relatedPublications',
    mainDescription: 'Text-mining extracted GeneRIFs, and publications. For more details, click the \'?\' button.'
  },
  api: [
    {
      field: 'publicationCount',
      label: 'Publication Count',
      description: 'Total count of text-mined publication hits for target listed in parenthesis'
    },
    {
      field: 'publications',
      label: 'Text Mined References',
      description: 'Publications associated with this target, as identified using the JensenLab text mining protocol'
    },
    {
      field: 'generifCount',
      label: 'GeneRIF Count',
      description: 'Total count of NCBI Gene Reference Into Function hits for target listed in parenthesis'
    },
    {
      field: 'generifs',
      label: 'GeneRIFs',
      description: 'Total count of NCBI Gene Reference Into Function hits for target listed in parenthesis, ' +
        'and summary table with links to publications per PMID with the specific text in article that includes ' +
        'the reported target.'
    }
  ]
};

/**
 * target sequence component
 * @type {PharosPanel}
 */
const AA_SEQUENCE_PANEL: PharosPanel = {
  token: TOKENS.AA_SEQUENCE_PANEL,
  navHeader: {
    label: 'Protein Sequence',
    section: 'sequence',
    mainDescription: 'Amino acid sequence, and a detailed sequence structure viewer via the Uniprot Protvista viewer.'
  },
  api: [

    {
      field: 'residues',
      label: 'Residue Counts',
      description: 'Bar chart summarizing the number of times each residue appears in the sequence. The bars represent ' +
        'the actual counts, while the gold lines represent the expected counts given the frequency of the amino acids in ' +
        'all human genes.'
    },
    {
      field: 'sequence',
      label: 'Sequence',
      description: 'Amino acid sequence of the target protein.'
    },
    {
      field: 'protvistaViewer',
      label: 'ProtVista Viewer',
      description: 'The protein sequence aligned with structural and functional annotations, as well as disease variants.',
      source: 'https://www.uniprot.org/'
    }
  ]
};

/**
 * list of facets related to target component
 * @type {PharosPanel}
 */
const TARGET_FACET_PANEL: PharosPanel = {
  token: TOKENS.TARGET_FACET_PANEL,
  navHeader: {
    label: 'Related Targets',
    section: 'relatedTargets',
    mainDescription: 'List of targets within Pharos that are related to this target.'
  },
  api: [
    {
      field: 'uniprotKeyword',
      label: 'Uniprot Keyword',
      description: 'Occurrence of this target in up to 10 categories of UniProt keywords.'
    },
    {
      field: 'gwasTrait',
      label: 'GWAS Trait',
      description: 'Occurrence of this target in up to 10 categories of GWAS Traits.'
    },
    {
      field: 'mgiPhenotype',
      label: 'MGI Phenotype',
      description: 'Occurrence of this target in up to 10 categories of JAX/MGI Phenotypes.'
    }
  ]
};


/*
*DISEASE COMPONENTS
*
 */

/**
 * main disease list component
 * @type {PharosPanel}
 */
const DISEASE_TABLE_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_TABLE_COMPONENT,
  section: Position.Content,
  api: [
    {
      field: 'facets',
    }, {
      field: 'data',
    }
  ]
};

/**
 * disease header component
 * @type {PharosPanel}
 */
const DISEASE_HEADER_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_HEADER_COMPONENT,
  section: Position.Header
};

/**
 * disease summary header component
 * @type {PharosPanel}
 */
const DISEASE_SUMMARY_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_SUMMARY_COMPONENT,
  navHeader: {
    label: 'Disease Summary',
    section: 'diseaseSummary',
    mainDescription: 'High level summary of knowledge for a disease, including descriptions and datasource references.'
  },
  api: [
    {
      field: 'associatedTargets',
      label: 'Associated Targets',
      description: 'Counts of Target Development Levels for diseases known to be associated with this disease. ' +
        'If the disease has a valid DOID, targets known to be associated with all child diseases are aggregated. ' +
        'Click "Explore Associated Targets" to view more facets and details for the target list.'
    },
    {
      field: 'uniprotDescription',
      label: 'UniProt Description',
      description: 'Description from UniProt.',
      source: 'https://www.uniprot.org/'
    },
    {
      field: 'doDescription',
      label: 'Disease Ontology Description',
      description: 'Description from Disease Ontology',
      source: 'https://disease-ontology.org/'
    },
    {
      field: 'datasourceRefs',
      label: 'DataSource References',
      description: 'DataSources which have contributed target associations to this disease, and the identifiers by which the disease is referenced.'
    }]
};

const DISEASE_DO_BROWSER_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_DO_BROWSER_COMPONENT,
  navHeader: {
    label: 'Disease Hierarchy',
    section: 'doBrowser',
    mainDescription: 'Related diseases are represented as parents or children following the disease heirarchy defined by Disease Ontology.',
    mainSource: 'https://disease-ontology.org/'
  },
  api: [
    {
      field: 'parents',
      label: 'Parents',
      description: 'Disease categories representing more general classifications of the current disease. ' +
        'Total count of associated targets, and a breakdown of targets by Target Development Level is shown.'
    }
    , {
      field: 'children',
      label: 'Children',
      description: 'Disease categories representing more specific classifications of the current disease. ' +
        'Total count of associated targets, and a breakdown of targets by Target Development Level is shown.'
    }
  ]
};

const DISEASE_GWAS_ANALYTICS_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_GWAS_ANALYTICS_COMPONENT,
  navHeader: {
    label: 'GWAS Targets',
    section: 'tiga',
    mainDescription: 'Genome-wide association studies (GWAS) find associations between phenotypic traits and genes. Target Illumination ' +
      'GWAS Analytics (TIGA) scores and ranks those traits according to a subset of study parameters.',
    mainSource: 'https://unmtid-shinyapps.net/shiny/tiga/'
  }, api: [
    {
      field: 'reference', label: 'Citation', description: 'TIGA scores and ranks traits (or genes) by meanRank based on three variables: ' +
        '(1) pVal_mlog which is max(-Log(pValue)), (2) N_snpw, SNP count weighted by genomic distance, and (3) RCRAS, Relative Citation ' +
        'Ratio Aggregated Score, based on iCite RCR. These variables were selected by benchmark against the gold standard target-phenotype associations.',
      source: 'https://www.biorxiv.org/content/10.1101/2020.11.11.378596v2'
    },
    {field: 'gwasTrait', label: 'trait', description: 'The phenotypic trait found to be associated with the genes in the list.'},
    {field: 'target', label: 'Target', description: 'The target found to be associated with the disease.'},
    {field: 'tdl', label: 'TDL', description: 'The target development level for the associated target'},
    ...commonGwasFields
  ]
};

const DISEASE_TINX_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_TINX_COMPONENT,
  navHeader: {
    label: 'Target Novelty',
    section: 'diseaseTINX',
    mainDescription: 'The calculated importance and novelty for targets associated with this disease or it\'s children.',
    mainSource: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5870731/'
  },
  api: [
    {
      field: 'importance',
      label: 'Importance',
      description: 'A bibliometric statistic that estimates the strength of the association between a target and a disease.'
    },
    {
      field: 'novelty',
      label: 'Novelty',
      description: 'A bibliometric statistic that estimates the scarcity of publications about a target.'
    }
  ]
};

/**
 * main disease details page component
 * @type {PharosPanel}
 */
const DISEASE_DETAILS_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_DETAILS_COMPONENT,
  api: []
};

/**
 * list of targets associated with a disease component
 * @type {PharosPanel}
 */
const TARGET_LIST_PANEL: PharosPanel = {
  token: TOKENS.TARGET_LIST_PANEL,
  navHeader: {
    label: 'Related Targets',
    section: 'relatedTargets',
    mainDescription: 'List of targets within Pharos that are related to this disease.'
  },
  api: [
    {
      field: 'targets',
      label: 'Related Targets',
      description: 'List of targets associated with this disease.'
    }
  ]
};

/**
 * main list of ligands component
 * @type {PharosPanel}
 */
const LIGAND_TABLE_COMPONENT: PharosPanel = {
  token: TOKENS.LIGAND_TABLE_COMPONENT,
  api: []
};

/**
 * main ligand header component
 * @type {PharosPanel}
 */
const LIGAND_HEADER_COMPONENT: PharosPanel = {
  token: TOKENS.LIGAND_HEADER_COMPONENT,
  api: []
};

/**
 * ligand description component
 * @type {PharosPanel}
 */
const LIGAND_DESCRIPTION_COMPONENT: PharosPanel = {
  token: TOKENS.LIGAND_DESCRIPTION_COMPONENT,

  api: [
    {
      field: 'description',
      description: 'Description of the ligand.'
    }
  ]
};

/**
 * ligand details component
 * @type {PharosPanel}
 */
const LIGAND_DETAILS_COMPONENT: PharosPanel = {
  token: TOKENS.LIGAND_DETAILS_COMPONENT,
  navHeader: {
    label: 'Ligand Details',
    section: 'details',
    mainDescription: 'Visual representation of the ligand, as well as synonyms and links to other information sources.'
  },
  api: [
    {
      field: 'structure',
      label: 'Structure',
      description: 'Structural formula for this ligand.'
    },
    {
      field: 'synonyms',
      label: 'Synonyms & Links',
      description: 'Synonyms for this ligand, and links to other sources that refer to it.'
    }
  ]
};

/**
 * targets related to a ligand component
 * @type {PharosPanel}
 */
const TARGET_RELEVANCE_PANEL: PharosPanel = {
  token: TOKENS.TARGET_RELEVANCE_PANEL,
  navHeader: {
    label: 'Related Targets',
    section: 'relatedTargets',
    mainDescription: 'List of targets within Pharos that are related to this ligand.'
  },
  api: [
    {
      field: 'targetRelevance',
      label: 'Target Relevance',
      description: 'List of targets this ligand has been tested on, passing the activity cutoff levels described.',
      article: ARTICLES.LIGAND_ACTIVITY_ARTICLE

    }
  ]
};

/**
 * ligand molecular definition component
 * @type {PharosPanel}
 */
const MOLECULAR_DEFINITION_PANEL: PharosPanel = {
  token: TOKENS.MOLECULAR_DEFINITION_PANEL,
  navHeader: {
    label: 'Molecular Definition',
    section: 'molecularDefinition',
    mainDescription: 'List of this ligand\'s molecular properties.'
  },
  api: [
    {
      field: 'properties',
      label: 'Molecular Properties',
      description: 'List of associated molecular properties.'
    }
  ]
};

/*
/!**
 * main list of topics component
 * @type {PharosPanel}
 *!/
const TOPIC_TABLE_COMPONENT: PharosPanel = {
  token: TOKENS.TOPIC_TABLE_COMPONENT,
  api: []
};

/!**
 * main topic details page component
 * @type {PharosPanel}
 *!/
const TOPIC_DETAILS_COMPONENT: PharosPanel = {
  token: TOKENS.TOPIC_DETAILS_COMPONENT,
  api: []
};
*/


/**
 * map of components to build section of pharos
 * @type {Map<string, any>}
 */
export const COMPONENTSCONFIG: Map<string, any> = new Map<string, any>(
  [
    ['targets', {
      list: {
        components: [
          PHAROS_FACETS_COMPONENT,
          PHAROS_FACET_VISUALIZATION_COMPONENT,
          PHAROS_SELECTED_FACET_LIST_COMPONENT,
          TARGET_TABLE_COMPONENT,
          PHAROS_HELPPANEL_COMPONENT
        ]
      },
      details: {
        components: [
          PHAROS_SUBNAV_COMPONENT,
          PHAROS_HELPPANEL_COMPONENT,
          TARGET_HEADER_COMPONENT,
          PHAROS_BREADCRUMB_COMPONENT,
          SUMMARY_PANEL,
          AFFILIATE_LINKS_PANEL,
          LEVEL_SUMMARY_PANEL,
          IDG_RESOURCES_PANEL,
          DRUGS_PANEL,
          LIGANDS_PANEL,
          DISEASE_SOURCE_PANEL,
          GWAS_TARGET_ANALYTICS_PANEL,
          ORTHOLOGS_PANEL,
          PDB_PANEL,
          PATHWAYS_PANEL,
          GO_TERMS_PANEL,
          VIRAL_INTERACTIONS_PANEL,
          EXPRESSION_PANEL,
          PROTEIN_PROTEIN_PANEL,
          PUBLICATION_STATISTICS_PANEL,
          RELATED_PUBLICATIONS_PANEL,
          AA_SEQUENCE_PANEL,
          ORTHOLOG_VARIANT_PANEL,
          TARGET_FACET_PANEL
        ]
      }
    }],
    ['diseases', {
      list: {
        components: [
          PHAROS_FACETS_COMPONENT,
          PHAROS_FACET_VISUALIZATION_COMPONENT,
          PHAROS_SELECTED_FACET_LIST_COMPONENT,
          DISEASE_TABLE_COMPONENT,
          PHAROS_HELPPANEL_COMPONENT
        ]
      },
      details: {
        components: [
          PHAROS_SUBNAV_COMPONENT,
          PHAROS_HELPPANEL_COMPONENT,
          DISEASE_HEADER_COMPONENT,
          DISEASE_SUMMARY_COMPONENT,
          DISEASE_GWAS_ANALYTICS_COMPONENT,
          DISEASE_DO_BROWSER_COMPONENT,
          DISEASE_TINX_COMPONENT
        ]
      }
    }],
    ['ligands', {
      list: {
        components: [
          PHAROS_FACETS_COMPONENT,
          PHAROS_FACET_VISUALIZATION_COMPONENT,
          PHAROS_SELECTED_FACET_LIST_COMPONENT,
          LIGAND_TABLE_COMPONENT,
          PHAROS_HELPPANEL_COMPONENT
        ]
      },
      details: {
        components: [
          //   PHAROS_BREADCRUMB_COMPONENT,
          PHAROS_HELPPANEL_COMPONENT,
          LIGAND_HEADER_COMPONENT,
          LIGAND_DESCRIPTION_COMPONENT,
          LIGAND_DETAILS_COMPONENT,
          TARGET_RELEVANCE_PANEL,
          //  MOLECULAR_DEFINITION_PANEL
        ]
      }
    }]
  ]
);
