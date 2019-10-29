import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import * as d3 from 'd3';
import {from} from 'rxjs';
import {PharosProperty} from '../../../../../models/pharos-property';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {DynamicTablePanelComponent} from '../../../../../tools/dynamic-table-panel/dynamic-table-panel.component';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../../../models/target';
import {PharosConfig} from '../../../../../../config/pharos-config';

/**
 * panel to show idg generated resources. currently stub functionality
 */
@Component({
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicTablePanelComponent implements OnInit, OnDestroy {

  @Input() target: Target;
  /**
   * dummy data
   */
  reagents = [
    {
      resourceType: 'Small Molecule',
      gene: 'CDK13',
      name: 'THZ531',
      logP_hydrophobicity: null,
      water_solubility: null,
      molecular_weight: '558.07',
      purity: null,
      ZINC_ID: null,
      chembl_id: null,
      pubchem_id: null,
      vendor_cat: 'https://www.medchemexpress.com/THZ531.html',
      vendor: 'MedChemExpress',
      smiles: 'ClC1=CN=C(N[C@H]2CN(C(C3=CC=C(NC(/C=C/CN(C)C)=O)C=C3)=O)CCC2)N=C1C4=CNC5=C4C=CC=C5',
      canonical_smiles: null,
      data_page_link: 'https://www.synapse.org/#!Synapse:syn18360510',
      external_id: '143122',
      external_id_registration_system: [
        'ChEBI'
      ],
      repository: null,
      repository_page_link: null
    },
/*    {
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
    },
    {
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
    }*/
  ];
  /**
   * dummy data
   */
  dataSources = [
/*    {
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
    }*/
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
   * set up nav sections
   * @param {HttpClient} http
   * @param {NavSectionsService} navSectionsService
   */
  constructor(
    private http: HttpClient,
    private navSectionsService: NavSectionsService,
    private pharosConfig: PharosConfig
  ) {
    super();
  }

  /**
   * subscribe to data changes
   * initialize filter subscriptions
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data.target) {
          this.ngUnsubscribe.next();
          this.target = this.data.target;
          this.loading = false;
          this.http.get(`http://dev3.ccs.miami.edu:8080/rss-api/target/search?term=${this.target.gene}`).subscribe(res => {
            console.log(res);
            if (res && res['data']) {
              res['data'].forEach(data => {
                this.http.get(`http://dev3.ccs.miami.edu:8080/rss-api/target/id?id=${data.id}&json=true`).subscribe(resource => {
                  console.log(resource);
                });
              });
            } else {

            }
          });
          // this.setterFunction();
        }
      });

    this.reagentsList = this.reagents;
    this.dataSourceList = this.dataSources;
    this.loading = false;


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

  parseSmiles(smiles) {
    return `${this.pharosConfig.getApiPath()}render/${encodeURIComponent(smiles)}?size=250`;
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
