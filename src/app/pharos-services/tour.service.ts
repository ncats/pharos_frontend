import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {isPlatformBrowser} from '@angular/common';
import {NavigationExtras, Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {CentralStorageService} from './central-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {
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
  firstButtons = [TourService.cancelButton, TourService.nextButton];
  lastButtons = [TourService.backButton, TourService.completeButton];
  standardButtons = [TourService.cancelButton, TourService.backButton, TourService.nextButton];
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

  runTutorial(tutorialName: string) {
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    this.loadPromise.then(() => {
      switch (tutorialName) {
        case 'expression-tutorial':
          this.runExpressionTour();
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

  upsetPlotTour(models: string, data: any) {
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    this.loadPromise.then(() => {
      this.runUpsetPlotTour(models, data);
    });
  }

  runUpsetPlotTour(models: string, data: any) {
    const currentFacet = this.centralStorageService.getDisplayFacet(models);
    let catFacet = data.results.facets.find(f => f.facet === currentFacet);
    if (!catFacet || catFacet.singleResponse) {
      catFacet = data.results.facets.find(f => f.dataType === 'Category' && f.values.length > 0 && !f.singleResponse);
      this.centralStorageService.setDisplayFacet(models, catFacet.facet);
    }
    const model = models.slice(0, models.length - 1);
    const defaultSteps = [
      {
        id: 'upset-plot',
        attachTo: {
          element: '.facet-visualizations',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'facet-visualizations', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'UpSet Charts for Filters',
        text: [`This UpSet Plot shows the counts of ${models} that are documented to have each combination of filter values. Clicking the circles or bars
        will filter the list to ${models} that have the right combination of filter values.`]
      },
      {
        id: 'upset-plot2',
        attachTo: {
          element: '.upset-chart',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'upset-chart', platformID: this.platformID}),
        buttons: this.standardButtons.slice(),
        title: 'UpSet Charts for Filters',
        text: [`UpSet plots are only shown for the categorical filters, that have multiple responses per ${model}. By default the top five filter values are used to generate the plot.`]
      },
      {
        id: 'upset-plot-edit-values',
        attachTo: {
          element: '.edit-upset',
          on: 'left'
        },
        scrollTo: false,
        buttons: this.standardButtons.slice(),
        title: 'Custom UpSet Charts',
        text: [`You can edit which filter values are used to generate the plot. You can use this feature to filter the ${model} list with more
        complex boolean logic. For example, selecting values A, B, and C, you can generate the plot of the joint distribution, and filter the
        list to only ${models} with values A AND B, AND NOT C by selecting the right intersection on the plot.`]
      },
      {
        id: 'upset-plot-edit-values',
        attachTo: {
          element: '.facet-change',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'facet-change', platformID: this.platformID}),
        buttons: this.standardButtons.slice(),
        title: 'UpSet Charts for Filters',
        text: [`Change which filter is used to generate the plot with these buttons.`]
      }
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(true, 'upset-plot-tour', 'Upset Plots', event);
      });
    });
    this.shepherdService.start();
  }

  customTargetLists() {
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    this.loadPromise.then(() => {
      this.runCustomTargetListTour();
    });
  }

  runCustomTargetListTour() {
    const defaultSteps = [
      {
        id: 'custom-target-list-begin',
        attachTo: {
          element: '.upload-target-list-button',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({class: 'upload-target-list-button', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Upload a Custom List of Targets',
        text: ['Click the upload button to view all of the available filters and charts for your own custom list of targets. Uploading a custom list of diseases or ligands is not' +
        ' supported at this time.']
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
        this.completeTour(true, 'custom-target-lists', 'Custom Target Lists', event);
      });
    });
    this.shepherdService.start();
  }

  listPagesTour(manual: boolean, path: any, data: any) {
    if (path.subpath !== 'list') { // not a list page
      return;
    }
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    if (this.menuIsHidden) {
      if (manual) {
        alert('This screen is too small for the List Pages Tutorial.');
      }
      return;
    }
    if (!manual && !!this.localStorageService.store.getItem('list-pages-tour')) {
      return;
    }
    this.loadPromise.then(() => {
      this.runListPagesTour(manual, path, data);
    }).catch(e => {
      alert(e);
    });
  }

  runListPagesTour(manual: boolean, path: any, data: any) {
    const models = path.path;
    const model = models.slice(0, models.length - 1);
    const catFacet = data.results.facets.find(f => f.dataType === 'Category' && f.values.length > 0);
    const catFacetId = catFacet.facet.replace(/\s/g, '');
    const numFacet = data.results.facets.find(f => f.dataType === 'Numeric' && f.values.length > 0);
    let numFacetId;
    if (numFacet) {
      numFacetId = numFacet.facet.replace(/\s/g, '');
    }
    const defaultSteps = [
      {
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
        title: 'Filter Description',
        text: [`Expand the info button for an explanation of the data behind each filter.`]
      },
      {
        id: 'upset-plot',
        attachTo: {
          element: '.facet-visualizations',
          on: 'left'
        },
        scrollToHandler: this.tourScroller.bind({class: 'facet-visualizations', platformID: this.platformID}),
        buttons: this.standardButtons.slice(),
        title: 'Filter Visualizations',
        text: [`This panel shows visualizations of selected filters. An UpSet plot will show for filters that can have multiple values per ${model}.
         See "How do I use the UpSet Chart" tutorial for details.`]
      },
      {
        id: 'model-list',
        attachTo: {
          element: '.model-list',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({class: 'model-list', platformID: this.platformID}),
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
          buttons: this.standardButtons.slice(),
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
          buttons: this.standardButtons.slice(),
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
        this.completeTour(manual, 'list-pages-tour', 'Pharos List Page Tutorial', event);
      });
    });
    this.shepherdService.start();
  }

  structureSearchTour(manual: boolean) {
    if (!isPlatformBrowser(this.platformID)) {
      return;
    }
    if (!manual && !!this.localStorageService.store.getItem('structure-search-tour')) {
      return;
    }
    this.loadPromise.then(() => {
      this.runStructureSearchTour(manual);
    });
  }

  runStructureSearchTour(manual: boolean) {
    const defaultSteps = [
      {
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
        title: 'Search Method',
        text: ['Choose your search method, either by whole structure similarity, or substructure similarity. Results are ranked ' +
        'according to the Tanimoto Similarity, and can be filtered after the search is complete.']
      },
      {
        id: 'predicted-targets-search',
        attachTo: {
          element: '#predicted-targets-search',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'predicted-targets-search', platformID: this.platformID}),
        buttons: this.lastButtons.slice(),
        title: 'Finding Predicted Targets',
        text: ['This tool will search for targets predicted to have activity against the query structure.']
      }
    ];
    this.shepherdService.defaultStepOptions = this.defaultStepOptions;
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps(defaultSteps);
    ['cancel', 'complete'].forEach(event => {
      this.shepherdService.tourObject.on(event, () => {
        this.completeTour(manual, 'structure-search-tour', 'Structure Search', event);
      });
    });
    this.shepherdService.start();
  }

  completeTour(manual: boolean, localStorageKey: string, title: string, result: string) {
    this.removeTourParam();
    const prevResult = this.localStorageService.store.getItem(localStorageKey);
    if (prevResult === 'complete' || (prevResult === 'cancel' && result === 'cancel')) {
      return;
    }
    this.localStorageService.store.setItem(localStorageKey, result);
    const defaultSteps = [
      {
        id: 'complete',
        attachTo: {
          element: this.menuIsHidden ? '.top-level-menu-button' : '#tutorialMenu',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind(
          this.menuIsHidden
            ? {class: 'top-level-menu-button', platformID: this.platformID}
            : {section: 'tutorialMenu', platformID: this.platformID}
        ),
        buttons: [TourService.completeButton],
        title,
        text: ['Revisit the tutorial at any time by clicking the "How do I..." menu.']
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
        id: 'expression-start',
        attachTo: {
          element: '#expression',
          on: 'top'
        },
        scrollToHandler: this.tourScroller.bind({section: 'expression', platformID: this.platformID}),
        buttons: this.firstButtons.slice(),
        title: 'Target Expression',
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
        buttons: this.standardButtons.slice(),
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
        buttons: this.standardButtons.slice(),
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
          buttons: this.standardButtons.slice(),
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
        this.completeTour(true, 'expression-tutorial', 'Target Expression', event);
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
  definition: string;
}

