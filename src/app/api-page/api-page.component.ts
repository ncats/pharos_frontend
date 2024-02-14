import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {UnfurlingMetaService} from '../pharos-services/unfurling-meta.service';
import {environment} from '../../environments/environment';
import {FeatureTrackingService} from '../pharos-services/feature-tracking.service';
import { ApolloSandbox } from '@apollo/sandbox';
import {Clipboard} from '@angular/cdk/clipboard';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NavigationExtras, Router} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {PropertyDisplayComponent} from '../tools/generic-table/components/property-display/property-display.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

/**
 * ui page holder for a graphQL UI API documentation viewer
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatCardModule, PropertyDisplayComponent, MatExpansionModule, MatButtonModule, MatIconModule],
  selector: 'pharos-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.scss']
})

export class ApiPageComponent implements OnInit {
  /**
   * no args constructor
   */
  constructor(private clipboard: Clipboard,
              private router: Router,
              private sanitizer: DomSanitizer,
              private metaService: UnfurlingMetaService,
              private featureTrackingService: FeatureTrackingService,
              @Inject(PLATFORM_ID) private platformID: any) {
  }

  query: QueryDetails;
  queryInFrame: number;
  sandbox: any;

  queryMap: Map<number, QueryDetails> = new Map<number, QueryDetails>([
    [0,
      {
        name: 'Target details',
        key: 0,
        description: 'Given a gene symbol, this query fetches a number of simple details for the target.',
        query: QueryDetails.simpleTargetDetails
      }
    ],
    [1,
      {
        name: 'Disease details',
        key: 1,
        description: 'Given a disease name, this query fetches some basic information about a disease, and one ' +
          'level of descendents, based on the Disease Ontology hierarchy',
        query: QueryDetails.simpleDiseaseDetails
      }
    ],
    [2,
      {
        name: 'Ligand details',
        key: 2,
        description: 'Given a drug name, this query fetches some basic information about the drug ' +
          'and details of target activity measurements.',
        query: QueryDetails.simpleLigandDetails
      }
      ],
    [3,
      {
        name: 'Protein-protein interactions',
        key: 3,
        description: 'Given a target symbol, this query fetches some basic details of the top 5 interacting proteins, and details' +
          ' of that interaction.',
        query: QueryDetails.interactingProteins
      }],
    [4,
      {
        name: 'Disease associations',
        key: 4,
        description: 'There are two queries given here. Given a disease name, the first query fetches the top 5 assoc' +
          'iated targets, and details of that association. Given a target symbol, the second query fetches associated ' +
          'diseasese. (You may need to click \'prettify\' to execute both queries)',
        query: QueryDetails.associatedDiseases
      }],
    [5,
      {
        name: 'Facets for all targets',
        key: 5,
        description: 'Fetches the default facets for all targets in TCRD.',
        query: QueryDetails.facetsForAllTargets
      }],
    [6,
      {
        name: 'Facets for an associated disease',
        key: 6,
        description: 'Fetches the default facets for all targets associated with a given disease.',
        query: QueryDetails.facetsForTargetsForDisease
      }],
    [7,
      {
        name: 'Filtering by facet values',
        key: 7,
        description: 'Fetching the default facets, filtering by facet values. Note facets only filter the target list as ' +
          'it applies to the other facets, not themselves.',
        query: QueryDetails.filteringByFacets
      }],
    [8,
      {
        name: 'Fetching uncommon facets',
        key: 8,
        description: 'Uncommon facets can be fetched thusly.',
        query: QueryDetails.fetchingUncommonFacets
      }],
    [9,
      {
        name: 'All Facet Names',
        key: 9,
        description: 'All facets that are currently supported in a target list.',
        query: QueryDetails.getAllTargetFacets
      }]
  ]);

  changeQuery(details: QueryDetails) {
    this.queryInFrame = details.key;
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      fragment: 'filter-representation',
      queryParams: {document: details.query}
    };
    this.router.navigate([], navigationExtras);
    document.getElementById('embedded-sandbox').innerHTML = '';
    this.sandbox = new ApolloSandbox({
      target: '#embedded-sandbox',
      initialEndpoint: environment.graphqlUrl
    });
    this.featureTrackingService.trackFeature('API Example Query', details.name);
  }

  isActive(key: number) {
    return key === this.queryInFrame;
  }

  ngOnInit() {
    const newDescription = 'Build and run queries on the Pharos GraphQL server.';
    const newTitle = `Pharos: GraphQL API`;
    this.metaService.setMetaData({description: newDescription, title: newTitle});
    if (isPlatformBrowser(this.platformID)) {
      this.sandbox = new ApolloSandbox({
        target: '#embedded-sandbox',
        initialEndpoint: environment.graphqlUrl
      });
    }
  }
}

export class QueryDetails {

  static simpleTargetDetails = `
query targetDetails{
  target(q:{sym:"ACE2"}) {
    name
    tdl
    fam
    sym
    description
    novelty
  }
}`;

  static simpleDiseaseDetails = `
query diseaseDetails{
  disease(name:"asthma"){
    name
    mondoDescription
    uniprotDescription
    doDescription
    targetCounts {
      name
      value
    }
    children {
      name
      mondoDescription
    }
  }
}`;

  static simpleLigandDetails = `
query ligandDetails{
  ligand(ligid: "haloperidol") {
    name
    description
    isdrug
    synonyms {
      name
      value
    }
    smiles
    activities {
      target {
        sym
      }
      type
      value
    }
  }
}`;

  static interactingProteins = `
query interactingProteins{
  targets(filter: { associatedTarget: "CAMKK1" }) {
    targets(top:5) {
      name
      sym
      ppiTargetInteractionDetails {
        dataSources:ppitypes
        score
        interaction_type
        evidence
        p_ni
        p_int
        p_wrong
      }
    }
  }
}`;

  static associatedDiseases = `
query associatedTargets{
  targets(filter: { associatedDisease: "asthma" }) {
    targets(top: 5) {
      name
      sym
      diseaseAssociationDetails {
        name
        dataType
        evidence
      }
    }
  }
}
query associatedDiseases{
  diseases(filter:{associatedTarget:"ORMDL3"}){
    diseases{
      name
    }
  }
}`;

static facetsForAllTargets = `
query facetsForAllTargets {
  targets {
    facets {
      facet
      values {
        name
        value
      }
    }
  }
}`;

static facetsForTargetsForDisease = `
query facetsForTargetsForDisease {
  targets(filter: { associatedDisease: "asthma" }) {
    facets {
      facet
      dataType
      values {
        name
        value
      }
    }
  }
}`;
static filteringByFacets = `
query filteringByFacets {
  targets(
    filter: {
      facets: [{
        facet: "Target Development Level",
        values: ["Tclin", "Tchem"]
      }]
    }
  ) {
    facets {
      facet
      values {
        name
        value
      }
    }
  }
}`;
static fetchingUncommonFacets = `
query fetchingUncommonFacets {
  targets(facets:["Ortholog"]) {
    facets {
      facet
      values {
        name
        value
      }
    }
  }
}`;

static getAllTargetFacets = `
query getAllTargetFacets {
  targetFacets
}`;
  key: number;
  query: string;
  name: string;
  description: string;
}
