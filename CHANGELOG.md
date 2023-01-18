# 3.15.0 (2023-01-15)
### Added Features
* **Publications Data Update**
  * Publications, and GeneRifs have been updated with fresh data
  * A word cloud will show on target details pages will help users get an overview of the state of research for a target. Perfect for Slide 1 of your presentations.
* **Pharos Toolbox**
  * API developers now have a tool to help develop an API that will enable you to encorporate your data into Pharos
  * See the Community Data API repo for details, and a walkthrough to creating your first API 
    * https://github.com/ncats/pharos-community-data-api
### Bug Fixes / Miscellaneous updates
* Predictions are highlighted in greenish
* The backend was refactored to better maintain the unfiltered counts for each facet

_______________
# 3.14.0 (2022-10-03)
### Added Features
* **Circlular Treemaps**
  * The Expression component now has a circular treemap plot alongside the heatmap. Data in the treemap is grouped 
based on the UBERON ontology to help understand expression patterns. The plots are interactive in that they 
filter the heatmaps to those expression data from the selected branches of the UBERON tree.
  * TIN-X data now has a circular treemap plot alongside the scatter plot, based on the hierarchy defined by 
  Disease Ontology (DO). The plots are interactive in that they highlight points on the scatterplot that correspond to 
 the selected branch of the DO tree.
* **Predicted Effects of Inhibiting Kinases on Cancers**
  * We're now showing predictions from Ravenmehr *et al.* 2021. Navigate to the 'Predicted Diseases' component of the 
    target details pages for kinases, or the 'Predicted Targets' component of the disease details pages for cancers to find that data.  
* **GARD Annotation**
  * The categorization of what is a 'Rare' disease has been incorporated from the Genetic and Rare Diseases (GARD) Information Center.
  * This shows up as a filter on disease list pages, a column on the disease list itself, and as a column in the CSV files for downloading disease data.
* **Updated TCRD**
  * Pharos is now based on TCRD version 6.13.4, which includes these updates:
    * Ligand activity data is based on ChEMBL version 31, and DrugCentral version 20220705
    * Data from DISEASES has been updated, TIGA, and the DRGC Resources
    * PubMed Scores and TDLs have been recalculated
  
### Bug Fixes / Miscellaneous updates
* There have been a number of performance improvements, meant to streamline data queries to improve the initial navigation to Pharos.
* The numeric filters for Potency have been combined into one. Previously there were separate filters for each measure of potency (i.e. IC50, Kd, etc).
  (Ex: <a href="/ligands?associatedTarget=DRD2">ligands associated with DRD2</a>). 
_______________

# 3.13.0 (2022-07-01)
### Added Features
* **Updated Expression Data and UI**
  * The expression component on Target Details pages has been updated to show the newest versions of data from:
    GTEx, HPA Protein, HPA RNA, HPM Protein, and JensenLab TISSUES
  * The info panel will show details about the versions, release dates, and download files that were used in compiling the data
  * Data sources are sorted according to whether data corresponds to protein expression or RNA expression
  * There are some UI improvements as well, like sortable columns, and changing the shading map for each data source

### Bug Fixes / Miscellaneous updates
* Previously, linking to targets with dashes in the name might resolve to the wrong page. The problem is fixed.
* Previously, filtering a ligand list based on an UpSet chart for the Target Filter would find zero ligands. The problem is fixed.

_______________

# 3.12.0 (2022-05-01)
### Added Features
* **Use Cases**
  * Pharos has many features to aid in knowledge discovery and hypothesis generation. The new Use Cases page highlights how Pharos' individual features can be used together to reveal patterns in the data.
* **Twitter feed on the home page**
  * This replaces the old *firebase* based listing of news and events, which was very rarely updated.
* **Nearest Tclin Targets**
  * For non-Tclin targets, the nearest upstream and downstream Tclin targets, based on KEGG pathways, are now shown on the Target Details pages.
* **Performance improvements**
  * Slow loading Target pages, and unfiltered list pages are now prerendered, and will load faster.
* **SEO & FAIR optimizations**
  * Structured data elements (JSON-LD) are now being set for all details pages, and use case pages, to help webcrawlers, and improve search engine results
    * schema.org entities are being used for Targets, which includes basic target descriptions, linked PPIs, pathways, GO Terms, drugs and ligands, and more
    * Disease and ligand descriptions and identifiers are set for Disease and Ligand Details pages
    * A schema.org Rating element is set for Targets for the TDL
    * Use cases are annotated with How-To steps
  * The Sitemap is now dynamically generated, so every page will be crawlable
* **UI Improvements**
  * Details pages will now show all components, with a note when there's no data, so that the components don't just mysteriously disappear

### Bug Fixes / Miscellaneous updates
* Updated the backedn to Nodejs to version 16 and typescript version 4.6
* Converted config tables to a sqlite database - for ease of deployment
* Fix bugs that happen when there is a dash in a gene symbol
* Updated to a new Public endpoint for NCATSFind
* Buttons should now allow users to right-click to open a new tab, to allow for other workflows that need the original pages to stay open

_______________

# 3.11.0 (2022-03-01)
### Added Features
* **Sequence Search**
    * Find similar targets based on a blastp sequence search.
    * Results are shown in a target list, from which you can filter based on alignment quality or coverage scores.
    * As always, you can use that list to calculate enrichment scores, generate UpSet plots, or heatmaps.
    * You can also download details of the alignment from blastp through the Data Download workflow.
* **Updates on How to Link to Pharos**
    * You can now link to a custom target list, just by passing the list of gene symbols or UniProt IDs into the URL. See the <a href="/about#linkToPharos" target="_blank">About Page</a> for details.
    
### Bug Fixes / Miscellaneous updates
* **Memory Leak Fixed**
  * The web server was occasionally restarting, and returning some 50x - Gateway Errors. 
* **Ligand structures on the Ligand Details pages would occasionally not update when moving from one page to another**
* Better handling of missing, or non-unique, gene symbols
  * Target display cards, and links will now use a preferred term, which is either the gene symbol, or the UniProt ID
    * The Gene Symbol is used when it is available, and unique for targets in TCRD, otherwise the UniProt ID is used
  * Now when you search for a degenerate gene symbol (like HLA-A), the typeahead form will give you an option to compile a list of all targets with that gene symbol 

_______________

# 3.10.0 (2022-01-06) 
### Added Features
* **MONDO integration**
    * Different sources for target-disease associations use different disease ontologies. 
    Now Pharos uses the <a href="https://mondo.monarchinitiative.org/" target="_blank">
    MONDO Disease Ontology</a> to harmonize analogous terms.  
        * Accordingly, navigating to parent or child disease terms from the Disease Details pages is done using the
         MONDO Ontology, rather than Disease Ontology (DO).
    * Now there is the added ability to resolve diseases based on any of the equivalent terms mapped to MONDO can 
    be used to resolve to a Disease Details page (e.g. <a href="/diseases/UMLS:C0004096" target="_blank">https://pharos.nih.gov/diseases/UMLS:C0004096</a>)
    
* **Combined ProtVista Structure and Sequence Viewer**
    * Pharos has upgraded to EBI's Nightingale based web components, which has an integrated structure
     viewer along with the sequence viewer. This enables us to combine those two components of the Target
      Details pages.
    * Furthermore, the data from ProKino regarding Kinase annotations and ortholog sequence variants is also integrated
    into a single component. 
    * AlphaFold structures are included along with the other structures.
* **Angular Upgrade:**
    * Upgrade to Angular 13
* **UI Updates to Target Details pages**
    * Long scrolling target details pages are now easier to navigate with subheadings that group descriptive data, behavioral data, phenotypic data, etc.
    
### Bug Fixes / Miscellaneous updates
* **Prefixes to resolve Ligands by specific IDs**
    * Add a prefix to resolve to a specific ligand, in cases of ID collision between data sources. Available 
    prefixes are: "CID:" for PubChem IDs, "DC:" for DrugCentral IDs, "G2P:" for Guide to Pharmacology IDs, 
    "UNII:" for UNIIs, "name" for the compound name, and "LYCHI:" for LyCHI layer 4. Prefixes are case insensitive.
* **Heatmaps can now be sorted by any row or column by clicking the labels**
* **Expression data can be filtered for cell types or tissues.**

_______________

# 3.9.0 (2021-11-05)
### Added Features
* **List Pages have been restructured**
    * There are now two views to toggle between on all list pages.
        * Table View - Shows the list of results (targets, diseases, or ligands) to page through to find the one you're interested in.
        * List Analysis - Shows the visualizations that summarize the list, and more advanced analysis tools to provide an overview of the population, which can help highlight common features of elements in the list, or provide a high level view of the structure of the data in the list.
* **Custom Lists for Ligands and Diseases**
    * Similarly to how custom lists of targets can be uploaded, now you can create your own custom lists of ligands and diseases. All the same functionality and visualizations are available for your custom lists as with all other lists in Pharos.
    * Ligands are resolved using NCATSFind which enables you to upload your lists as SMILES, ligand names, CAS Numbers, ChEMBL IDs, etc.
* **Predicted Ligand Activities**
    * Now, in addition to viewing active targets for a ligand, you can also see predicted targets for those ligands, based on QSAR model results from <a href="https://predictor.ncats.io/" target="_blank">NCATS Predictor</a>.
* **Create Heatmaps**
    * On List Analysis pages, heatmaps can be constructed to show an overview of data for items in the list. 
    * For Target lists, you can construct a heatmap for:
        * All Active ligands, shaded according to the potency of the interaction
        * All Disease Associations, shaded according to the number of sources reporting the association
        * All Protein-Protein Interactions, shaded according to the String-DB Score
    * For Disease Lists, you can construct a heatmap for:
        * All Target Associations, shaded according to the number of sources reporting the association
    * For Ligand Lists, you can construct a heatmap for:
        * All Target Activities, shaded according to the potency of the interaction
* **Calculate Filter Value Enrichment**
    * On List Analysis pages, enrichment scores can be calculated to highlight the common features of the elements in the list
        * The side panel has always shown the counts of elements in the list that have each filter value, but the list is often dominated by very common values.
        * By calculating and sorting values by the enrichment scores, you can know which filter values in the list are represented more than expected by random chance. 
* **Improved Search Functionality**
    * One text search will return combined results from Targets, Diseases, and Ligands, as well as many filter values.
* **Updated database to TCRD 6.12.4**
    * <a href="http://juniper.health.unm.edu/tcrd/download/old_versions/TCRDv6.12.4.README" target="_blank">TCRD_v6.12.4.README</a>


### Bug Fixes / Miscellaneous updates
* There are now some interesting new filters for ligand lists, which determine the target classes of ligands in the list.
* Text labels for all buttons, to help the more casual users know how to do what they want to do
* Accessibility fixes

_______________

# 3.8.0 (2021-09-01)
### Added Features
* **AlphaFold Structures**
    * Structures from DeepMind and EMBL-EBI are shown alongside experimentally determined structures;
    * The Protein Structure Panel has some other improvements, such as the added ability to change the representation, and coloring, of the structures.
    * The table also shows some relevant details of the experimental structures, like the residues included in the structure, and the fraction of the total protein in the structure.
* **Expression Panel Improvements**
    * The Expression Panel has been simplified and improved to show a heatmap of tissues and data sources.
    * GTEx data is now included along with the other data sources.
* **Tutorials**
    * There are several tutorials to walk people through the new features of Pharos, or some of the lesser known features
    * Chemical structure search, the UpSet Charts, Uploading Custom Target Lists, etc. See the main menu item "Tutorials" to access them.

### Bug Fixes / Miscellaneous updates
* Structure Search now parses input from many different formats
* Filter visualizations on the list pages show either a Donut Chart, or an UpSet Chart. Previously there were tabs to show both of them.
_______________

# 3.7.0 (2021-07-01)
### Added Features
* **Structure Search**
    * Find ligands from TCRD that are most similar to a drawn or loaded structure, or ligands that have a certain substructure
    * Click the link from a Ligand List page to do a structure search, or start with a specific ligand structure from a ligand details page
* **UpSet Charts for Facets**
    * On list pages, a tab for UpSet charts is available to see the combinations of facet values for targets / diseases / ligands in the list
    * Filter the lists by clicking the bars or circles for a combination of values
    * Edit the facet values to create charts for any facet values. This can also be used to perform complex boolean logic between facet values (i.e. show a list of targets that have value A and B, but not C - select those values to build the UpSet chart, and select the right group to filter the list)
* **Related tools are shown as tiles for targets that have data in those tools**
    * DarkKinome, Resolulte, ProKino, TIGA, GENEVA, GlyGen, ARCHS4 all have tiles for the targets they have data for
* **Ligand List Improvements**
    * A facet of the Associated Targets for the ligands in the list is shown by default for Structure Similarity searches, and for Target based ligand lists (for general lists of ligands, you can find it in the "All Categories" list of facets)
    * A facet for Count of associated targets provides information about target specificity of ligands in the list
    * Ligands are now sorted by count of distinct targets, rather than count of potency measurements.

### Bug Fixes / Miscellaneous updates
* Reactome Pathway Browser and links now point to the newly released IDG versions of those tools
* Target list pages can be made for all targets with activity to a specific ligand, see links on the Ligand Details page
* Revamp orthologs information, which is in its own panel instead of in a tab of the Expression panel
* Compound structure rendering is now served by <a href="https://pharos-ligand.ncats.io/indexer" target="_blank">pharos.ligand.ncats.io/indexer</a>

_______________

# 3.6.0 (2021-05-01)
### Added Features
* **TIGA Data Visualizations**
    * Genome-wide association studies (GWAS) find associations between phenotypic traits and genes. Target Illumination GWAS Analytics (TIGA) scores and ranks those traits according to the a subset of the study parameters.
    * From target details pages, you'll see plots and tables of associated GWAS phenotypes, ranked according to the number and quality of GWAS studies involved. 
    * From disease details pages, you'll see plots and tables of associated targets, ranked accordingly as well.

* **Ligand Details pages for Drugs include UNIIs**

* **Link out to GlyGen from target details pages**

* **Updated Frequently Asked Questions**

* **Updated database to TCRD 6.11.0**
    * <a href="http://juniper.health.unm.edu/tcrd/download/old_versions/TCRDv6.10.0.README" target="_blank">TCRD_v6.10.0.README</a>
    * <a href="http://juniper.health.unm.edu/tcrd/download/old_versions/TCRDv6.11.0.README" target="_blank">TCRD_v6.11.0.README</a>

### Bug Fixes / Miscellaneous updates
* major version upgrade for d3 (6.6.2)
* DRGC data (IDG Resources) are fetched from TCRD now, rather than the API
* Harmonizome data sources previously wouldn't show up, the problem is fixed.
* DTO classes weren't showing up, now they do, the problem is fixed.

_______________

# 3.5.0 (2021-04-01)
### Added Features
* **Download Data from Pharos**
    * On List pages, and Details pages, find the download button and export a CSV file for further analysis
    * Downloads are limited to 250,000 rows in most cases
    * There are many groups of fields to download together, such as "Interacting Targets", "Associated Diseases", "Phenotypes", "Expression", "Publications" etc.
    * The download is packaged with a metadata file which describes the filters applied to the list, the fields downloaded, and date and time, and even the SQL query, for all the enthusiasts out there.

### Bug Fixes
* Searching for terms with apostrophes, such as "Pick's Disease" would sometimes cause errors and blank result sets. The problem is fixed.

_______________
# 3.4.0 (2021-02-26)
### Added Features
* **Ortholog Variant Data from ProKinO**
    * Most kinases will display a variant plot based on the alignment of sequences of many orthologous species
    * ProKinO also provides annotations for subdomains, structural and functional domains, and other motifs

* **How to Link to Pharos**
    * check out the about page for the url formats to use for linking and rendering structures
    
* **Search Similar Targets based on some multiple response target facets**
    * You could always find targets that have a specific value for a target facet, for example, generate a target <a href="/targets?facet=GO%20Function!drug%20binding" target="_blank">list of targets</a> that have a "GO Function" of "drug binding". Now, target details pages have links to generate lists of targets that share overlapping values, ranked by the degree of overlap. For example, generate a <a href="/targets?similarity=(P14416,%20GO%20Function)" target="_blank">list of targets</a> that have the most "GO Functions" with "DRD2" 
    * Links are available on target details pages for: GO Terms, Associated Diseases, Pathways, Interacting Viruses, and a few more.

* **Updated database to TCRD 6.8.4**
    * <a href="http://juniper.health.unm.edu/tcrd/download/old_versions/TCRD_v6.8.4.README" target="_blank">TCRD_v6.8.4.README</a>

### Bug Fixes & minor updates
* Page titles are different for each page
* Protein Sequence display is updated for easy reading, and copying

_______________
# 3.3.0 (2020-12-20)
### Added Features
* **New GO Terms component:**
    * GO Terms used to be in the Related Targets section, now there's a dedicated component that allows you to browse all the target's GO terms, and explore lists of other targets with the same term.
* **DTO and PANTHER class Facets:**
    * The hierarchy of classes defining targets are now clickable into displaying a target list of all targets in that class
* **Angular Upgrade:**
    * Upgrade to Angular 11
    * And to Firebase 8
* **Send Feedback:**
    * Submit bug reports, or feature requests through the popup form. Click the comment icon in the header to submit it directly to our Jira Queue where we will triage it.
* **Enhanced Amino Acid Counts:**
    * Amino acid counts in the Protein Sequence section are shown with more context. Overlayed with the counts for the protein, are the expected counts based on amino acid prevalence in all targets, making it easier to see if a target is enriched or depleted for certain amino acids.
    
### Bug Fixes
* Map old style /idg routes to their modern counterparts
* Resolve targets for target details pages based on Ensembl IDs
* Restyle TDL summary panel to be more intuitive

_______________
# 3.2.0 (2020-11-09)
### Added Features
* **Pathways for target details pages:**
    * Show Reactome Pathway browser when possible
    * Show other pathway datasources and links to their pages
    * Link to targets lists of all targets in each pathway
* **Show PDB ids for virus interactions that have confirmed PDB ids:**
    * Allows distinction between predicted viral interactions, and confirmed viral interactions
    
### Bug Fixes
* fixes for displaying on small screens
* accept queries from /search?q=term links

_______________
# 3.1.0 (2020-10-02)
### Added Features
* **Better data provenance:**
    * Info panels for disease details pages
    * Information bubbles for facets
* **Better API integration:**
    * There are now several starting queries to begin querying the database
* **Better search capabilities:**
    * Capacity to search for diseases or ligands
    * Updated typeahead functionality in all search fields
        * navigate to disease lists, or disease details
        * navigate to faceted target lists for search terms matching facet values

### Bug Fixes & formatting changes
* updated IUPHAR name to GtoPdb
* update About page to current data sources
* Make gene symbol more prominent on target cards
* Show PDB id instead of title
    
_______________
# 3.0.0 (2020-09-02)

### Added Features
* **Better capacity to explore lists:**
    * Pharos has previously had the capacity to narrow down a target list based on selection of values for many facets. Now the same exploration can be done on:
        * Lists of Targets that interact with a Target of interest
        * Lists of Targets associated with a given Disease
        * Lists of Ligands with activity for a given Target
        * Lists of Diseases associated with a given Target

* **Numeric Facets:** 
    * Pharos will display histograms of values for some numeric measures. Users can select a range of values to use to filter the list. 
    
* **Updated database to TCRD 6.7.0**
    * <a href="http://juniper.health.unm.edu/tcrd/download/old_versions/TCRD_v6.7.0.README" target="_blank">TCRD_v6.7.0.README</a>
    

### Bug Fixes
* Previously there was no CHANGELOG.md file
* Protein-protein interactions are better filtered for high probability interactions

_______________
# 2.x.0 (2020-07-02)

### Added Features
* **IDG Resources:**
    * Fetching and Displaying IDG resources for Cell Lines, Constructs, Mouse Lines, Datasets, etc. from <a href="https://rss.ccs.miami.edu/rss-apis/" target="_blank">https://rss.ccs.miami.edu/rss-apis/</a>
    * Display expression with a mouse anatomogram

* **Predicted Viral Interactions:**
    * Showing Target List Facets, and Target Details Panel for Predicted Viral Interactions from <a href="http://phipster.org/" target="_blank">P-HIPSTer</a>.
      
* **Revamp PDB Component:**
    * Update table to show better information for each structure shown
    
* **Server Side Rendering**
    * For SEO and better Unfurling

### Bug Fixes

* API page points to GraphQL instance, rather than defunct REST API
* Fix paging on drugs panel
