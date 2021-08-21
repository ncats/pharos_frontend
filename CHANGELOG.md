# 3.8.0 (2021-09-01)
### Added Features
* **AlphaFold Structures**
    * Structures from DeepMind and EMBL-EBI are shown alongside experimentally determined structures
    * The Protein Structure Panel has some other improvements, such as the capacity to change the representation and coloring of the structures.
    * The table also shows some relevant measures of experimental structures like the residues included in the structure, and the fraction of the total protein in the structure.
* **Expression Panel Improvments**
    * The Expression Panel has been simplified and improved to show a heatmap of tissues and data sources.
* **Tutorials**
    * There are several tutorials to walk people through the new features of Pharos, or some of the lesser known features
    * Chemical structure search, the UpSet Charts, Uploading Custom Target Lists, etc.

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
    * The heirarchy of classes defining targets are now clickable into displaying a target list of all targets in that class
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
