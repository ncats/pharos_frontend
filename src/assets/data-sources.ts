import {Property} from '../app/models/property';

export const SOURCES: any =
  [
    {
      source:
        new Property({
          term: 'Bioplex'
        }),
      targetCount: new Property({
        term: 6400,
        internalHref: '/idg/targets?facet=Data+Source/BioPlex'
      })
    },
    {
      source:
        new Property({
          term: 'CTD',
          externalHref: 'https://ctdbase.org/'
        }),
      targetCount: new Property({
        term: 7446,
        internalHref: '/idg/targets?facet=Data+Source/CTD'
      }),
      diseaseCount: new Property({
        term: 5699,
        internalHref: '/idg/diseases?facet=Data+Source/CTD'
      })
    },
    {
      source:
        new Property({
          term: 'Cell Surface Protein Atlas',
          externalHref: 'http://wlab.ethz.ch/cspa/'
        }),
      targetCount: new Property({
        term: 1038,
        internalHref: '/idg/targets?facet=Data+Source/Cell+Surface+Protein+Atlas'
      })
    },
    {
      source:
        new Property({
          term: 'Consensus',
          externalHref: '"http://targetcentral.ws'
        }),
      targetCount: new Property({
        term: 18503,
        internalHref: '/idg/targets?facet=Data+Source/Consensus'
      })
    },
    {
      source:
        new Property({
          term: 'Drug Label',
          externalHref: 'https://dailymed.nlm.nih.gov/dailymed/'
        }),
      ligandCount: new Property({
        term: 219,
        internalHref: '/idg/ligands?facet=Data+Source/DRUG+LABEL'
      })
    },
    {
      source:
        new Property({
          term: 'DisGeNET',
          externalHref: 'http://www.disgenet.org'
        }),
      targetCount: new Property({
        term: 7631,
        internalHref: '/idg/targets?facet=Data+Source/DisGeNET'
      }),
      diseaseCount: new Property({
        term: 12446,
        internalHref: '/idg/diseases?facet=Data+Source/DisGeNET'
      })
    },
    {
      source:
        new Property({
          term: 'Disease Ontology',
          externalHref: 'http://www.disease-ontology.org'
        })
    },
    {
      source:
        new Property({
          term: 'DrugCentral Indication',
          externalHref: 'http://drugcentral.org/'
        }),
      targetCount: new Property({
        term: 911,
        internalHref: '/idg/targets?facet=Data+Source/DrugCentral+Indication'
      }),
      diseaseCount: new Property({
        term: 1234,
        internalHref: '/idg/diseases?facet=Data+Source/DrugCentral+Indication'
      })
    },
    {
      source:
        new Property({
          term: 'EggNOG',
          externalHref: 'http://eggnogdb.embl.de'
        }),
      targetCount: new Property({
        term: 16120,
        internalHref: '/idg/targets?facet=Data+Source/EggNOG'
      })
    },
    {
      source:
        new Property({
          term: 'Expression Atlas',
          externalHref: 'https://www.ebi.ac.uk/gxa/'
        }),
      targetCount: new Property({
        term: 16585,
        internalHref: '/idg/targets?facet=Data+Source/Expression+Atlas'
      }),
      diseaseCount: new Property({
        term: 142,
        internalHref: '/idg/diseases?facet=Data+Source/Expression+Atlas'
      })
    },
    {
      source:
        new Property({
          term: 'GTEx',
          externalHref: 'http://www.gtexportal.org/'
        }),
      targetCount: new Property({
        term: 18679,
        internalHref: '/idg/targets?facet=Data+Source/GTEx'
      })
    },
    {
      source:
        new Property({
          term: 'GWAS Catalog',
          externalHref: 'https://www.genome.gov/26525384'
        }),
      targetCount: new Property({
        term: 10255,
        internalHref: '/idg/targets?facet=Data+Source/GWAS+Catalog'
      })
    },
    {
      source:
        new Property({
          term: 'HCA RNA',
          externalHref: 'https://www.humancellatlas.org'
        }),
      targetCount: new Property({
        term: 18868,
        internalHref: '/idg/targets?facet=Data+Source/HCA+RNA'
      })
    },
    {
      source:
        new Property({
          term: 'HPA Protein',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 10414,
        internalHref: '/idg/targets?facet=Data+Source/HPA+Protein'
      })
    },
    {
      source:
        new Property({
          term: 'HPA RNA',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 18499,
        internalHref: '/idg/targets?facet=Data+Source/HPA+RNA'
      })
    },
    {
      source:
        new Property({
          term: 'HPM Gene'
        }),
      targetCount: new Property({
        term: 16026,
        internalHref: '/idg/targets?facet=Data+Source/HPM+Gene'
      })
    },
    {
      source:
        new Property({
          term: 'HPM Protein',
          externalHref: 'http://www.humanproteomemap.org'
        }),
      targetCount: new Property({
        term: 16251,
        internalHref: '/idg/targets?facet=Data+Source/HPM+Protein'
      })
    },
    {
      source:
        new Property({
          term: 'IMPC',
          externalHref: 'http://www.mousephenotype.org/data/secondaryproject/idg'
        }),
      targetCount: new Property({
        term: 3485,
        internalHref: '/idg/targets?facet=Data+Source/IMPC'
      })
    },
    {
      source:
        new Property({
          term: 'IUPHAR',
          externalHref: 'http://www.guidetopharmacology.org/'
        }),
      ligandCount: new Property({
        term: 121,
        internalHref: '/idg/ligands?facet=Data+Source/IUPHAR'
      })
    },
    {
      source:
        new Property({
          term: 'Inparanoid',
          externalHref: 'http://inparanoid.sbc.su.se/'
        }),
      targetCount: new Property({
        term: 4903,
        internalHref: '/idg/targets?facet=Data+Source/Inparanoid'
      })
    },
    {
      source:
        new Property({
          term: 'JAX/MGI Human Ortholog Phenotype',
          externalHref: 'http://www.informatics.jax.org/'
        }),
      targetCount: new Property({
        term: 9720,
        internalHref: '/idg/targets?facet=Data+Source/JAX%2FMGI+Human+Ortholog+Phenotype'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment COSMIC',
        }),
      targetCount: new Property({
        term: 11445,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+COSMIC'
      }),
      diseaseCount: new Property({
        term: 83,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+COSMIC'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment DistiLD',
          externalHref: 'http://distild.jensenlab.org'
        }),
      targetCount: new Property({
        term: 3914,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+DistiLD'
      }),
      diseaseCount: new Property({
        term: 209,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Experiment+DistiLD'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment Exon Array',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 13611,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+Exon+array'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment HPA',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 15665,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment GNF',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 10637,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+GNF'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment HPA-RNA',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 16979,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPA-RNA'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment HPM',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 15886,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+HPM'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment RNA-seq',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 15916,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+RNA-seq'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment UniGene',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 14935,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Experiment+UniGene'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment Knowledge GHR',
        }),
      targetCount: new Property({
        term: 2052,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Knowledge GHR'
      }),
      diseaseCount: new Property({
        term: 705,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge GHR'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Experiment Knowledge UniProtKB-KW',
          externalHref: 'http://diseases.jensenlab.org'
        }),
      targetCount: new Property({
        term: 2279,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      }),
      diseaseCount: new Property({
        term: 119,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Knowledge+UniProtKB-KW'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Knowledge UniProtKB-RC',
          externalHref: 'http://tissues.jensenlab.org'
        }),
      targetCount: new Property({
        term: 16759,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Knowledge+UniProtKB-RC'
      })
    },
    {
      source:
        new Property({
          term: 'JensenLab Text Mining',
          externalHref: 'http://diseases.jensenlab.org'
        }),
      targetCount: new Property({
        term: 15169,
        internalHref: '/idg/targets?facet=Data+Source/JensenLab+Text+Mining'
      }),
      diseaseCount: new Property({
        term: 4108,
        internalHref: '/idg/diseases?facet=Data+Source/JensenLab+Text+Mining'
      })
    },
    {
      source:
        new Property({
          term: 'KEGG DRUG',
          externalHref: 'http://www.genome.jp/kegg/drug/'
        }),
      ligandCount: new Property({
        term: 44,
        internalHref: '/idg/ligands?facet=Data+Source/KEGG+DRUG'
      })
    },
    {
      source:
        new Property({
          term: 'Monarch',
          externalHref: 'https://monarchinitiative.org/'
        }),
      targetCount: new Property({
        term: 3826,
        internalHref: '/idg/targets?facet=Data+Source/Monarch'
      }),
      diseaseCount: new Property({
        term: 5122,
        internalHref: '/idg/diseases?facet=Data+Source/Monarch'
      })
    },
    {
      source:
        new Property({
          term: 'OMA',
          externalHref: 'https://omabrowser.org'
        }),
      targetCount: new Property({
        term: 17786,
        internalHref: '/idg/targets?facet=Data+Source/OMA'
      })
    },
    {
      source:
        new Property({
          term: 'OMIM',
          externalHref: 'http://omim.org/'
        }),
      targetCount: new Property({
        term: 3731,
        internalHref: '/idg/targets?facet=Data+Source/OMIN'
      })
    },
    {
      source:
        new Property({
          term: 'Reactome',
          externalHref: 'https://reactome.org/'
        }),
      targetCount: new Property({
        term: 1920,
        internalHref: '/idg/targets?facet=Data+Source/Reactome'
      })
    },
    {
      source:
        new Property({
          term: 'SCientific Literature',
        }),
      ligandCount: new Property({
        term: 251,
        internalHref: '/idg/ligands?facet=Data+Source/SCIENTIFIC+LITERATURE'
      })
    },
    {
      source:
        new Property({
          term: 'TCRDv5.2.0',
          externalHref: 'http://habanero.health.unm.edu'
        }),
      targetCount: new Property({
        term: 20244,
        internalHref: '/idg/targets?facet=Data+Source/TCRDv5.2.0'
      }),
      diseaseCount: new Property({
        term: 19880,
        internalHref: '/idg/diseases?facet=Data+Source/TCRDv5.2.0'
      }),
      ligandCount: new Property({
        term: 221871,
        internalHref: '/idg/ligands?facet=Data+Source/TCRDv5.2.0'
      })
    },
    {
      source:
        new Property({
          term: 'UniProt',
          externalHref: 'http://www.uniprot.org'
        }),
      targetCount: new Property({
        term: 20244,
        internalHref: '/idg/targets?facet=Data+Source/UniProt'
      })
    },
    {
      source:
        new Property({
          term: 'UniProt Tissue',
          externalHref: 'http://www.uniprot.org'
        }),
      targetCount: new Property({
        term: 17989,
        internalHref: '/idg/targets?facet=Data+Source/Uniprot+Tissue'
      })
    },
    {
      source:
        new Property({
          term: 'Harmonizome',
          externalHref: 'http://amp.pharm.mssm.edu/Harmonizome/'
        }),
      targetCount: new Property({
        term: 18912,
        internalHref: '/idg/targets?facet=Data+Source/Harmonizome'
      })
    }
  ];
