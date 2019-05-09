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
 * @type {({source: PharosProperty; targetCount: PharosProperty} | {source: PharosProperty; targetCount: PharosProperty; diseaseCount: PharosProperty} | {source: PharosProperty; ligandCount: PharosProperty} | {source: PharosProperty} | {source: PharosProperty; targetCount: PharosProperty; diseaseCount: PharosProperty; ligandCount: PharosProperty})[]}
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
        internalHref: '/idg/targets?facet=Data+Source/BioPlex'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'CTD',
          externalHref: 'https://ctdbase.org/'
        }),
      targetCount: new PharosProperty({
        term: 7446,
        internalHref: '/idg/targets?facet=Data+Source/CTD'
      }),
      diseaseCount: new PharosProperty({
        term: 5699,
        internalHref: '/idg/diseases?facet=Data+Source/CTD'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Cell Surface Protein Atlas',
          externalHref: 'http://wlab.ethz.ch/cspa/'
        }),
      targetCount: new PharosProperty({
        term: 1038,
        internalHref: '/idg/targets?facet=Data+Source/Cell+Surface+Protein+Atlas'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Consensus',
          externalHref: '"http://targetcentral.ws'
        }),
      targetCount: new PharosProperty({
        term: 18503,
        internalHref: '/idg/targets?facet=Data+Source/Consensus'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Drug Label',
          externalHref: 'https://dailymed.nlm.nih.gov/dailymed/'
        }),
      ligandCount: new PharosProperty({
        term: 219,
        internalHref: '/idg/ligands?facet=Data+Source/DRUG+LABEL'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'DisGeNET',
          externalHref: 'http://www.disgenet.org'
        }),
      targetCount: new PharosProperty({
        term: 7631,
        internalHref: '/idg/targets?facet=Data+Source/DisGeNET'
      }),
      diseaseCount: new PharosProperty({
        term: 12446,
        internalHref: '/idg/diseases?facet=Data+Source/DisGeNET'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Disease Ontology',
          externalHref: 'http://www.disease-ontology.org'
        })
    },
    {
      source:
        new PharosProperty({
          term: 'DrugCentral Indication',
          externalHref: 'http://drugcentral.org/'
        }),
      targetCount: new PharosProperty({
        term: 911,
        internalHref: '/idg/targets?facet=Data+Source/DrugCentral+Indication'
      }),
      diseaseCount: new PharosProperty({
        term: 1234,
        internalHref: '/idg/diseases?facet=Data+Source/DrugCentral+Indication'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'EggNOG',
          externalHref: 'http://eggnogdb.embl.de'
        }),
      targetCount: new PharosProperty({
        term: 16120,
        internalHref: '/idg/targets?facet=Data+Source/EggNOG'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Expression Atlas',
          externalHref: 'https://www.ebi.ac.uk/gxa/'
        }),
      targetCount: new PharosProperty({
        term: 16585,
        internalHref: '/idg/targets?facet=Data+Source/Expression+Atlas'
      }),
      diseaseCount: new PharosProperty({
        term: 142,
        internalHref: '/idg/diseases?facet=Data+Source/Expression+Atlas'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'GTEx',
          externalHref: 'http://www.gtexportal.org/'
        }),
      targetCount: new PharosProperty({
        term: 18679,
        internalHref: '/idg/targets?facet=Data+Source/GTEx'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'GWAS Catalog',
          externalHref: 'https://www.genome.gov/26525384'
        }),
      targetCount: new PharosProperty({
        term: 10255,
        internalHref: '/idg/targets?facet=Data+Source/GWAS+Catalog'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HCA RNA',
          externalHref: 'https://www.humancellatlas.org'
        }),
      targetCount: new PharosProperty({
        term: 18868,
        internalHref: '/idg/targets?facet=Data+Source/HCA+RNA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPA Protein',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 10414,
        internalHref: '/idg/targets?facet=Data+Source/HPA+Protein'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPA RNA',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 18499,
        internalHref: '/idg/targets?facet=Data+Source/HPA+RNA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPM Gene'
        }),
      targetCount: new PharosProperty({
        term: 16026,
        internalHref: '/idg/targets?facet=Data+Source/HPM+Gene'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'HPM Protein',
          externalHref: 'http://www.humanproteomemap.org'
        }),
      targetCount: new PharosProperty({
        term: 16251,
        internalHref: '/idg/targets?facet=Data+Source/HPM+Protein'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'IMPC',
          externalHref: 'http://www.mousephenotype.org/data/secondaryproject/idg'
        }),
      targetCount: new PharosProperty({
        term: 3485,
        internalHref: '/idg/targets?facet=Data+Source/IMPC'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'IUPHAR',
          externalHref: 'http://www.guidetopharmacology.org/'
        }),
      ligandCount: new PharosProperty({
        term: 121,
        internalHref: '/idg/ligands?facet=Data+Source/IUPHAR'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Inparanoid',
          externalHref: 'http://inparanoid.sbc.su.se/'
        }),
      targetCount: new PharosProperty({
        term: 4903,
        internalHref: '/idg/targets?facet=Data+Source/Inparanoid'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JAX/MGI Human Ortholog Phenotype',
          externalHref: 'http://www.informatics.jax.org/'
        }),
      targetCount: new PharosProperty({
        term: 9720,
        internalHref: '/idg/targets?facet=Data+Source/JAX%2FMGI+Human+Ortholog+Phenotype'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment COSMIC',
        }),
      targetCount: new PharosProperty({
        term: 11445,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+COSMIC'
      }),
      diseaseCount: new PharosProperty({
        term: 83,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+COSMIC'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment DistiLD',
          externalHref: 'http://distild.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 3914,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+DistiLD'
      }),
      diseaseCount: new PharosProperty({
        term: 209,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+DistiLD'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment Exon Array',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 13611,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+Exon+array'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment HPA',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15665,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment GNF',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 10637,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+GNF'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment HPA-RNA',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 16979,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA-RNA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment HPM',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15886,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPM'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment RNA-seq',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15916,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+RNA-seq'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment UniGene',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 14935,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+UniGene'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment Knowledge GHR',
        }),
      targetCount: new PharosProperty({
        term: 2052,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Knowledge GHR'
      }),
      diseaseCount: new PharosProperty({
        term: 705,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge GHR'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Experiment Knowledge UniProtKB-KW',
          externalHref: 'http://diseases.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 2279,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      }),
      diseaseCount: new PharosProperty({
        term: 119,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Knowledge UniProtKB-RC',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 16759,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-RC'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'JensenLab Text Mining',
          externalHref: 'http://diseases.jensenlab.org'
        }),
      targetCount: new PharosProperty({
        term: 15169,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Text+Mining'
      }),
      diseaseCount: new PharosProperty({
        term: 4108,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Text+Mining'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'KEGG DRUG',
          externalHref: 'http://www.genome.jp/kegg/drug/'
        }),
      ligandCount: new PharosProperty({
        term: 44,
        internalHref: '/idg/ligands?facet=Data+Source/KEGG+DRUG'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Monarch',
          externalHref: 'https://monarchinitiative.org/'
        }),
      targetCount: new PharosProperty({
        term: 3826,
        internalHref: '/idg/targets?facet=Data+Source/Monarch'
      }),
      diseaseCount: new PharosProperty({
        term: 5122,
        internalHref: '/idg/diseases?facet=Data+Source/Monarch'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'OMA',
          externalHref: 'https://omabrowser.org'
        }),
      targetCount: new PharosProperty({
        term: 17786,
        internalHref: '/idg/targets?facet=Data+Source/OMA'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'OMIM',
          externalHref: 'http://omim.org/'
        }),
      targetCount: new PharosProperty({
        term: 3731,
        internalHref: '/idg/targets?facet=Data+Source/OMIN'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Reactome',
          externalHref: 'https://reactome.org/'
        }),
      targetCount: new PharosProperty({
        term: 1920,
        internalHref: '/idg/targets?facet=Data+Source/Reactome'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'SCientific Literature',
        }),
      ligandCount: new PharosProperty({
        term: 251,
        internalHref: '/idg/ligands?facet=Data+Source/SCIENTIFIC+LITERATURE'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'TCRDv5.2.0',
          externalHref: 'http://habanero.health.unm.edu'
        }),
      targetCount: new PharosProperty({
        term: 20244,
        internalHref: '/idg/targets?facet=Data+Source/TCRDv5.2.0'
      }),
      diseaseCount: new PharosProperty({
        term: 19880,
        internalHref: '/idg/diseases?facet=Data+Source/TCRDv5.2.0'
      }),
      ligandCount: new PharosProperty({
        term: 221871,
        internalHref: '/idg/ligands?facet=Data+Source/TCRDv5.2.0'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'UniProt',
          externalHref: 'http://www.uniprot.org'
        }),
      targetCount: new PharosProperty({
        term: 20244,
        internalHref: '/idg/targets?facet=Data+Source/UniProt'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'UniProt Tissue',
          externalHref: 'http://www.uniprot.org'
        }),
      targetCount: new PharosProperty({
        term: 17989,
        internalHref: '/idg/targets?facet=Data+Source/Uniprot+Tissue'
      })
    },
    {
      source:
        new PharosProperty({
          term: 'Harmonizome',
          externalHref: 'http://amp.pharm.mssm.edu/Harmonizome/'
        }),
      targetCount: new PharosProperty({
        term: 18912,
        internalHref: '/idg/targets?facet=Data+Source/Harmonizome'
      })
    }
  ];
