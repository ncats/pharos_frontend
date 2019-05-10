import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import * as d3 from 'd3';
import {from} from 'rxjs';
import {PharosProperty} from '../../../../../models/pharos-property';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {FormControl} from '@angular/forms';

/**
 * panel to show idg generated resources. currently stub functionality
 */
@Component({
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicTablePanelComponent implements OnInit {
  /**
   * dummy data
   */
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
  /**
   * dummy data
   */
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


  /**
   * data to be shown
   */
  tableArr: any[] = [];

  /**
   * set up nav sectinos
   * @param navSectionsService
   */
  constructor(
    private navSectionsService: NavSectionsService
  ) {
    super();
  }

  /**
   * subscribe to data changes
   * initialize filter subscriptions
   */
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
          // this.setterFunction();
        }
      });
  }

  /**
   * return thumbnail for resource type
   * @param type
   */
  getImageUrl(type: string): string {
    return `./assets/images/resource-type/${type}.png`;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
