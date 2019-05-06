import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import * as d3 from 'd3';
import {from} from 'rxjs';
import {PharosProperty} from '../../../../../models/pharos-property';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicTablePanelComponent implements OnInit {
  reagents = [
    {
      resourceType: 'smallMolecule',
      gene: 'BRSK2',
      name: 'small molecule',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
    {
      resourceType: 'antibody',
      gene: 'BRSK2',
      name: 'antibody',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
    {
      resourceType: 'cell',
      gene: 'BRSK2',
      name: 'cell',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
    {
      resourceType: 'geneticConstruct',
      gene: 'BRSK2',
      name: 'geneticConstruct',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
    {
      resourceType: 'mouse',
      gene: 'BRSK2',
      name: 'mouse',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
    {
      resourceType: 'peptide',
      gene: 'BRSK2',
      name: 'peptide',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    }, {
      resourceType: 'smallMolecule',
      gene: 'BRSK2',
      name: 'reallyreallyreallylongchemicalname',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    }
  ];
  dataSources = [
    {
      resourceType: 'mouseImagingData',
      gene: 'BRSK2',
      name: 'mouseImagingData',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
    {
      resourceType: 'probeData',
      gene: 'BRSK2',
      name: 'probeData',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
    {
      resourceType: 'dataResource',
      gene: 'BRSK2',
      name: 'otherDataResource',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '385.38',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://infoporte.unc.edu/cores/buy.php?cid=144',
      vendor: 'SGC-UNC',
      smiles: 'COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360506',
      external_id: '143121',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    }
  ];
  reagentsList = [];
  dataSourceList = [];
  reagentFilterCtrl: FormControl = new FormControl();
  dataFilterCtrl: FormControl = new FormControl();

reagentTypes: string[] = [];
dataTypes: string[] = [];
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'id',
      label: 'ID',
      externalLink: true
    }),
    new PharosProperty({
      name: 'type',
      label: 'Resource Type',
    }),
    new PharosProperty({
      name: 'description',
      label: 'Description',
    }),
    new PharosProperty({
      name: 'source',
      label: 'Source',
    })
  ];


  species: string[];
  tableArr: any[] = [];

  constructor(
    private navSectionsService: NavSectionsService
  ) {
    super();
  }

  ngOnInit() {
    this.reagentsList = this.reagents;
    this.dataSourceList = this.dataSources;

    this.reagentFilterCtrl.valueChanges.subscribe(change => {
      this.reagentsList = [];
      change.forEach(field => {
        this.reagentsList.push(...this.reagents.filter(reagent => reagent.resourceType === field));
      });
    });

    this.dataFilterCtrl.valueChanges.subscribe(change => {
      this.dataSourceList = [];
      change.forEach(field => {
        this.dataSourceList.push(...this.dataSources.filter(reagent => reagent.resourceType === field));
      });
    });


    this.reagentTypes = Array.from(new Set(this.reagents.map(reagent => reagent.resourceType))).map(reagent => {
    const ret: any = {
      value: reagent,
      label: reagent.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
    };
    return ret;
  });

this.dataTypes = Array.from(new Set(this.dataSources.map(reagent => reagent.resourceType))).map(reagent => {
    const ret: any = {
      value: reagent,
      label: reagent.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')
    };
    return ret;
  });

this.pageData = this.makePageData(this.reagents.length);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          //  this.tableArr = this.data;
          // this.setterFunction();
        }
      });
   // this.mockData();
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  }

  mockData() {
    const r = this.getRandomInt(0, 5);
    const dat = [];
    from(d3.csv('./assets/antibody.csv')
      .then(data => {
        return data;
      })).subscribe(res => {
      const antibody = res[r];
      const id = new PharosProperty({
        term: antibody.ID,
        href: antibody.href, // todo: remove when this is standardized
        //  externalHref: 'targets?facet=' + facet.label.replace( / /g, '+') + '/'+facet.term.replace(/ /g, '+')
      });
      //   count: new Property({intval: 0}),

      const type = new PharosProperty({
        term: 'antibody'
      });

      const description = new PharosProperty({
        term: antibody.host + ' / ' + antibody.clone_ID + ' / ' + antibody.isotype,
      });

      const source = new PharosProperty({
        term: 'order antibody',
        externalHref: 'https://www.antibodiesinc.com/products/navbeta3-na-channel-n396-29'
      });

      this.tableArr.push({id: id, type: type, description: description, source: source});
    });
  }

  getImageUrl(type: string): string {
    return `./assets/images/resource-type/${type}.png`;
  }

  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}



/**
 * missing: resource type
 * generatic IC (is this necessary to show on Pharos?)
 * resource id from vendor
 *
 */


/*
ID: "AB4"
applications: "WB"
clone_ID: "N8B/1"
host: "mouse"
isotype: "IgG1"
target_gene_symbol: "Cacnb2"
target_species: "Mouse"
validation_ID: "valid18"
*/
