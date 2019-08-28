import {PharosProperty} from '../app/models/pharos-property';

/**
 * onject to display data sources in about page
 */
class SourceObject {
  /**
   * name of data source
   */
  source?: PharosProperty;

  /**
   * number of targets associated with the source
   */
  targetCount?: PharosProperty;

  /**
   * number of diseases associated with the source
   */
  diseaseCount?: PharosProperty;

  /**
   * number of ligands associated with the source
   */
  ligandCount?: PharosProperty;
}

/**
 * list of data sources shown on about page
 * @type {({source: PharosProperty; targetCount: PharosProperty} | {source: PharosProperty; targetCount: PharosProperty;
  * diseaseCount: PharosProperty} | {source: PharosProperty; ligandCount: PharosProperty} | {source: PharosProperty} |
  * {source: PharosProperty; targetCount: PharosProperty; diseaseCount: PharosProperty; ligandCount: PharosProperty})[]}
 */
export const SOURCES: SourceObject[] =
  [
    {
      source:
        new PharosProperty({
          term: 'Bioplex'
        }),
      targetCount: new PharosProperty({
        term: 6400,
        internalLink: '/idg/targets?facet=Data+Source/BioPlex'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'CTD',
          externalLink: 'https://ctdbase.org/'
        }),
      targetCount: new PharosProperty({
        term: 7446,
        internalLink: '/idg/targets?facet=Data+Source/CTD'
      }),
      diseaseCount: new PharosProperty({
        term: 5699,
        internalLink: '/idg/diseases?facet=Data+Source/CTD'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Cell Surface Protein Atlas',
          externalLink: 'http://wlab.ethz.ch/cspa/'
        }),
      targetCount: new PharosProperty({
        term: 1038,
        internalLink: '/idg/targets?facet=Data+Source/Cell+Surface+Protein+Atlas'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Consensus',
          externalLink: '"http://targetcentral.ws'
        }),
      targetCount: new PharosProperty({
        term: 18503,
        internalLink: '/idg/targets?facet=Data+Source/Consensus'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Drug Label',
          externalLink: 'https://dailymed.nlm.nih.gov/dailymed/'
        }),
      ligandCount: new PharosProperty({
        term: 219,
        internalLink: '/idg/ligands?facet=Data+Source/DRUG+LABEL'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'DisGeNET',
          externalLink: 'http://www.disgenet.org'
        }),
      targetCount: new PharosProperty({
        term: 7631,
        internalLink: '/idg/targets?facet=Data+Source/DisGeNET'
      }),
      diseaseCount: new PharosProperty({
        term: 12446,
        internalLink: '/idg/diseases?facet=Data+Source/DisGeNET'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Disease Ontology',
          externalLink: 'http://www.disease-ontology.org'
        })
    },
    {
      source:
        new PharosProperty({
          term: 'DrugCentral Indication',
          externalLink: 'http://drugcentral.org/'
        }),
      targetCount: new PharosProperty({
        term: 911,
        internalLink: '/idg/targets?facet=Data+Source/DrugCentral+Indication'
      }),
      diseaseCount: new PharosProperty({
        term: 1234,
        internalLink: '/idg/diseases?facet=Data+Source/DrugCentral+Indication'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'EggNOG',
          externalLink: 'http://eggnogdb.embl.de'
        }),
      targetCount: new PharosProperty({
        term: 16120,
        internalLink: '/idg/targets?facet=Data+Source/EggNOG'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Expression Atlas',
          externalLink: 'https://www.ebi.ac.uk/gxa/'
        }),
      targetCount: new PharosProperty({
        term: 16585,
        internalLink: '/idg/targets?facet=Data+Source/Expression+Atlas'
      }),
      diseaseCount: new PharosProperty({
        term: 142,
        internalLink: '/idg/diseases?facet=Data+Source/Expression+Atlas'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'GTEx',
          externalLink: 'http://www.gtexportal.org/'
        }),
      targetCount: new PharosProperty({
        term: 18679,
        internalLink: '/idg/targets?facet=Data+Source/GTEx'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'GWAS Catalog',
          externalLink: 'https://www.genome.gov/26525384'
        }),
      targetCount: new PharosProperty({
        term: 10255,
        internalLink: '/idg/targets?facet=Data+Source/GWAS+Catalog'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HCA RNA',
          externalLink: 'https://www.humancellatlas.org'
        }),
      targetCount: new PharosProperty({
        term: 18868,
        internalLink: '/idg/targets?facet=Data+Source/HCA+RNA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPA Protein',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 10414,
        internalLink: '/idg/targets?facet=Data+Source/HPA+Protein'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPA RNA',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 18499,
        internalLink: '/idg/targets?facet=Data+Source/HPA+RNA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPM Gene'
        }),
      targetCount: new PharosProperty({
        term: 16026,
        internalLink: '/idg/targets?facet=Data+Source/HPM+Gene'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPM Protein',
          externalLink: 'http://www.humanproteomemap.org'
        }),
      targetCount: new PharosProperty({
        term: 16251,
        internalLink: '/idg/targets?facet=Data+Source/HPM+Protein'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'IMPC',
          externalLink: 'http://www.mousephenotype.org/data/secondaryproject/idg'
        }),
      targetCount: new PharosProperty({
        term: 3485,
        internalLink: '/idg/targets?facet=Data+Source/IMPC'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'IUPHAR',
          externalLink: 'http://www.guidetopharmacology.org/'
        }),
      ligandCount: new PharosProperty({
        term: 121,
        internalLink: '/idg/ligands?facet=Data+Source/IUPHAR'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Inparanoid',
          externalLink: 'http://inparanoid.sbc.su.se/'
        }),
      targetCount: new PharosProperty({
        term: 4903,
        internalLink: '/idg/targets?facet=Data+Source/Inparanoid'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JAX/MGI Human Ortholog Phenotype',
          externalLink: 'http://www.informatics.jax.org/'
        }),
      targetCount: new PharosProperty({
        term: 9720,
        internalLink: '/idg/targets?facet=Data+Source/JAX%2FMGI+Human+Ortholog+Phenotype'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment COSMIC',
        }),
      targetCount: new PharosProperty({
        term: 11445,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+COSMIC'
      }),
      diseaseCount: new PharosProperty({
        term: 83,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+COSMIC'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment DistiLD',
          externalLink: 'http://distild.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 3914,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+DistiLD'
      }),
      diseaseCount: new PharosProperty({
        term: 209,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+DistiLD'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment Exon Array',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 13611,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+Exon+array'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment HPA',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15665,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment GNF',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 10637,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+GNF'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment HPA-RNA',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 16979,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA-RNA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment HPM',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15886,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPM'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment RNA-seq',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15916,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+RNA-seq'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment UniGene',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 14935,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+UniGene'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment Knowledge GHR',
        }),
      targetCount: new PharosProperty({
        term: 2052,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Knowledge GHR'
      }),
      diseaseCount: new PharosProperty({
        term: 705,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge GHR'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment Knowledge UniProtKB-KW',
          externalLink: 'http://diseases.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 2279,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      }),
      diseaseCount: new PharosProperty({
        term: 119,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Knowledge UniProtKB-RC',
          externalLink: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 16759,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-RC'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Text Mining',
          externalLink: 'http://diseases.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15169,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Text+Mining'
      }),
      diseaseCount: new PharosProperty({
        term: 4108,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Text+Mining'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'KEGG DRUG',
          externalLink: 'http://www.genome.jp/kegg/drug/'
        }),
      ligandCount: new PharosProperty({
        term: 44,
        internalLink: '/idg/ligands?facet=Data+Source/KEGG+DRUG'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Monarch',
          externalLink: 'https://monarchinitiative.org/'
        }),
      targetCount: new PharosProperty({
        term: 3826,
        internalLink: '/idg/targets?facet=Data+Source/Monarch'
      }),
      diseaseCount: new PharosProperty({
        term: 5122,
        internalLink: '/idg/diseases?facet=Data+Source/Monarch'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'OMA',
          externalLink: 'https://omabrowser.org'
        }),
      targetCount: new PharosProperty({
        term: 17786,
        internalLink: '/idg/targets?facet=Data+Source/OMA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'OMIM',
          externalLink: 'http://omim.org/'
        }),
      targetCount: new PharosProperty({
        term: 3731,
        internalLink: '/idg/targets?facet=Data+Source/OMIN'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Reactome',
          externalLink: 'https://reactome.org/'
        }),
      targetCount: new PharosProperty({
        term: 1920,
        internalLink: '/idg/targets?facet=Data+Source/Reactome'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'SCientific Literature',
        }),
      ligandCount: new PharosProperty({
        term: 251,
        internalLink: '/idg/ligands?facet=Data+Source/SCIENTIFIC+LITERATURE'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'TCRDv5.2.0',
          externalLink: 'http://habanero.health.unm.edu'
        }),
      targetCount: new PharosProperty({
        term: 20244,
        internalLink: '/idg/targets?facet=Data+Source/TCRDv5.2.0'
      }),
      diseaseCount: new PharosProperty({
        term: 19880,
        internalLink: '/idg/diseases?facet=Data+Source/TCRDv5.2.0'
      }),
      ligandCount: new PharosProperty({
        term: 221871,
        internalLink: '/idg/ligands?facet=Data+Source/TCRDv5.2.0'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'UniProt',
          externalLink: 'http://www.uniprot.org'
        }),
      targetCount: new PharosProperty({
        term: 20244,
        internalLink: '/idg/targets?facet=Data+Source/UniProt'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'UniProt Tissue',
          externalLink: 'http://www.uniprot.org'
        }),
      targetCount: new PharosProperty({
        term: 17989,
        internalLink: '/idg/targets?facet=Data+Source/Uniprot+Tissue'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Harmonizome',
          externalLink: 'http://amp.pharm.mssm.edu/Harmonizome/'
        }),
      targetCount: new PharosProperty({
        term: 18912,
        internalLink: '/idg/targets?facet=Data+Source/Harmonizome'
      })
    }
  ];
