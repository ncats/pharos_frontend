import {Paragraph, Task, UseCaseStep} from '../models/use-case-step';
import {TourType} from '../models/tour-type';

export class UseCaseData {
  anchor: string;
  title: string;
  blurb: string;
  steps: UseCaseStep[] = [];

  static getDescription(): string {
    return "Pharos has many features to aid in knowledge discovery and hypothesis generation. The use cases highlight how Pharos' " +
      "individual features can be used together to reveal patterns in the data.";
  }
  static getUseCases(): UseCaseData[] {
    return [
      {
        anchor: "illuminatingDarkTargets",
        title: "Illuminating a dark target",
        blurb: "This use case profiles the features of Pharos that help a user begin to understand a dark target, and generate " +
          "hypotheses for its role. After reviewing the primary documentation for that target, the dataset is expanded to a list of " +
          "interacting targets. The tutorial shows you how to do enrichment analysis on the list, and create a heatmap of data for the list. " +
          "The goal is to highlight patterns in the properties of a set of related targets to help build hypotheses about the role of the dark " +
          "target.",
        steps: [
          new Paragraph("Dr. Alvarez is a researcher studying rare diseases. Based on some results of a recent GWAS study, she would like to investigate potential roles of a target in a rare disease, and potential medical interventions to affect the course of the disease."),
          new Paragraph("She begins by finding her dark target, and reviewing primary documentation for it."),
          new Task("Finding a specific target", TourType.ShortSearch),
          new Task("Reviewing primary documentation", TourType.ShortTargetDetails),
          new Paragraph("As you might expect, there is not a lot of primary documentation for her target. She finds no other associations to the disease, no significant GO Terms, and no documented involvment in relevant Pathways. She did find several protein-protein interactions pulled from the STRING-DB database, however. Perhaps the interacting proteins have relevant documentation."),
          new Task("Generating a target list from protein-protein interactions", TourType.ShortPPIList),
          new Paragraph("The resulting target list has 50 targets, which are documented to be associated with several diseases, pathways, and GO Terms. She notices the list of associated diseases includes many types of cancers, which was not expected. She knows that cancer is very well studied, and wonders if the number of targets in the list that are associated with cancer is greater than would be expected by random chance."),
          new Task("Calculating filter value enrichment", TourType.ShortValueCounts),
          new Paragraph("The filter value enrichment shows that cancer is not actually over-represented in the list, meaning the high number for targets associated with cancer may just be an artifact. Calculating enrichment for some other filters yields a few interesting GO Terms and Pathways that could look into. She also creates a heatmap of target-ligand activity for the interacting targets."),
          new Task("Creating a heatmap", TourType.ShortHeatmap),
          new Paragraph("There are a few compounds that could be used to perturb the system, and potentially affect the course of the disease. She downloads the target-ligand activity data for further investigation and to see which compounds she might be able to get ahold of.")
        ]},
      {
        anchor: "highlightingDarkTargets",
        title: "Finding an appropriate dark target to study",
        blurb: "This use case highlights the features of Pharos that would help a researcher find a <em>dark target</em> to study based on " +
          "another target they know well. The tool shows how to find a set of similar targets based on protein sequence, " +
          "or common documentation. The resulting set can be filtered based on the <b>Target Development Level</b> to highlight dark " +
          "proteins. Other relevant filters can help highlight targets that have available IDG mouse models or genetic constructs, or have " +
          "an ortholog in the researcher's preferred model system.",
        steps: [
          new Paragraph("Chet is a grad student who wants to design a research project for his thesis."),
          new Paragraph("The lab he works in has a lot of experience and equipment devoted to the study of calcium channels in mouse models. A recent publication from the lab added to what is known about CACNG1, a regulatory subunit of a calcium channel. He begins, as usual, by reviewing primary documentation for CACNG1."),
          new Task("Finding a specific target",TourType.ShortSearch),
          new Task("Reviewing primary documentation",TourType.ShortTargetDetails),
          new Paragraph("In Pharos, Chet generates a set of similar targets based on a sequence search for targets related to CACNG1. He also could have generated a list of targets from the same DTO class, or PANTHER class, to find related proteins."),
          new Task("Generating a target list based on a sequence search",TourType.ShortSequenceSearch),
          new Task("Generating a target list based on common documentation",TourType.ShortCommonDoc),
          new Paragraph("He finds 7-8 related targets. After highlighting the 'Tdark' proteins by filtering the list, he notices some have IDG resources, specifically 3 cell and 1 mouse resource he could potentially use for his project."),
          new Task("Interpreting filter value counts",TourType.ShortValueCounts),
          new Paragraph("He also looks into the associated diseases of his dark target, and similar targets, and proposes some future studies into the role of his target in disease. See Use Case 'Illuminating a dark target\" for more.")
        ]
      },
      {
        anchor: "diseaseExploration",
        title: "Exploring potential compounds to affect a rare disease",
        blurb: "This use case profiles the features within Pharos to investigate knowledge about a disease. Researchers can explore patterns " +
          "in the targets that are known to be associated with the disease. Furthermore, generating heatmaps of those targets versus all the " +
          "compounds with activity against those targets can reveal patterns in the dataset. Researchers can also download data for all the associated " +
          "targets and their active compounds for further analysis.",
        steps: [
          new Paragraph("A biologist studying a rare disease wants to review compounds that could potentially affect the progression of the disease. Starting at the disease details page, they explore the full list of associated targets for that disease."),
          new Task("Review Disease Details & Associated Targets",TourType.ShortDiseaseDetails),
          new Paragraph("The list of associated targets includes many proteins and they want to narrow the search to targets that have been found to be upregulated in the disease."),
          new Task("Filter a target list based on Expression Atlas data",TourType.ShortExpressionAtlas),
          new Paragraph("They browse all Pharos' ligand activity data for the targets in the list in a heatmap. They sort by different columns to find highly potent compounds for some of the targets. They download the ligand activity data for more follow up."),
          new Task("Create a heatmap of target-ligand activities",TourType.ShortHeatmap),
          new Task("Download data for offline analysis",TourType.ShortDownload),
        ]
      },
      {
        anchor: "novelCompound",
        title: "Exploring potential effects of a novel chemical compound",
        blurb: "This use case highlights the tools within Pharos to study the potential effects of a novel chemical compound. Pharos has the " +
          "ability to generate a <b>Target List</b> of targets that the compound is predicted to have activity for. Alternatively, generating " +
          "a <b>Ligand List</b> of compounds with a similar structure can help the researcher understand which compounds may be selective, " +
          "and which targets, target classes, or target pathways can be affected by the compounds in the list. Highlighting these patterns " +
          "in a list of similar compounds can help understand the potential effects of the novel compound.",
        steps: [
          new Paragraph("Dr. Baggins has a novel chemical compound that could potentially be useful as a therapeutic agent. To begin investigating potential effects and off-target effects, she searches Pharos for predicted targets. After finding a few interesting targets to follow up on, she also decides to characterize potential effects by studying the activity profile of similar compounds."),
          new Task("Search by Chemical Structure",TourType.StructureSearchTour),
          new Paragraph("Dr. Baggins notices that the list of similar compounds has some interesting patterns of active targets, and target classes. Additionally, the target count histogram tells her which ligands are known to be promiscuous in the targets they affect, and which may be selective."),
          new Task("Analyzing a list of ligands",TourType.ShortLigandList)
        ]
      },
      {
        anchor: "compoundScreen",
        title: "Exploring commonalities amongst a set of ligands identified by a screen",
        blurb: "This use case highlights the tools within Pharos to analyze a list of chemical compounds identified by a screen. Loading a list " +
          "of compounds into Pharos can be done with a number of identifiers including SMILES, ChEMBL IDs, etc. The features and visualizations " +
          "available on the resulting <b>Ligand List</b> can help the researcher understand which compounds may be selective, and which " +
          "targets, target classes, or target pathways can be affected by the compounds in the list.",
        steps: [
          new Paragraph("Dr. Baggins has screened a hundred thousand compounds from their library against a cell culture screening assay designed to identify compounds that affect a particular cellular process. The screen has identified about 500 compounds that have a reliable affect on the measured behavior."),
          new Paragraph("Dr. Baggins uploads the list of compounds into Pharos for analysis, using the SMILES for the identified compounds."),
          new Task("Uploading a custom list",TourType.ShortCustomList),
          new Paragraph("Analyzing the list provided some useful insights. Dr. Baggins was able to identify some common active targets for compounds in the list. The list was also enriched in compounds with activity towards targets in a specific <b>Reactome Pathway</b>. It also proved useful to identify some relatively selective compounds using the <b>Target Count</b> filter."),
          new Task("Analyzing a list of ligands",TourType.ShortLigandList),
        ]
      }
    ]
  }
}
