import {TourService} from '../../app/pharos-services/tour.service';
import {TourType} from '../../app/models/tour-type';

export class StepFactory {

  static getData(tourName: TourType, tourService: TourService): any[] {
    const search = `<mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">search</mat-icon>`;
    const list = `<mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">list</mat-icon>`;
    const details = `<mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">description</mat-icon>`;
    const help = `<mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">help</mat-icon>`;
    const tutorial = `<mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">lightbulb</mat-icon>`;
    const enrichment = `<mat-icon role="img" class="mat-icon notranslate material-icons mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">developer_board</mat-icon>`;
    switch (tourName) {
      case TourType.ShortSearch:
        return [
          {
            scrollTo: true,
            attachTo: {
              element: tourService.menuIsHidden ? null : '.searchcomponent',
              on: 'left'
            },
            scrollToHandler: tourService.tourScroller.bind({class: 'searchcomponent', platformID: tourService.platformID}),
            title: 'Searching for a specific entity',
            text: [`You can search for targets, diseases, or ligands all at once with the search bar in the top menu.`]
          },
          {
            scrollTo: false,
            classes: 'step-with-small-screenshot',
            title: 'Some options will autocomplete from the database',
            text: [`The ${search} option will run a thorough search of targets, ligands, and diseases for your search term. You will also see results for matching filter values, such as GWAS traits, GO Terms, Pathways, etc.` +
            `<br/><br/>The ${details} option will take you directly to the details page for the matching target, disease, or ligand.` +
            `<br/><br/>The ${list} option will take you directly to a list page. This example shows links to the list pages for diseases or ligands that are associated with the target 'PAST1.'` +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/typeahead.png"/>']
          }
        ];
      case TourType.ShortTargetDetails:
        return [
          {
            scrollTo: false,
            title: 'Target Details Pages',
            classes: 'step-with-screenshot',
            text: ['<div style="display:flex; flex-direction: row;">' +
            '<div style="width: 50%">' +
            '<br/><br/>The Target Details pages include the primary documentation that we have for the targets.<br/><br/>' +
            'You\'ll find basic descriptive data, such as gene summaries from UniProt or NCBI, protein sequence information, and expression ' +
            'data. Behavioral and phenotypic data, such as ligand activities or disease assocations, is readily available followed by biblio' +
            'metric statistics for the target, and more.<br/><br/>' +
            'Sections with data are highlighted in bold.<br/><br/>' +
            '</div>' +
            '<div style="width: 50%; text-align: center;"><img class="tour-screenshot" src="./assets/images/tutorials/usecases/targetmenu.png"/></div></div>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Target Development Level Summary',
            text: ['The criteria for classification of the target into development levels (TDL) is explained for each target. The matching TDL ' +
            'is highlighted, along with the matching criteria. ' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/tdlsummary.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Descriptive Tooltips',
            text: ['Most labels, buttons, and other display elements have descriptive tooltips, to help understand what the data represents ' +
            'and where it is coming from. This screenshot shows the tooltip that appears when hovering over the label for the <b>Illumination ' +
            `Graph</b>. In addition, the <span style="white-space: nowrap; font-weight: bold">help ${help}</span> icon in the top right will provide a description of the different fields in each component ` +
            'for context. ' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/tooltips.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Component Tutorials',
            text: ['In lieu of a help panel, some more complex components, such as the expression panel, will have a ' +
            `<span style="white-space: nowrap; font-weight: bold">tutorial ${tutorial}</span> link to help users get the most out of the interactive ` +
            'content.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/expression.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Resources',
            text: ['Some targets have IDG Generated resources that you may be able to use in your research. Also in the Resources section is ' +
            'a compilation of orthologous species that have been documented to have a version of this target.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/resources.png"/>']
          },
        ];
      case TourType.ShortPPIList:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Interacting Targets',
            text: ['Most proteins have some documented interactions with other proteins, either through experimental measurement, or through ' +
            'text mining algorithms. You can view some basic information about each target on the target cards and page through the ' +
            'results on the Target Details page. For more in-depth analysis, you\'ll want to click <span style="font-weight: bold">Explore ' +
            'Interacting Targets</span> to generate a Target List page for this target set.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ppi.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Interacting Target List',
            text: ['The resulting list will include all documented interacting targets along with the initial target of interest, to ease ' +
            'in making comparisons. The target cards show the details of the interaction, and the PPI specific filters can be used to filter ' +
            'the target list based on the data source, or the specific confidence metrics for the interaction.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ppilist.png"/>']
          }
        ];
      case TourType.ShortValueCounts:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Filter Value Counts',
            text: ['The Target List page shows the counts of targets that have each filter value. Here we see the counts of targets that ' +
            'are documented to be associated with different diseases. In this example, <em>Left</em> shows the counts of Associated Diseases for the full ' +
            'unfiltered target list, while <em>Right</em> shows the counts for a list of interacting targets for the <b>D2 Dopamine Receptor' +
            '.</b><br/>Note how the filtered list is still dominated by diseases that are very commonly found to be associated with a ' +
            'target.<br/>Clicking on the ' +
            `<span style="white-space: nowrap; font-weight: bold">calculate enrichment ${enrichment}</span>` +
            ' button will rank the filter values by the degree of overrepresentation in the filtered list. ' +
            '<br/><img class="tour-thin-screenshot" src="./assets/images/tutorials/usecases/rawcounts.png"/>' +
            '<img class="tour-thin-screenshot" src="./assets/images/tutorials/usecases/filteredcounts.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Enrichment Scores',
            text: ['Results from Fisher\'s Exact Test are shown in tabular form. The results are ranked according to the adjusted p-value.<br/>' +
            'Note that sorting the list of Associated Diseases based on the degree of overrepresentation yields a much more familiar array ' +
            'of diseases that are associated with the <b>D2 Dopamine Receptor</b>. This proof-of-concept example lends confidence that calculating ' +
            'enrichment scores for a list of Interacting Targets can shed light on the function of less well studied targets.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/enrichment.png"/>']
          }
        ];
      case TourType.ShortHeatmap:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Table View & List Analysis View',
            text: ['All List pages can be viewed in two ways. Using Table View, you can page through results of targets, diseases, ' +
            'or ligands to find ones you are interested in. List Analysis View is for creating visualizations or calculations that analyze ' +
            'the population as a whole. You can toggle back and forth from these buttons in the list header.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/targetheader.png"/>' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/diseaseheader.png"/>' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ligandheader.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Create Heatmaps',
            text: ['List Analysis pages have components to create interactive heatmaps of data from your list. Click the row labels or ' +
            'column headers to sort by that row or column. Hover over cells for a summary, click cells to view all details.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/heatmap.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Heatmap Details',
            text: ['The details view shows all of the information about the selected cell of the heatmap. The header contains shortcuts to ' +
            'jump to the details pages for the corresponding row and column.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/heatmap-details.png"/>']
          }
        ];
      case TourType.ShortSequenceSearch:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Finding similar targets based on an amino acid sequence',
            text: ['The Protein Sequence and Structure component of every <b>Target Details</b> page allows users to initiate a <b>blastp' +
            '</b> search using that target\'s sequence as a starting point. A search can be made based on any sequence though.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new311/sequenceSearchBegin.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Finding similar targets based on an amino acid sequence',
            text: ['The matching targets are displayed on a <b>Target List</b> page, with a histogram of aligned regions of the query ' +
            'sequence. The list can then be filtered as desired according to BlastP\'s measures for quality and coverage of the alignments, ' +
            'as well as all the normal filtering options that Pharos has to offer.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/new311/alignmentResults.png"/>']
          }
        ];
      case TourType.ShortCommonDoc:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Generating a List of Similar Targets',
            text: ['There are many links on a <b>Target Details</b> page to compile a list of similar targets, that share common features, or ' +
            'common annotations.<br/>For this example, the Protein Classes component allows you to generate a list of targets with a DTO ' +
            'Class of <b>Ion Channel</b> or <b>Calcium Channel Auxiliary Subunit 1-8 (Cca) Family</b>.<br/>' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/classes.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Generating a List of Similar Targets',
            text: [
              'Similarly, the Gene Ontology Terms component will allow you to generate list of targets with the matching GO Terms.<br/><br/>' +
              'Some components, like this one, have an option to <b>Find Similar Targets</b>. In this example, instead of generating a list ' +
              'of targets that matches one of those GO Components, this option will generate a list of targets that matches <em>any</em> of ' +
              'those GO Components.' +
              '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/goterms.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Sorting the list of Similar Targets',
            text: ['This example represents the list of targets with overlapping GO Components to <b>CACNG1</b>. The results are sorted ' +
            'based on the degree of overlap between two targets\'s sets of GO Components, as calculated by the Jaccard Index.<br/><br/>' +
            'Lists of similar targets can be constructed in this way for GO Terms, Pathways, Associated Diseases, UniProt Keywords, GWAS ' +
            'Traits, and MGI Phenotypes.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/similartargets.png"/>']
          }
        ];
      case TourType.ShortDiseaseDetails:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Disease Details Pages',
            text: ['Disease Associations come from many sources and the disparate ontologies for diseases are harmonized through the MONDO ' +
            'Disease Ontology. Pharos displays the matching disease descriptions, and harmonized disease IDs.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/diseasepage.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Disease Hierarchy',
            text: ['You can navigate between disease pages by following the MONDO disease hierarchy to parent or child terms. The ' +
            'associated targets of a disease are aggregated among the child terms. In this example, that would mean that if you <b>Explore ' +
            'Associated Targets</b> of <b>myelodysplastic syndrome</b>, you will see targets documented to be associated with that term, as' +
            ' well as targets documented to be associated with <b>refractory cytopenia with multilineage dysplasia</b> and the other descen' +
            'dants of <b>myelodysplastic syndrome</b>.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/diseasehierarchy.png"/>']
          }, {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Exploring the Associated Targets',
            text: ['When you click <b>Explore Associated Targets</b>, the resulting target list can be filtered further, based on the various ' +
            'disease association scores, or the data source reporting the association.<br/>' +
            'The <b>List Analysis</b> tab for a list of targets associated with a disease could reveal interesting patterns in the population ' +
            'of targets that affect the disease.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/associatedDiseaseList.png"/>']
          }
        ];
      case TourType.ShortExpressionAtlas:
        return [{
          scrollTo: false,
          classes: 'step-with-screenshot',
          title: 'Expression Atlas',
          text: ['When you click <b>Explore Associated Targets</b> on a <b>Disease Details</b> page, some will have data from <b>Expression Atlas</b>. This documents ' +
          'targets that have been found to be upregulated, or downregulated, in disease tissue. Pharos lets you filter the list based on the ' +
          '<b>log2foldchange</b> using the numeric filter on the left panel. You can also sort the list based on the <b>log2foldchange</b> ' +
          'in the <b>Table View</b> tab.<br/>Note that targets that are significantly <em>downregulated</em> could still be of interest, and ' +
          'may be sorted to the end of the list.' +
          '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/expressionatlas.png"/>']
        }
        ];
      case TourType.ShortDownload:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Download Data',
            text: ['Buttons to download data in csv format are readily available on all <b>List Pages</b> and <b>Details Pages</b>.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/targetheader.png"/>' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/diseaseheader.png"/>' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ligandheader.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Download Builder',
            text: ['Select which fields you want to download in the <b>Download Builder</b>.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/downloadbuilder.png"/>']
          },
          {
          scrollTo: false,
          classes: 'step-with-screenshot',
          title: 'Download Data',
          text: ['All data used to generate the heatmaps can be downloaded for offline analysis. These buttons are provided for convenience, as ' +
          'they really just preselect the appropriate fields in the download builder.' +
          '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/heatmapdownload.png"/>']
        }];
      case TourType.ShortLigandList:
        return [
          {
            scrollTo: false,
            title: 'Analyzing a List of Ligands',
            text: ['There are many ways to construct a <b>Ligand List</b> that can be analyzed in interesting ways, for example:<br/>' +
            '<ul><li>A list of ligands with a similar structure to a novel compound</li>' +
            '<li>A list of ligands retrieved from a screen of compounds that have an affect in an assay</li>' +
            '<li>A list of ligands active against a particular target</li></ul>']
          },
          {
            scrollTo: false,
            classes: 'step-with-small-screenshot',
            title: 'Similarity Filter',
            text: ['If your <b>Ligand List</b> was generated by a structural search, you may want to filter the resulting list based on the ' +
            'degree of similarity.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/similarityfilter.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-small-screenshot',
            title: 'Target Count Filter',
            text: ['This numerical filter shows the count of targets that each ligand in the list has activity against. High values correspond ' +
            'to promiscuous ligands, while low values correspond to <em>potentially</em> selective ligands (or understudied ligands).' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/targetcountfilter.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Target Related Filters',
            text: ['Some filters in a <b>Ligand List</b> are related to features of their active targets. In this example, 79 ligands in this' +
            ' ligand list had activity against the <b>Alpha-1A adrenergic receptor</b>.<br/>The <b>Reactome Pathway</b> and <b>PANTHER Class</b> ' +
            'filters count up the number of ligands in the list with activity against targets that are in each Reactome Pathway, or PANTHER ' +
            'Class.<br/>As usual, the degree to which those filter values are overrepresented in the list can be calculated with the ' +
            `<span style="white-space: nowrap; font-weight: bold">calculate enrichment ${enrichment}</span> button.` +
            '<br/><img class="tour-verythin-screenshot" src="./assets/images/tutorials/usecases/targetfilter.png"/>' +
            '<img class="tour-verythin-screenshot" src="./assets/images/tutorials/usecases/pathwayfilter.png"/>' +
            '<img class="tour-verythin-screenshot" src="./assets/images/tutorials/usecases/pantherfilter.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Create Heatmaps',
            text: ['On the <b>List Analysis</b> page, you can create interactive heatmaps of data from your list. Click the row labels or ' +
            'column headers to sort by that row or column. Hover over cells for a summary, click cells to view all details.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ligandheatmap.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Heatmap Detail',
            text: ['Clicking on each cell will reveal the underlying activity data for the target and ligand, along with references, and ' +
            'links to PubMed when possible.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ligandheatmapdetail.png"/>']
          }
        ];
      case TourType.ShortCustomList:
        return [
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Uploading a Custom List',
            text: ['All <b>List Pages</b> provide the option to upload your own list to Pharos. After that, you\'ll be able to use any of the ' +
            'list analysis functionality Pharos has on your own list, including creating UpSet charts, calculating enrichment scores, ' +
            'creating heatmaps, downloading data, etc. ' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/targetheader.png"/>' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/diseaseheader.png"/>' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ligandheader.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Uploading a Ligand List',
            text: ['Ligands can be resolved by a number of different identifiers, including SMILES, common name, CAS Number, ChEMBL, etc.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ligandsupload.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'A Resolved Ligand List',
            text: ['NCATS Resolver will resolve your input to Pharos\'s internal IDs to generate your list.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/ligandsresolved.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Sign In for Benefits',
            text: ['Users who have signed in will find their custom list included along with the other filters. Without signing in, make sure ' +
            'to copy the resulting URL so that you can recover your list next time you visit Pharos.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/signinforbenefits.png"/>']
          },
        ];
      case TourType.ShortPredictionResults:
        return [
          {
            scrollTo: false,
            classes: 'step-with-small-screenshot',
            title: 'Predicted Target Results',
            text: ['From the <b>Structure Search</b> page, you can find predicted targets for any chemical structure.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/findpredictions.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-small-screenshot',
            title: 'Predicted Target Results',
            text: ['The search will actually search for predicted targets, and known targets for the query structure. The <b>Associated ' +
            'Structure</b> filter is set to the query structure, and is the one that returns data for predicted targets. The <b>Active ' +
            'Ligand</b> filter is set to the internal ID the query structure would have in Pharos, and is the one that returns data for ' +
            'known targets. You can clear out one or the other to remove predicted or known targets from your <b>Target List</b>.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/selectedfilters.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Predicted Target Results',
            text: ['The <b>Target List</b> contains merged data for predicted activity data and experimentally determined activity data from ' +
            'the database. Note the top result contains a section for <b>' +
            'Ligand Association Details</b> which is the experimental activity data, and a section for <b>Target Prediction Details</b> which is ' +
            'the predicted activity from <b>NCATS Predictor</b>.' +
            '<br/><img class="tour-screenshot" src="./assets/images/tutorials/usecases/predictedtargets.png"/>']
          },
          {
            scrollTo: false,
            classes: 'step-with-screenshot',
            title: 'Predicted Target Filters',
            text: ['Predicted data is set apart with a gray background.<br/>You can filter predictions based on <b>Prediction Applicability</b> or <b>' +
            'Predicted Activity</b>. You can filter the experimental activities based on <b>IC50</b>, <b>Action</b>, or other measures of the ' +
            'experimental data.<br/>' +
            '<img class="tour-thin-screenshot" src="./assets/images/tutorials/usecases/predictionfilters.png"/>' +
            '<img class="tour-thin-screenshot" src="./assets/images/tutorials/usecases/experimentalfilters.png"/>']
          }
        ]
    }
  }
}
