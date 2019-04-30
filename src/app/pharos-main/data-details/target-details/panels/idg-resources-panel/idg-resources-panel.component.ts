import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from "rxjs/operators";
import * as d3 from 'd3';
import {from} from "rxjs";
import {PharosProperty} from "../../../../../models/pharos-property";


@Component({
  selector: 'pharos-idg-resources-panel',
  templateUrl: './idg-resources-panel.component.html',
  styleUrls: ['./idg-resources-panel.component.scss']
})
export class IdgResourcesPanelComponent extends DynamicPanelComponent implements OnInit {
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

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
          this.tableArr = this.data;
          // this.setterFunction();
        }
      });
    this.mockData();
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  mockData() {
    const r = this.getRandomInt(0, 5);
    const dat = [];
    from(d3.csv("./assets/antibody.csv")
      .then(data => {
        return data;
      })).subscribe(res => {
      console.log(res);
      console.log(r);
      const antibody = res[r];
      console.log(antibody);
      const id = new PharosProperty({
        term: antibody.ID,
        href: antibody.href, // todo: remove when this is standardized
        //  externalHref: 'targets?facet=' + facet.label.replace( / /g, '+') + '/'+facet.term.replace(/ /g, '+')
      });
      //   count: new Property({intval: 0}),

      const type = new PharosProperty({
        term: 'antibody'
      })

      const description = new PharosProperty({
        term: antibody.host + ' / ' + antibody.clone_ID + ' / ' + antibody.isotype,
      })

      const source = new PharosProperty({
        term: 'order antibody',
        externalHref: 'https://www.antibodiesinc.com/products/navbeta3-na-channel-n396-29'
      });

      this.tableArr.push({id: id, type: type, description: description, source: source});
    });
  }
}

const data = [
  {
  resourceType:'smallMolecule',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
  ,{
  resourceType:'antibody',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
{
  resourceType:'cell',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
  {
  resourceType:'geneticConstruct',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
  {
  resourceType:'mouse',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
  {
  resourceType:'peptide',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
  {
  resourceType:'mouseImagingData',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
  {
  resourceType:'probeData',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
},
  {
  resourceType:'dataResource',
  gene: "BRSK2",
  name: "GW296115",
  logP_hydrophobicity: null,
  water_solubility: null,
  molecular_weight: "385.38",
  purity: null,
  ZINC_ID: null,
  chembl_id: null,
  pubchem_id: null,
  vendor_cat: "https://infoporte.unc.edu/cores/buy.php?cid=144",
  vendor: "SGC-UNC",
  smiles: "COC1=CC2=C(NC3=C2C4=C(C(NC4=O)=O)C5=C3NC6=C5C=C(OC)C=C6)C=C1",
  canonical_smiles: null,
  data_page_link: "https://www.synapse.org/#!Synapse:syn18360506",
  external_id: "143121",
  external_id_registration_system: [
   "ChEBI"
  ],
  repository: null,
  repository_page_link: null
}
];


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
