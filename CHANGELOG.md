# 3.4.0 (2020-02-26)
### Added Features
* **Search Similar Targets based on some multiple response target facets**
    * You could always find targets that have a specific value for a target facet, for example, generate a target <a href="/targets?facet=GO%20Function!drug%20binding" target="_blank">list of targets</a> that have a "GO Function" of "drug binding". Now, target details pages have links to generate lists of targets that share overlapping values, ranked by the degree of overlap. For example, generate a <a href="/targets?similarity=(P14416,%20GO%20Function)" target="_blank">list of targets</a> that have the most "GO Functions" with "DRD2" 
    * Links are available on target details pages for: GO Terms, Associated Diseases, Pathways, Interacting Viruses, and a few more.

* **Updated database to TCRD 6.8.4**
    * <a href="http://juniper.health.unm.edu/tcrd/download/old_versions/TCRD_v6.8.4.README" target="_blank">TCRD_v6.8.4.README</a>
    

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
    * <a href="http://juniper.health.unm.edu/tcrd/download/TCRD_v6.7.0.README" target="_blank">TCRD_v6.7.0.README</a>
    

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
