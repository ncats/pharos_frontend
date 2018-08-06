import {
  ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren
} from '@angular/core';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';
import {TableData} from "../models/table-data";
import {Property} from "../models/property";


const SOURCES: any =
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
      targerCount: new Property({
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
          term: 'CHEMBL',
          externalHref: 'https://www.ebi.ac.uk/chembl'
        }),
      targetCount: new Property({
        term: 221848,
        internalHref: '/idg/ligands?facet=Data+Source/CHEMBL'
      })
    },
    {
      source:
        new Property({
          term: 'CHEMBL',
          externalHref: 'https://www.ebi.ac.uk/chembl'
        }),
      targetCount: new Property({
        term: 221848,
        internalHref: '/idg/ligands?facet=Data+Source/CHEMBL'
      })
    },
    {
      source:
        new Property({
          term: 'CHEMBL',
          externalHref: 'https://www.ebi.ac.uk/chembl'
        }),
      targetCount: new Property({
        term: 221848,
        internalHref: '/idg/ligands?facet=Data+Source/CHEMBL'
      })
    },
    {
      source:
        new Property({
          term: 'CHEMBL',
          externalHref: 'https://www.ebi.ac.uk/chembl'
        }),
      targetCount: new Property({
        term: 221848,
        internalHref: '/idg/ligands?facet=Data+Source/CHEMBL'
      })
    },
    {
      source:
        new Property({
          term: 'CHEMBL',
          externalHref: 'https://www.ebi.ac.uk/chembl'
        }),
      targetCount: new Property({
        term: 221848,
        internalHref: '/idg/ligands?facet=Data+Source/CHEMBL'
      })
    },
    {
      source:
        new Property({
          term: 'CHEMBL',
          externalHref: 'https://www.ebi.ac.uk/chembl'
        }),
      targetCount: new Property({
        term: 221848,
        internalHref: '/idg/ligands?facet=Data+Source/CHEMBL'
      })
    },
    {
      source:
        new Property({
          term: 'CHEMBL',
          externalHref: 'https://www.ebi.ac.uk/chembl'
        }),
      targetCount: new Property({
        term: 221848,
        internalHref: '/idg/ligands?facet=Data+Source/CHEMBL'
      })
    }
]


@Component({
  selector: 'pharos-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  activeElement = 'introduction';
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChildren('scrollSection') scrollSections: QueryList<ElementRef>;

  sourceFields: TableData[] = [
    new TableData({
      name: 'source',
      label: 'Source',
      sortable: true,
      sorted: 'asc'
    }),
    new TableData({
      name: 'targetCount',
      label: 'Targets',
      sortable: true
    }),
    new TableData({
      name: 'diseaseCount',
      label: 'Diseases',
      sortable: true
    }),
    new TableData({
      name: 'ligandCount',
      label: 'Ligands',
      sortable: true
    }),
  ];

  _sources: any;

  constructor(private renderer: Renderer2,
              private changeDetector: ChangeDetectorRef,
              private scrollDispatcher: ScrollDispatcher) {
    this._sources = SOURCES;
  }

  ngOnInit() {
    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => {
      if (data) {
        let scrollTop: number = data.getElementRef().nativeElement.scrollTop + 100;
        if (scrollTop === 100) {
          this.activeElement = 'introduction';
          this.changeDetector.detectChanges();
        } else {
          this.scrollSections.forEach(section => {
            scrollTop = scrollTop - section.nativeElement.scrollHeight;
            if (scrollTop >= 0) {
              this.activeElement = section.nativeElement.nextSibling.id;
              this.changeDetector.detectChanges();
            }
          });
        }
      }
    });
  }

  public scroll(el: any): void {
    el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
