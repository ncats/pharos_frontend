import {PharosProperty} from '../app/models/pharos-property';

class SourceObject {
  source?: PharosProperty;
  targetCount?: PharosProperty;
  diseaseCount?: PharosProperty;
  ligandCount?: PharosProperty;
}

export const SOURCES: SourceObject[] =
  [
    {
      source: {
        term: 'Bioplex'
      },
      targetCount: {
        term: 6400,
        internalLink: '/idg/targets?facet=Data+Source/BioPlex'
      }
    },
    {
      source: {
        term: 'CTD',
        externalLink: 'https://ctdbase.org/'
      },
      targetCount: {
        term: 7446,
        internalLink: '/idg/targets?facet=Data+Source/CTD'
      },
      diseaseCount: {
        term: 5699,
        internalLink: '/idg/diseases?facet=Data+Source/CTD'
      }
    },
    {
      source:
        {
          term: 'Cell Surface Protein Atlas',
          externalLink: 'http://wlab.ethz.ch/cspa/'
        },
      targetCount: {
        term: 1038,
        internalLink: '/idg/targets?facet=Data+Source/Cell+Surface+Protein+Atlas'
      }
    },
    {
      source:
        {
          term: 'Consensus',
          externalLink: '"http://targetcentral.ws'
        },
      targetCount: {
        term: 18503,
        internalLink: '/idg/targets?facet=Data+Source/Consensus'
      }
    },
    {
      source:
        {
          term: 'Drug Label',
          externalLink: 'https://dailymed.nlm.nih.gov/dailymed/'
        },
      ligandCount: {
        term: 219,
        internalLink: '/idg/ligands?facet=Data+Source/DRUG+LABEL'
      }
    },
    {
      source:
        {
          term: 'DisGeNET',
          externalLink: 'http://www.disgenet.org'
        },
      targetCount: {
        term: 7631,
        internalLink: '/idg/targets?facet=Data+Source/DisGeNET'
      },
      diseaseCount: {
        term: 12446,
        internalLink: '/idg/diseases?facet=Data+Source/DisGeNET'
      }
    },
    {
      source:
        {
          term: 'Disease Ontology',
          externalLink: 'http://www.disease-ontology.org'
        }
    },
    {
      source:
        {
          term: 'DrugCentral Indication',
          externalLink: 'http://drugcentral.org/'
        },
      targetCount: {
        term: 911,
        internalLink: '/idg/targets?facet=Data+Source/DrugCentral+Indication'
      },
      diseaseCount: {
        term: 1234,
        internalLink: '/idg/diseases?facet=Data+Source/DrugCentral+Indication'
      }
    },
    {
      source:
        {
          term: 'EggNOG',
          externalLink: 'http://eggnogdb.embl.de'
        },
      targetCount: {
        term: 16120,
        internalLink: '/idg/targets?facet=Data+Source/EggNOG'
      }
    },
    {
      source:
        {
          term: 'Expression Atlas',
          externalLink: 'https://www.ebi.ac.uk/gxa/'
        },
      targetCount: {
        term: 16585,
        internalLink: '/idg/targets?facet=Data+Source/Expression+Atlas'
      },
      diseaseCount: {
        term: 142,
        internalLink: '/idg/diseases?facet=Data+Source/Expression+Atlas'
      }
    },
    {
      source:
        {
          term: 'GTEx',
          externalLink: 'http://www.gtexportal.org/'
        },
      targetCount: {
        term: 18679,
        internalLink: '/idg/targets?facet=Data+Source/GTEx'
      }
    },
    {
      source:
        {
          term: 'GWAS Catalog',
          externalLink: 'https://www.genome.gov/26525384'
        },
      targetCount: {
        term: 10255,
        internalLink: '/idg/targets?facet=Data+Source/GWAS+Catalog'
      }
    },
    {
      source:
        {
          term: 'HCA RNA',
          externalLink: 'https://www.humancellatlas.org'
        },
      targetCount: {
        term: 18868,
        internalLink: '/idg/targets?facet=Data+Source/HCA+RNA'
      }
    },
    {
      source:
        {
          term: 'HPA Protein',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 10414,
        internalLink: '/idg/targets?facet=Data+Source/HPA+Protein'
      }
    },
    {
      source:
        {
          term: 'HPA RNA',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 18499,
        internalLink: '/idg/targets?facet=Data+Source/HPA+RNA'
      }
    },
    {
      source:
        {
          term: 'HPM Gene'
        },
      targetCount: {
        term: 16026,
        internalLink: '/idg/targets?facet=Data+Source/HPM+Gene'
      }
    },
    {
      source:
        {
          term: 'HPM Protein',
          externalLink: 'http://www.humanproteomemap.org'
        },
      targetCount: {
        term: 16251,
        internalLink: '/idg/targets?facet=Data+Source/HPM+Protein'
      }
    },
    {
      source:
        {
          term: 'IMPC',
          externalLink: 'http://www.mousephenotype.org/data/secondaryproject/idg'
        },
      targetCount: {
        term: 3485,
        internalLink: '/idg/targets?facet=Data+Source/IMPC'
      }
    },
    {
      source:
        {
          term: 'IUPHAR',
          externalLink: 'http://www.guidetopharmacology.org/'
        },
      ligandCount: {
        term: 121,
        internalLink: '/idg/ligands?facet=Data+Source/IUPHAR'
      }
    },
    {
      source:
        {
          term: 'Inparanoid',
          externalLink: 'http://inparanoid.sbc.su.se/'
        },
      targetCount: {
        term: 4903,
        internalLink: '/idg/targets?facet=Data+Source/Inparanoid'
      }
    },
    {
      source:
        {
          term: 'JAX/MGI Human Ortholog Phenotype',
          externalLink: 'http://www.informatics.jax.org/'
        },
      targetCount: {
        term: 9720,
        internalLink: '/idg/targets?facet=Data+Source/JAX%2FMGI+Human+Ortholog+Phenotype'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment COSMIC',
        },
      targetCount: {
        term: 11445,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+COSMIC'
      },
      diseaseCount: {
        term: 83,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+COSMIC'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment DistiLD',
          externalLink: 'http://distild.jensenlab.org'
        },
      targetCount: {
        term: 3914,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+DistiLD'
      },
      diseaseCount: {
        term: 209,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+DistiLD'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment Exon Array',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 13611,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+Exon+array'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment HPA',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 15665,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment GNF',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 10637,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+GNF'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment HPA-RNA',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 16979,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA-RNA'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment HPM',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 15886,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPM'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment RNA-seq',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 15916,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+RNA-seq'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment UniGene',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 14935,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Experiment+UniGene'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment Knowledge GHR',
        },
      targetCount: {
        term: 2052,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Knowledge GHR'
      },
      diseaseCount: {
        term: 705,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge GHR'
      }
    },
    {
      source:
        {
          term: 'JensenLab Experiment Knowledge UniProtKB-KW',
          externalLink: 'http://diseases.jensenlab.org'
        },
      targetCount: {
        term: 2279,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      },
      diseaseCount: {
        term: 119,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      }
    },
    {
      source:
        {
          term: 'JensenLab Knowledge UniProtKB-RC',
          externalLink: 'http://tissues.jensenlab.org'
        },
      targetCount: {
        term: 16759,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-RC'
      }
    },
    {
      source:
        {
          term: 'JensenLab Text Mining',
          externalLink: 'http://diseases.jensenlab.org'
        },
      targetCount: {
        term: 15169,
        internalLink: '/idg/targets?facet=Data+Source/JensenLab+Text+Mining'
      },
      diseaseCount: {
        term: 4108,
        internalLink: '/idg/diseases?facet=Data+Source/JensenLab+Text+Mining'
      }
    },
    {
      source:
        {
          term: 'KEGG DRUG',
          externalLink: 'http://www.genome.jp/kegg/drug/'
        },
      ligandCount: {
        term: 44,
        internalLink: '/idg/ligands?facet=Data+Source/KEGG+DRUG'
      }
    },
    {
      source:
        {
          term: 'Monarch',
          externalLink: 'https://monarchinitiative.org/'
        },
      targetCount: {
        term: 3826,
        internalLink: '/idg/targets?facet=Data+Source/Monarch'
      },
      diseaseCount: {
        term: 5122,
        internalLink: '/idg/diseases?facet=Data+Source/Monarch'
      }
    },
    {
      source:
        {
          term: 'OMA',
          externalLink: 'https://omabrowser.org'
        },
      targetCount: {
        term: 17786,
        internalLink: '/idg/targets?facet=Data+Source/OMA'
      }
    },
    {
      source:
        {
          term: 'OMIM',
          externalLink: 'http://omim.org/'
        },
      targetCount: {
        term: 3731,
        internalLink: '/idg/targets?facet=Data+Source/OMIN'
      }
    },
    {
      source:
        {
          term: 'Reactome',
          externalLink: 'https://reactome.org/'
        },
      targetCount: {
        term: 1920,
        internalLink: '/idg/targets?facet=Data+Source/Reactome'
      }
    },
    {
      source:
        {
          term: 'SCientific Literature',
        },
      ligandCount: {
        term: 251,
        internalLink: '/idg/ligands?facet=Data+Source/SCIENTIFIC+LITERATURE'
      }
    },
    {
      source:
        {
          term: 'TCRDv5.2.0',
          externalLink: 'http://habanero.health.unm.edu'
        },
      targetCount: {
        term: 20244,
        internalLink: '/idg/targets?facet=Data+Source/TCRDv5.2.0'
      },
      diseaseCount: {
        term: 19880,
        internalLink: '/idg/diseases?facet=Data+Source/TCRDv5.2.0'
      },
      ligandCount: {
        term: 221871,
        internalLink: '/idg/ligands?facet=Data+Source/TCRDv5.2.0'
      }
    },
    {
      source:
        {
          term: 'UniProt',
          externalLink: 'http://www.uniprot.org'
        },
      targetCount: {
        term: 20244,
        internalLink: '/idg/targets?facet=Data+Source/UniProt'
      }
    },
    {
      source:
        {
          term: 'UniProt Tissue',
          externalLink: 'http://www.uniprot.org'
        },
      targetCount: {
        term: 17989,
        internalLink: '/idg/targets?facet=Data+Source/Uniprot+Tissue'
      }
    },
    {
      source:
        {
          term: 'Harmonizome',
          externalLink: 'http://amp.pharm.mssm.edu/Harmonizome/'
        },
      targetCount: {
        term: 18912,
        internalLink: '/idg/targets?facet=Data+Source/Harmonizome'
      }
    }
  ];
