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


# 2.x.0 (2020-07-02)

### Added Features
* **IDG Resources:**
    * Fetching and Displaying IDG resources for Cell Lines, Constructs, Mouse Lines, Datasets, etc. from <a href="https://rss.ccs.miami.edu/rss-apis/" target="_blank">https://rss.ccs.miami.edu/rss-apis/</a>
    * Display expression with a mouse anatamogram

* **Predicted Viral Interactions:**
    * Showing Target List Facets, and Target Details Panel for Predicted Viral Interactions from <a href="http://phipster.org/" target="_blank">P-HIPSTer</a>.
      
* **Revamp PDB Component:**
    * Update table to show better information for each structure shown
    
* **Server Side Rendering**
    * For SEO and better Unfurling

### Bug Fixes

* API page points to GraphQL instance, rather than defunct REST API
* Fix paging on drugs panel
