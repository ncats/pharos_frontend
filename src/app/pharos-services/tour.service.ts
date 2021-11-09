import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {isPlatformBrowser} from '@angular/common';
import {NavigationExtras, Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {CentralStorageService} from './central-storage.service';
import {toTitleCase} from 'codelyzer/util/utils';

export enum TourType {
  ListPagesTour = 'ListPagesTour',
  UpsetChartTour = 'UpsetChartTour',
  CustomListTour = 'CustomListTour',
  FilterValueEnrichment = 'FilterValueEnrichment',
  Heatmaps = 'Heatmaps',
  StructureSearchTour = 'StructureSearchTour',
  ProteinStructureTour = 'ProteinStructureTour',
  TargetExpressionTour = 'TargetExpressionTour',
  WhatsNew39 = 'WhatsNew39'
}


@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(
    private centralStorageService: CentralStorageService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformID: any) {
    if (isPlatformBrowser(this.platformID)) {
      this.loadPromise = import('angular-shepherd').then((shepherdLib: any) => {
        this.shepherdService = new shepherdLib.ShepherdService();
      });
      this.setSizeCutoffs();
    }
  }

  static nextButton = {
    classes: 'shepherd-button shepherd-button-primary',
    text: 'Next',
    type: 'next'
  };
  static cancelButton = {
    classes: 'shepherd-button shepherd-button-secondary',
    text: 'Exit',
    type: 'cancel'
  };
  static backButton = {
    classes: 'shepherd-button shepherd-button-primary',
    text: 'Back',
    type: 'back'
  };
  static completeButton = {
    classes: 'shepherd-button shepherd-button-primary',
    text: 'Complete',
    type: 'next'
  };
  static okayButton = {
    classes: 'shepherd-button shepherd-button-primary',
    text: 'OK',
    type: 'next'
  };

  allTutorials: TourDefinition[] = [
    {title: 'What\'s New in Version 3.9', storageKey: TourType.WhatsNew39},
    {title: 'Using the List Pages', storageKey: TourType.ListPagesTour},
    {title: 'Using the UpSet Chart', storageKey: TourType.UpsetChartTour},
    {title: 'Filter Value Enrichment', storageKey: TourType.FilterValueEnrichment},
    {title: 'Creating a Heatmap', storageKey: TourType.Heatmaps},
    {title: 'Uploading a Custom List', storageKey: TourType.CustomListTour},
    {title: 'Searching by Chemical Structure', storageKey: TourType.StructureSearchTour},
    {title: 'Viewing Protein Structure Data', storageKey: TourType.ProteinStructureTour},
    {title: 'Viewing Target Expression Data', storageKey: TourType.TargetExpressionTour},
  ];
  onlyButton = [TourService.okayButton];
  firstButtons = [TourService.cancelButton, TourService.nextButton];
  middleButtons = [TourService.cancelButton, TourService.backButton, TourService.nextButton];
  lastButtons = [TourService.backButton, TourService.completeButton];
  defaultStepOptions = {
    classes: '',
    cancelIcon: {
      enabled: true
    },
    scrollTo: true,
    highlightClass: 'highlight',
  };
  shepherdService: any;
  loadPromise: any;
  menuIsHidden = false;
  signinIsHidden = false;
  anatomogramIsHidden = false;

  runTutorial(tutorialName: string) {
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    this.loadPromise.then(() => {

      switch (tutorialName) {
        case TourType.WhatsNew39:
          this.whatsNew(true);
          break;
        case TourType.CustomListTour:
          this.runCustomListTour();
          break;
        case TourType.StructureSearchTour:
          this.runStructureSearchTour();
          break;
        case TourType.ListPagesTour:
          this.listPagesTour();
          break;
        case TourType.TargetExpressionTour:
          this.runExpressionTour();
          break;
        case TourType.ProteinStructureTour:
          this.runProteinStructureTour();
          break;
        case TourType.Heatmaps:
          this.runHeatmapTour();
          break;
        case TourType.FilterValueEnrichment:
          this.runFilterValueTour();
          break;
        case TourType.UpsetChartTour:
          this.runUpsetPlotTour();
          break;
        default:
          this.whatsNew(false);
          break;
      }
    });
  }

  setSizeCutoffs() {
    this.menuIsHidden = this.breakpointObserver.isMatched('(max-width: 959px)');
    this.signinIsHidden = this.breakpointObserver.isMatched('(max-width: 1059px)');
    this.anatomogramIsHidden = this.breakpointObserver.isMatched('(max-width: 1279px)');
  }

  tourScroller(element) {
    if (isPlatformBrowser(this.platformID)) {
      const yOffset = -120;
      let element1;
      // @ts-ignore
      if (this.section) {
        // @ts-ignore
        const id = this.section;
        element1 = document.getElementById(id);
        // @ts-ignore
      } else if (this.class) {
        // @ts-ignore
        element1 = document.getElementsByClassName(this.class)[0];
      }
      const y = element1.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  sidePanelScroller(element) {
    if (isPlatformBrowser(this.platformID)) {
      // @ts-ignore
      const parent = document.getElementById(this.parent).getElementsByClassName('mat-drawer-inner-container')[0];
      // @ts-ignore
      if (this.top) {
        parent.scrollTop = 0;
        return;
      }
      const yOffset = -120;
      let element1;
      // @ts-ignore
      if (this.section) {
        // @ts-ignore
        const id = this.section;
        element1 = document.getElementById(id);
        // @ts-ignore
      } else if (this.class) {
        // @ts-ignore
        element1 = parent.getElementsByClassName(this.class)[0];
      }
      const y = element1.getBoundingClientRect().top + window.pageYOffset + yOffset;
      parent.scrollTop = element1.offsetTop;
    }
  }

  whatsNew(manual: boolean = false) {
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    if (!manual && this.localStorageService.store.getItem(TourType.WhatsNew39)) { // only autorun once
      return;
    }
    this.loadPromise.then(() => {
      this.runWhatsNew();
    });
  }

  runWhatsNew() {
    const defaultSteps = [
      {
        scrollTo: false,
        buttons: this.firstButtons.slice(),
        title: 'What\'s new in Pharos 3.9?',
        text: ['Pharos has many new features in version 3.9, including Heatmaps and Filter Value Enrichment calculations on the list pages, ' +
        'predicted Target-Ligand activities, and an improved text search functionality. The TCRD 6.12.4 update has also brought us a lot of fresh data from ChEMBL and DrugCentral.' +
        ' Click \'Next\' for a tour of the new features and where to find them.']
      },
      {
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Predictions in Pharos',
        text: ['Criteria to include your predictions in Pharos are now posted on the <a href="/faq" target="_blank">FAQ page</a>.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new39/predictioncriteria.png"/>']
      },
      {
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Table View',
        text: ['There are now two views to toggle between on all list pages. The Table View shows the list of results (targets, diseases, or ligands) to page through to find the one you\'re interested in.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new39/tableview.png"/>']
      },
      {
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'List Analysis View',
        text: ['List Analysis View shows the visualizations that summarize the list, and more advanced analysis tools to provide an ' +
        'overview of the population, which can help highlight common features of elements in the list, or provide a high level view of ' +
        'the structure of the data in the list.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new39/listanalysisview.png"/>']
      },
      {
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Heatmaps',
        text: ['Heatmaps show an overview of data for the list, as it relates to a corresponding list, such as Target-Ligand activities. ' +
        'Take the \'Creating a Heatmap\' tutorial for more details.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/heatmap.png"/>']
      },
      {
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Filter Value Enrichment',
        text: ['Calculating enrichment scores for the different filter values will help you understand which values are ' +
        'overrepresented in the list. Take the \'Filter Value Enrichment\' tutorial for more details.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/enrichment.png"/>']
      },
      {
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Custom Lists for Ligands or Diseases',
        text: ['It was already possible to upload your own list of targets to use with Pharos. Now that functionality is extended to ' +
        'custom lists of ligands and diseases. Furthermore, ligands can be resolved by a number of different inputs, such as SMILES, ' +
        'ligand names, CAS Numbers, ChEMBL IDs, etc, to facilitate your upload of data from screens or other sources of ligand lists. ' +
        'There are also a few new ligand filters to help find commonalities in the active targets for those ligands.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new39/customligandlist.png"/>']
      },
      {
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Predicted Target-Ligand Activity',
        text: ['Now, in addition to viewing active targets for a ligand, you can also see predicted targets for those ligands, based on ' +
        'QSAR model results from NCATS Predictor.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new39/predictedtargets.png"/>']
      },
      {
        scrollTo: false,
        buttons: this.lastButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Improved Search Functionality',
        text: ['Previously, you had to select whether you wanted to search for targets, ligands, or diseases, when you were doing a text' +
        ' search. Now, one search will return combined results from Targets, Diseases, and Ligands, as well as many filter values.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new39/omnisearch.png"/>']
      }
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.WhatsNew39, event);
      });
    });
    this.shepherdService.start();
  }

  runProteinStructureTour() {
    const data = this.centralStorageService.getTourData('details');
    const afCount = data.targets.alphaFoldStructures.length;
    const structureCount = data.targets.pdbs.length;
    const abortTour = afCount === 0 && structureCount === 0;
    const defaultSteps = [];
    if (abortTour) {
      defaultSteps.push({
        id: 'noStructures',
        attachTo: {
          element: '#pdbview',
          on: 'top'
        },
        scrollTo: false,
        buttons: this.onlyButton.slice(),
        title: 'No Structures Found',
        text: [`There are no experimental or predicted structures found for this protein. Navigate to another target details page to take
        the Protein Structure tour.`]
      });
    } else {
      defaultSteps.push(...[
        {
          beforeShowPromise: () => {
            return new Promise((resolve: any) => {
              setTimeout(() => {
                resolve();
              }, 300);
            });
          },
          id: 'pdbView',
          attachTo: {
            element: '#pdbview',
            on: 'top'
          },
          scrollToHandler: this.tourScroller.bind({section: 'pdbview', platformID: this.platformID}),
          buttons: this.firstButtons.slice(),
          title: 'Protein Structure',
          text: [`This component shows experimentally determined structures for this protein, as well as the AlphaFold predicted
          structure.`]
        },
        {
          id: 'representation',
          attachTo: {
            element: '.representation',
            on: 'left'
          },
          scrollTo: false,
          buttons: this.middleButtons.slice(),
          title: 'Changing the Structure Representation',
          text: [`Select the type of representation to show for the structures.`]
        },
        {
          id: 'colorscheme',
          attachTo: {
            element: '.colorscheme',
            on: 'left'
          },
          scrollTo: false,
          buttons: this.middleButtons.slice(),
          title: 'Changing the Color Scheme',
          text: [`Select the color scheme to use for the structure plots. 'Target' coloring will color the portion of the protein structure
        that is from the selected target, since experimentally determined structures are often complexes with other structures or fusion proteins.
        The 'bfactor' in experimental structures is typically a measure of flexibility at each residue, and similarly a measure of
        prediction confidence in the AlphaFold structures.`]
        }]);

      if (structureCount > 0) {
        defaultSteps.push({
          id: 'hasStructures',
          attachTo: {
            element: '.structure-list',
            on: 'top'
          },
          scrollToHandler: this.tourScroller.bind({class: 'structure-list', platformID: this.platformID}),
          buttons: this.lastButtons.slice(),
          title: 'Viewing different structures',
          text: [`The different experimentally determined structures are listed here, along with some metadata about the structure, such as
        the resolution, or range of residues in the structure. Click a row to change the structure in the plot.`]
        });
      } else {
        defaultSteps.push({
          id: 'noStructures',
          attachTo: {
            element: '#pdbview',
            on: 'top'
          },
          scrollTo: false,
          buttons: this.lastButtons.slice(),
          title: 'Viewing different structures',
          text: [`No experimentally determined structures were found.`]
        });
      }
    }
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        if (abortTour) {
          this.removeTourParam();
        } else {
          this.completeTour(TourType.ProteinStructureTour, event);
        }
      });
    });
    this.shepherdService.start();
  }
  runFilterValueTour() {
    const models = this.getModels();
    const model = models.slice(0, models.length - 1);
    const defaultSteps = [
      {
        beforeShowPromise: () => {
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 300);
          });
        },
        id: 'enrichment-setup',
        scrollTo: false,
        buttons: this.firstButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Filter Value Enrichment',
        text: [`The sorted lists of filter values are often dominated by values that are very common in the full population. In this example, the filtered list ` +
        `consists of targets that are associated with D2 Dopamine Receptor, and the top filter values for "Associated Diseases" shares many of the same values as the unfiltered list.` +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/enrichment-setup.png"/>']
      },
      {
        id: 'enrichment-payoff',
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Heatmap Details',
        text: [`After calculating enrichment scores using Fisher's Exact Test, the lists are sorted by the resulting p-value. The top values in this ranking illustrate ` +
          `which filter values are over-represented by targets in the list. In this example, we see a different set of "Associated Diseases" than before, and ` +
          `we see many examples that are more commonly known to be associated with the D2 Dopamine Receptor.` +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/enrichment.png"/>']
      },
      {
        id: 'toggle-view',
        attachTo: {
          element: '.toggle-list-view',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'toggle-list-view', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Toggle to List Analysis View',
        text: [`Filter Value Enrichment and other population analysis features are on the List Analysis View of the List Pages. `]
      },
      {
        id: 'enrichment',
        attachTo: {
          element: '#filter-representation',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({section: 'filter-representation', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Filter Value Enrichment',
        text: ['The table of results includes the calculated odds ratio, as well as the p-value, and the p-value adjusted for multiple comparisons' +
        ' to limit the False Discovery Rate (FDR) to &alpha; = 0.05.']
      },
      {
        id: 'enrichment',
        scrollTo: false,
        buttons: this.lastButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Filter Value Enrichment',
        text: ['Filter Value Enrichment can be calculated for any categorical filter, unless that filter is currently being used to filter the list. Select the filter here.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new39/filterselection.png"/>']
      }
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.FilterValueEnrichment, event);
      });
    });
    this.shepherdService.start();
  }

  runHeatmapTour() {
    const models = this.getModels();
    const model = models.slice(0, models.length - 1);
    const defaultSteps = [
      {
        beforeShowPromise: () => {
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 300);
          });
        },
        id: 'toggle-view',
        attachTo: {
          element: '.toggle-list-view',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'toggle-list-view', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Toggle to List Analysis View',
        text: [`Heatmaps and other population analysis features are on the List Analysis View of the List Pages. `]
      },
      {
        id: 'heatmap',
        attachTo: {
          element: '.heatmap',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'heatmap', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Heatmaps',
        text: ['For targets, you can construct heatmaps of target-disease associations, target-ligand activities, and ' +
        'target-target interactions. For diseases, the heatmaps are for disease-target associations, and for ligands, ' +
        'the heatmaps are for ligand-target activities. You can also download the data for offline analysis.']
      },
      {
        id: 'heatmap-example',
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Heatmaps',
        text: ['Elements from your list are the columns of the interactive heatmaps. Hover over cells for a summary, click cells to view all details.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/heatmap.png"/>']
      },
      {
        id: 'heatmap-details',
        scrollTo: false,
        buttons: this.lastButtons.slice(),
        classes: 'step-with-screenshot',
        title: 'Heatmap Details',
        text: ['The details view shows all of the information about the selected cell of the heatmap. The header contains shortcuts to jump to the details pages for the ' +
        'corresponding row and column.' +
        '<br/><img class="tour-screenshot" src="./assets/images/tutorials/heatmap-details.png"/>']
      },
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.Heatmaps, event);
      });
    });
    this.shepherdService.start();
  }

  runUpsetPlotTour() {
    const models = this.getModels();
    const data = this.centralStorageService.getTourData('list');
    const currentFacet = this.centralStorageService.getDisplayFacet(models);
    let catFacet = data.facets.find(f => f.facet === currentFacet);
    if (!catFacet || catFacet.singleResponse) {
      catFacet = data.facets.find(f => f.dataType === 'Category' && f.values.length > 0 && !f.singleResponse);
      this.centralStorageService.setDisplayFacet(models, catFacet.facet);
    }
    const model = models.slice(0, models.length - 1);
    const defaultSteps = [
      {
        beforeShowPromise: () => {
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 300);
          });
        },
        id: 'toggle-view',
        attachTo: {
          element: '.toggle-list-view',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'toggle-list-view', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Toggle to List Analysis View',
        text: [`UpSet Plots and other population analysis features are on the List Analysis View of the List Pages.`]
      },
      {
        id: 'upset-plot',
        attachTo: {
          element: '.facet-visualizations',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'facet-visualizations', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'UpSet Charts for Filters',
        text: [`This UpSet Plot shows the counts of ${models} that are documented to have each combination of filter values. Clicking the circles or bars
        will filter the list to ${models} that have the right combination of filter values.`]
      },
      {
        id: 'upset-plot-edit-values',
        attachTo: {
          element: '.facet-change',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'facet-change', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'UpSet Charts for Filters',
        text: [`Change which filter is used to generate the plot with these buttons.`]
      },
      {
        id: 'upset-plot2',
        attachTo: {
          element: '.upset-chart',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'upset-chart', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'UpSet Charts for Filters',
        text: [`UpSet plots are only shown for the categorical filters that have multiple responses per ${model}. By default the top five filter values are used to generate the plot.`]
      },
      {
        id: 'upset-plot-edit-values',
        attachTo: {
          element: '.edit-upset',
          on: 'left'
        },
        scrollTo: false,
        buttons: this.lastButtons.slice(),
        title: 'Custom UpSet Charts',
        text: [`You can edit which filter values are used to generate the plot. You can use this feature to filter the ${model} list with more
        complex boolean logic. For example, selecting values A, B, and C, you can generate the plot of the joint distribution, and filter the
        list to only ${models} with values A AND B, AND NOT C by selecting the right intersection on the plot.`]
      }
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.UpsetChartTour, event);
      });
    });
    this.shepherdService.start();
  }

  runCustomListTour() {
    const defaultSteps = [
      {
        beforeShowPromise: () => {
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 300);
          });
        },
        id: 'custom-target-list-begin',
        attachTo: {
          element: '.upload-target-list-button',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({class: 'upload-target-list-button', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Upload a Custom List',
        text: ['Click the upload button to view all of the available filters and charts for your own custom list of targets, diseases, or ligands.']
      },
      {
        id: 'signin-for-benefits',
        attachTo: this.signinIsHidden
          ? {
            element: '.top-level-menu-button',
            on: 'top'
          }
          : {
            element: '.signin-button',
            on: 'top'
          },
        scrollToHandler: this.signinIsHidden ? null : this.tourScroller.bind({class: 'signin-button', platformID: this.platformID}),
        buttons: this.lastButtons.slice(),
        title: 'Social Sign-in',
        text: ['Sign in with one of the social logins to retrieve your custom list next time you visit.']
      }
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.CustomListTour, event);
      });
    });
    this.shepherdService.start();
  }

  getModels() {
    if (this.onListPage()) {
      const page = this.getPage();
      return page[page.length - 1];
    }
    return '';
  }

  onListPage() {
    const page = this.getPage();
    const models = page[page.length - 1];
    return ['diseases', 'ligands', 'targets'].includes(models);
  }

  getPage() {
    let path = this.router.url.split('?')[0];
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    path = path.split('#')[0];
    return path.split('/');
  }

  listPagesTour() {
    if (!this.onListPage()) { // not a list page
      return;
    }
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    if (this.menuIsHidden) {
      alert('This screen is too small for the List Pages Tutorial.');
      return;
    }
    this.runListPagesTour(this.getModels());
  }

  runListPagesTour(models: string) {
    const data = this.centralStorageService.getTourData('list');
    const model = models.slice(0, models.length - 1);
    const catFacet = data.facets.find(f => f.dataType === 'Category' && f.values.length > 0);
    const catFacetId = catFacet.facet.replace(/\s/g, '');
    const numFacet = data.facets.find(f => f.dataType === 'Numeric' && f.values.length > 0);
    let numFacetId;
    if (numFacet) {
      numFacetId = numFacet.facet.replace(/\s/g, '');
    }
    const defaultSteps = [
      {
        beforeShowPromise: () => {
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 300);
          });
        },
        id: 'list_pages_begin',
        attachTo: {
          element: '#list-pages',
          on: 'right-end'
        },
        scrollToHandler: this.tourScroller.bind({section: 'list-pages', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Pharos List Page Tutorial',
        text: [`There are three types of list pages in Pharos which show targets, diseases, or ligands. You are viewing a list of ${models}, but the others work similarly.`]
      },
      {
        id: 'list_pages_section1',
        attachTo: {
          element: '#facets',
          on: 'right-start'
        },
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        title: 'Filter Panel',
        text: [`The filter panel shows the total counts of ${models} in this list having different values for each filter.`]
      },
      {
        id: 'facet-table',
        attachTo: {
          element: '#' + catFacetId,
          on: 'right-start'
        },
        scrollToHandler: this.sidePanelScroller.bind({parent: 'left-panel', section: catFacetId, platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'An Example Filter',
        text: [`For example, this table shows how many ${models} in this list have different values for ${catFacet.facet}.`]
      },
      {
        id: 'facet-table-as-a-filter',
        attachTo: {
          element: '#' + catFacetId,
          on: 'right-start'
        },
        scrollToHandler: this.sidePanelScroller.bind({parent: 'left-panel', section: catFacetId, platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Filtering the List',
        text: [`Selecting values in the filter panel will filter the list to only ${models} that have that value. Selecting multiple values
        will filter the list to ${models} that have any of the selected values.`]
      }];
    if (numFacet) {
      defaultSteps.push({
        id: 'facet-table-numeric',
        attachTo: {
          element: '#' + numFacetId,
          on: 'right-start'
        },
        scrollToHandler: this.sidePanelScroller.bind({parent: 'left-panel', section: numFacetId, platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Numeric Filters',
        text: [`For numeric filters, we'll show a histogram of ${model} counts that fall within each range. The bounds can be changed using the
         slider to filter the list to only those ${models} that fall in the desired range.`]
      });
    }
    defaultSteps.push(...[
      {
        id: 'facet-table-description',
        attachTo: {
          element: '.helpicon',
          on: 'right-start'
        },
        scrollToHandler: this.sidePanelScroller.bind({parent: 'left-panel', top: true, platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Filter Description',
        text: [`Expand the info button for an explanation of the data behind each filter.`]
      },
      {
        id: 'upset-plot',
        attachTo: {
          element: '.toggle-list-view',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'facet-visualizations', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Filter Visualizations',
        text: [`Toggle to "List Analysis" view to see some higher level visualizations of the ${models} in the list, such as UpSet plots, and Heatmaps. See other tutorials for more details on "List Analysis" functionality.`]
      },
      {
        id: 'model-list',
        attachTo: {
          element: '.model-list',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({class: 'model-list', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: `The Result Table`,
        text: [`Last but not least, here is the actual list of ${models}.`]
      },
      {
        id: 'model-count',
        attachTo: {
          element: '.modellist-header',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({class: 'modellist-header', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Total Count',
        text: [`This is the total count of ${models} in the list.`]
      },
      {
        id: 'model-list-download',
        attachTo: {
          element: '.list-download',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({class: 'list-download', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Data Download',
        text: [`Download a CSV file of the ${model} list and your choice of related data for offline analysis.`]
      },
      {
        id: 'model-list-paginator',
        attachTo: {
          element: '.model-list-paginator',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({class: 'model-list-paginator', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'The Result Table',
        text: [`You can navigate through different pages of ${models} with this control.`]
      }
    ]);
    if (model === 'target') {
      defaultSteps.push(...[
        {
          id: 'model-list-sort',
          attachTo: {
            element: '.model-list-sort',
            on: 'top'
          },
          scrollToHandler: this.tourScroller.bind({class: 'model-list-sort', platformID: this.platformID}),
          buttons: this.middleButtons.slice(),
          title: 'Sorting the List',
          text: [`Change the field used for sorting and the direction with this control.`]
        },
        {
          id: 'model-details-link',
          attachTo: {
            element: '.model-details-link',
            on: 'top'
          },
          scrollToHandler: this.tourScroller.bind({class: 'model-details-link', platformID: this.platformID}),
          buttons: this.middleButtons.slice(),
          title: 'Link to Details',
          text: [`Clicking the title bar will take you to the details page for this ${model}.`]
        },
        {
          id: 'target-details',
          attachTo: {
            element: '.target-details',
            on: 'top'
          },
          scrollToHandler: this.tourScroller.bind({class: 'model-list-table', platformID: this.platformID}),
          buttons: this.lastButtons.slice(),
          title: 'Data Definitions',
          text: [`Hover over data for a brief description of what it means, or expand the help icon on the right for a
           list of data points and descriptions that may appear in this card.`]
        }
      ]);
    } else {
      defaultSteps.push(...[
        {
          id: 'model-list-table',
          attachTo: {
            element: '.model-list-table',
            on: 'right-start'
          },
          scrollToHandler: this.tourScroller.bind({class: 'model-list-table', platformID: this.platformID}),
          buttons: this.lastButtons.slice(),
          title: 'Link to Details',
          text: [`Links in the list will take you to details pages for that ${model}.`]
        }
      ]);
    }
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.ListPagesTour, event);
      });
    });
    this.shepherdService.start();
  }

  runStructureSearchTour() {
    const defaultSteps = [
      {
        beforeShowPromise: () => {
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 300);
          });
        },
        id: 'structure_search_begin',
        attachTo: {
          element: '#structure-search-container',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'structure-search-container', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Structure Search',
        text: ['Use the structure search tool to initiate a search based on a chemical structure.']
      },
      {
        id: 'enter_compound',
        attachTo: {
          element: '#load-card',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'load-card', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Loading a Structure',
        text: ['To begin, enter a compound name or ID to load a chemical structure.']
      },
      {
        id: 'structure_drawer',
        attachTo: {
          element: '#sketcher-row',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'sketcher-row', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Editing a Structure',
        text: ['Successfully resolved compounds can be edited in the MarvinJS Sketcher, or you can draw a structure from scratch.']
      },
      {
        id: 'smiles_editor',
        attachTo: {
          element: '#smiles-card',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'smiles-card', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'The Query SMILES',
        text: ['The SMILES used for the query will appear here. This field can also be used for editing, ' +
        'or copy/pasting a SMILES directly.']
      },
      {
        id: 'similar-structure-search',
        attachTo: {
          element: '#similar-structure-search',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'similar-structure-search', platformID: this.platformID}),
        buttons: this.middleButtons.slice(),
        title: 'Finding Similar Structures',
        text: ['This tool will search for ligands in TCRD that have a similar structure to the query SMILES.']
      },
      {
        id: 'search-method',
        attachTo: {
          element: '#search-method',
          on: 'top'
        },
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        title: 'Search Method',
        text: ['Choose your search method, either by whole structure similarity, or substructure similarity. Results are ranked ' +
        'according to the Tanimoto Similarity, and can be filtered after the search is complete.']
      }];
    defaultSteps.push(
      {
        id: 'predicted-targets-search',
        attachTo:
          {
            element: '#predicted-targets-search',
            on: 'top'
          },
        scrollToHandler: this.tourScroller.bind({section: 'predicted-targets-search', platformID: this.platformID}),
        buttons: this.lastButtons.slice(),
        title: 'Finding Predicted Targets',
        text: ['This tool will search for targets predicted to have activity against the query structure.']
      });
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.StructureSearchTour, event);
      });
    });
    this.shepherdService.start();
  }

  completeTour(tourType: TourType, result: string) {
    this.removeTourParam();
    const prevResult = this.localStorageService.store.getItem(tourType);
    if (prevResult === 'complete' || (prevResult === 'cancel' && result === 'cancel')) {
      return;
    }
    this.localStorageService.store.setItem(tourType, result);
    const title = this.allTutorials.find(t => t.storageKey === tourType)?.title;
    const defaultSteps = [
      {
        id: 'complete',
        attachTo: {
          element: this.menuIsHidden ? '.top-level-menu-button' : '#tutorialMenu',
          on: 'top'
        },
        scrollTo: false,
        buttons: [TourService.completeButton],
        title,
        text: ['Revisit the tutorial at any time by clicking the "Tutorials" menu.']
      }
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    this.shepherdService.start();
  }

  runExpressionTour() {
    const defaultSteps = [
      {
        beforeShowPromise: () => {
          return new Promise((resolve: any) => {
            setTimeout(() => {
              resolve();
            }, 300);
          });
        },
        id: 'expression-start',
        attachTo: {
          element: '#expression',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'expression', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Expression',
        text: ['Expression data is aggregated from several data sources and displayed on target details pages. Data is shown as a heatmap of tissues and data sources, as well ' +
        'as on an anatomogram, shaded according to the average ranking of each tissue across data sources.']
      },
      {
        id: 'tissue-search',
        attachTo: {
          element: '.tissue-search',
          on: 'bottom'
        },
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        title: 'Tissue Search',
        text: ['You can filter the heatmap to a specific class of tissues by selecting a tissue to start with, and subsequently ' +
        'selecting one of the parent terms from the UBERON ontology.']
      },
      {
        id: 'tissue-details',
        attachTo: {
          element: '.yAxisLabel',
          on: 'bottom'
        },
        scrollTo: false,
        buttons: this.middleButtons.slice(),
        title: 'Tissue Details',
        text: ['Click the tissue label, or the heatmap cells to see the details of the expression data for each tissue.']
      },
      ...(this.anatomogramIsHidden ? [] : [
        {
          id: 'anatomogram-container',
          attachTo: {
            element: '.anatomogram-container',
            on: 'bottom'
          },
          scrollTo: false,
          buttons: this.middleButtons.slice(),
          title: 'Interactive Anatomogram',
          text: ['You can also filter the heatmap by clicking tissues on the anatomogram.']
        }]),
      {
        id: 'download-expression-data',
        attachTo: {
          element: '.download-target-details',
          on: 'bottom'
        },
        scrollTo: false,
        buttons: this.lastButtons.slice(),
        title: 'Expression Data Download',
        text: ['You can download data for offline analysis by clicking the download link. Select the "Expression" group to include ' +
        'expression data for all tissues and data sources for this target.']
      },
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(TourType.TargetExpressionTour, event);
      });
    });
    this.shepherdService.start();
  }

  removeTourParam() {
// @ts-ignore
    if (this.router.currentUrlTree?.queryParams?.tutorial?.length > 0) {
      const path = this.router.url.split('?')[0];
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'merge',
        queryParams: {
          tutorial: null
        },
      };
      this.router.navigate([path], navigationExtras);
    }
  }

}

export class TourDefinition {
  title: string;
  definition?: string;
  storageKey: string;
}

