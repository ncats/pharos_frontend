import {IDGResourceSerializer} from '../src/app/models/idg-resources/resource-serializer';

// https://rss.ccs.miami.edu/rss-api/target/id?id=2786292a-51d0-4d81-90dc-7a605569bcc2&json=true
export const TEST_RESOURCE_CELL1 = new IDGResourceSerializer().fromJson({
    Tissue: 'Spleen',
    Type: 'epithelial cell',
    Repository: 'UCSF',
    Gene: 'CLCN6',
    Data_page_link: 'https://darkmatter.ucsf.edu/cell/idg-hek293t-clcn6-v5-oe',
    Status_Milestone_Cells: 'Complete',
    Repository_page_link: 'https://darkmatter.ucsf.edu/cell/idg-hek293t-clcn6-v5-oe',
    RRID: 'CVCL_YA39',
    Species: 'Homo sapiens',
    Name: 'IDG-HEK293T-CLCN6-V5-OE'
}, 'Cell');

// https://rss.ccs.miami.edu/rss-api/target/id?id=d5774cdd-ced3-4dfd-8339-c0322c6dd3b0&json=true
export const TEST_RESOURCE_CELL2 = new IDGResourceSerializer().fromJson({
    Tissue: 'Spleen',
    Type: 'epithelial cell',
    Repository: 'UCSF',
    Gene: 'CHRNA2',
    Data_page_link: 'https://darkmatter.ucsf.edu/cell/idg-hek293t-chrna2-v5-oe',
    Status_Milestone_Cells: 'Complete',
    Repository_page_link: 'https://darkmatter.ucsf.edu/cell/idg-hek293t-chrna2-v5-oe',
    RRID: 'CVCL_YA35',
    Species: 'Homo sapiens',
    Name: 'IDG-HEK293T-CHRNA2-V5-OE'
}, 'Cell');

// https://rss.ccs.miami.edu/rss-api/target/id?id=de219ecf-81d1-4b74-9666-c454f44c82a6&json=true
export const TEST_RESOURCE_CHEMICAL_TOOL1 = new IDGResourceSerializer().fromJson({
    External_ID: '144673',
    Chemical_tool_page: 'https://darkkinome.org/compounds/PA-16-0081C',
    Description: 'Chemical Tool',
    Link_to_the_supporting_data: 'https://www.synapse.org/#!Synapse:syn20715375',
    Status_Milestone_Tool_available: 'Complete',
    Authors: 'null',
    Data_Repository: 'Synapse',
    Activity: 'null',
    Status_Milestone_Broad_screening: 'Complete',
    Selectivity: 'null',
    Status_Milestone_Cell_active_tool: 'Complete',
    Name: 'PA-16-0081C',
    Gene: 'HIPK4',
    Endpoint: 'null',
    Data_Link: 'https://www.synapse.org/#!Synapse:syn20715375',
    Link_Milestone_Cell_active_tool: 'https://www.synapse.org/#!Synapse:syn20715375',
    Canonical_SMILES: 'CN(CC1)CCN1C2=CC=C(NC3=NC=C(CC(C)(C)C4=C5N(C)N=C4C(NC)=O)C5=N3)C(C)=C2',
    Assay_ID: 'null',
    Title: 'PA-16-0081C',
    Repository_page_link: 'https://www.sgc-unc.org/request-idg-tools',
    Ligand_type: 'null',
    Provider_institution: 'UNC-CH',
    External_ID_registration_system: 'ChEBI',
    PI: 'Tim Willson',
    Link_Milestone_Broad_screening: 'https://www.discoverx.com/services/drug-discovery-development-services/kinase-profiling/kinomescan'
}, 'Chemical Tool');

// https://rss.ccs.miami.edu/rss-api/target/id?id=92192412-263c-48b8-a670-26ca94e2cb5c&json=true
export const TEST_RESOURCE_CHEMICAL_TOOL2 = new IDGResourceSerializer().fromJson({
    External_ID: '143119',
    Chemical_tool_page: 'https://darkkinome.org/compounds/UNC-BE1-004',
    Description: 'Chemical Tool',
    Link_to_the_supporting_data: 'https://www.synapse.org/#!Synapse:syn18485189',
    Status_Milestone_Tool_available: 'Complete',
    Authors: 'null',
    Data_Repository: 'Synapse',
    Activity: 'null',
    Status_Milestone_Broad_screening: 'Complete',
    Selectivity: 'null',
    Status_Milestone_Cell_active_tool: 'Complete',
    Name: 'UNC-BE1-004',
    Gene: 'MKNK2',
    Endpoint: 'null',
    Data_Link: 'https://www.synapse.org/#!Synapse:syn18485189',
    Link_Milestone_Cell_active_tool: 'https://www.synapse.org/#!Synapse:syn18485189',
    Canonical_SMILES: 'O=C(C1=CC=C(NC2=NC3=CC=C(C4=CC=NC=C4)C=C3C=N2)C=C1)NCCOC',
    Assay_ID: 'null',
    Title: 'UNC-BE1-004',
    Repository_page_link: 'https://www.sgc-unc.org/request-idg-tools',
    Ligand_type: 'null',
    Provider_institution: 'UNC-CH',
    External_ID_registration_system: 'ChEBI',
    PI: 'Tim Willson',
    Link_Milestone_Broad_screening: 'https://www.discoverx.com/services/drug-discovery-development-services/kinase-profiling/kinomescan'
}, 'Chemical Tool');

// https://rss.ccs.miami.edu/rss-api/target/id?id=d462e644-289d-4dce-9411-e92d80e2f97d&json=true
export const TEST_RESOURCE_EXPRESSION1 = new IDGResourceSerializer().fromJson({
    Description: 'Expression ofKcna6 in Dorsal Root Ganglion with or without injury using in situ hybridization',
    Status_Milestone_Expression: 'Complete',
    Assay_ID: 'null',
    Authors: 'Joao Braz',
    Data_Repository: 'UCSF',
    Title: 'Expression ofKcna6 in Dorsal Root Ganglion',
    Data_Format: 'JPEG',
    Provider_institution: 'UCSF',
    Repository: 'https://darkmatter.ucsf.edu/',
    Gene: 'KCNA6',
    Endpoint: 'gene-expression profile endpoint',
    Endpoint_detection: 'fluorescence microscopy',
    Dataset_ID: 'In situ expression in Dorsal Root Ganglion',
    Release_Date: '02/06/2020',
    Data_Link: 'https://darkmatter.ucsf.edu/expression/expression-kcna6-dorsal-root-ganglion',
    PI: 'Allan Basbaum'
}, 'Expression');

// https://rss.ccs.miami.edu/rss-api/target/id?id=04c8a1cf-c289-45d0-9a43-399c8da13fc3&json=true
export const TEST_RESOURCE_EXPRESSION2 = new IDGResourceSerializer().fromJson({
    Description: 'Expression ofTmc7 in Dorsal Root Ganglion with or without injury using in situ hybridization',
    Status_Milestone_Expression: 'Complete',
    Assay_ID: 'null',
    Authors: 'Joao Braz',
    Data_Repository: 'UCSF',
    Title: 'Expression ofTmc7 in Dorsal Root Ganglion',
    Data_Format: 'JPEG',
    Provider_institution: 'UCSF',
    Repository: 'https://darkmatter.ucsf.edu/',
    Gene: 'TMC7',
    Endpoint: 'gene-expression profile endpoint',
    Endpoint_detection: 'fluorescence microscopy',
    Dataset_ID: 'In situ expression in Dorsal Root Ganglion',
    Release_Date: '02/06/2020',
    Data_Link: 'https://darkmatter.ucsf.edu/expression/expression-tmc7-dorsal-root-ganglion',
    PI: 'Allan Basbaum'
}, 'Expression');

// https://rss.ccs.miami.edu/rss-api/target/id?id=e7425931-114d-4c4e-9e7c-d58fa1e61a90&json=true
export const TEST_RESOURCE_CONSTRUCT1 = new IDGResourceSerializer().fromJson({
    sgRNA_sequence: 'null',
    Ga_chimeric: 'null',
    Repository_page_link: 'https://darkmatter.ucsf.edu/constructs/idg_pkd2l2_oe_1',
    Vector_type: 'cDNA',
    tTA_TEV: 'null',
    Status_Milestone_cDNA: 'Complete',
    oGPCR_Uni: 'null',
    Status_Milestone_CRISPR: 'null',
    Name: 'IDG_PKD2L2_OE_1',
    Promoter: 'CMV',
    Presto_protease: 'null',
    Vector_page_link: 'https://darkmatter.ucsf.edu/constructs/idg_pkd2l2_oe_1',
    Empty: 'No',
    Chimeric_Uni: 'null',
    Target: 'null',
    Repository: 'UCSF',
    Gene: 'PKD2L2',
    Data_page_link: 'null',
    Vector_ID: 'IDG_PKD2L2_OE_1',
    Vector_backbone_id: 'pLX304',
    oGPCR: 'null',
    Tag: 'C terminal V5',
    RRID: 'null'
}, 'Genetic Construct');

// https://rss.ccs.miami.edu/rss-api/target/id?id=ae18e8c0-f24f-4cb9-af29-4188022c330c&json=true
export const TEST_RESOURCE_CONSTRUCT2 = new IDGResourceSerializer().fromJson({
    sgRNA_sequence: 'null',
    Ga_chimeric: 'null',
    Repository_page_link: 'https://darkmatter.ucsf.edu/constructs/idg_kcnip1_oe_1',
    Vector_type: 'cDNA',
    tTA_TEV: 'null',
    Status_Milestone_cDNA: 'Complete',
    oGPCR_Uni: 'null',
    Status_Milestone_CRISPR: 'null',
    Name: 'IDG_KCNIP1_OE_1',
    Promoter: 'CMV',
    Presto_protease: 'null',
    Vector_page_link: 'https://darkmatter.ucsf.edu/constructs/idg_kcnip1_oe_1',
    Empty: 'No',
    Chimeric_Uni: 'null',
    Target: 'null',
    Repository: 'UCSF',
    Gene: 'KCNIP1',
    Data_page_link: 'null',
    Vector_ID: 'IDG_KCNIP1_OE_1',
    Vector_backbone_id: 'pLX304',
    oGPCR: 'null',
    Tag: 'C terminal V5',
    RRID: 'null'
}, 'Genetic Construct');

// https://rss.ccs.miami.edu/rss-api/target/id?id=f0eb8b4d-a875-4851-8e3f-01b20a93c61e&json=true
export const TEST_RESOURCE_MOUSE_IMAGING1 = new IDGResourceSerializer().fromJson({
    Status_Milestone_Guide_RNAs: 'Complete',
    Description: 'This data is a collection of image sets derived through crossing of a CRE driver line to the Ai9 CRE-reporter mouse line. Individual organs were harvested, histologically processed, and imaged using an Olympus Slide Scanner. Individual images are uploaded and stored on the amis.docking.org webserver for public viewing. This data represents our summary of the positive or negative classification of this organ for expression of the specificed gene.',
    Authors: 'Yi-Ting Chiu, Noah Sciaky, Karoline White, Justin English, Kunjie Hua, Reid Olsen',
    Sex: 'male',
    Data_Repository: 'amis.docking.org',
    Tissue_ID: 'UBERON_0002106',
    Name: 'C57BL/6J-Gpr85em1(Gpr85*,cre)Blr/Mmnc',
    Status_Milestone_Germ_line_transmission: 'Complete',
    Tissue: 'spleen',
    Gene: 'GPR85',
    Endpoint: 'fold change',
    Data_page_link: 'http://amis.docking.org/lookups?gene_name=GPR85&organ_name=spleen',
    Data_Link: 'http://amis.docking.org/img_browser?instrument=Histological&gene=GPR85&organ=spleen',
    Expression_data: 'yes',
    Assay_ID: 'null',
    Status_Milestone_Anatomic_survey: 'Complete',
    Title: 'FLAG-GPR85-IRES-CRExAi9_spleen_male',
    Status_Milestone_Embryo_injection: 'Complete',
    Repository_page_link: 'https://www.mmrrc.org/catalog/sds.php?mmrrc_id=65313',
    Data_Format: 'TIFF',
    Provider_institution: 'UNC Chapel Hill',
    Endpoint_detection: 'fluorescence intensity',
    Status_Milestone_Validation_of_expression: 'Complete',
    Status_Milestone_Detailed_expression: 'Complete',
    PI: 'Bryan Roth',
    Status_Milestone_Mouse_available: 'Complete',
    MMRRC_ID: '065283-UNC'
}, 'GPCR Mouse Imaging');

// https://rss.ccs.miami.edu/rss-api/target/id?id=3fc152ee-a52f-4dd4-8973-ccc0c6a7633b&json=true
export const TEST_RESOURCE_MOUSE_IMAGING2 = new IDGResourceSerializer().fromJson({
    Status_Milestone_Guide_RNAs: 'Complete',
    Description: 'This data is a collection of image sets derived through crossing of a CRE driver line to the Ai9 CRE-reporter mouse line. Individual organs were harvested, histologically processed, and imaged using an Olympus Slide Scanner. Individual images are uploaded and stored on the amis.docking.org webserver for public viewing. This data represents our summary of the positive or negative classification of this organ for expression of the specificed gene.',
    Authors: 'Yi-Ting Chiu, Noah Sciaky, Karoline White, Justin English, Kunjie Hua, Reid Olsen',
    Sex: 'male',
    Data_Repository: 'amis.docking.org',
    Tissue_ID: 'UBERON_0000955',
    Name: 'C57BL/6J-Tas2r108em1(Tas2r108*,cre)Blr/Mmnc',
    Status_Milestone_Germ_line_transmission: 'Complete',
    Tissue: 'brain',
    Gene: 'TAS2R4',
    Endpoint: 'fold change',
    Data_page_link: 'http://amis.docking.org/lookups?gene_name=TAS2R4&organ_name=brain',
    Data_Link: 'http://amis.docking.org/img_browser?instrument=Histological&gene=TAS2R4&organ=brain',
    Expression_data: 'yes',
    Assay_ID: 'null',
    Status_Milestone_Anatomic_survey: 'Complete',
    Title: 'FLAG-TAS2R4-IRES-CRExAi9_Brain_male',
    Status_Milestone_Embryo_injection: 'Complete',
    Repository_page_link: 'https://www.mmrrc.org/catalog/sds.php?mmrrc_id=65284',
    Data_Format: 'TIFF',
    Provider_institution: 'UNC Chapel Hill',
    Endpoint_detection: 'fluorescence intensity',
    Status_Milestone_Validation_of_expression: 'Complete',
    Status_Milestone_Detailed_expression: 'Complete',
    PI: 'Bryan Roth',
    Status_Milestone_Mouse_available: 'Complete',
    MMRRC_ID: '065282-UNC'
}, 'GPCR Mouse Imaging');

// https://rss.ccs.miami.edu/rss-api/target/id?id=5730f6da-3fb8-4bda-a781-5515c8019a26&json=true
export const TEST_RESOURCE_MOUSE1 = new IDGResourceSerializer().fromJson({
    Status_Milestone_Guide_RNAs: 'Complete',
    Status_Milestone_Anatomic_survey: 'Complete',
    Status_Milestone_Embryo_injection: 'Complete',
    Repository_page_link: 'https://www.mmrrc.org/catalog/sds.php?mmrrc_id=65281',
    Name: 'C57BL/6J-Gpr68em1(cre)Blr/Mmnc',
    Status_Milestone_Germ_line_transmission: 'Complete',
    Allele: 'Deletion',
    Repository: 'Mutant Mouse Resource & Research Centers',
    Gene: 'GPR68',
    Data_page_link: 'http://amis.docking.org/img_browser?instrument=Histological&gene=GPR68',
    Status_Milestone_GPCR_Mouse_available: 'Complete',
    Construct_details: 'https://www.mmrrc.org/catalog/sds.php?mmrrc_id=65281',
    Status_Milestone_Validation_of_expression: 'Complete',
    Status_Milestone_Detailed_expression: 'Complete',
    MMRRC_ID: '65281',
    Corresponding_construct: 'https://benchling.com/s/nGG8uzls',
    Status_Milestone_IonChannel_Mouse: 'null'
}, 'Mouse');

// https://rss.ccs.miami.edu/rss-api/target/id?id=8b1fe4a5-6e4b-41e0-94d7-90184dd092b8&json=true
export const TEST_RESOURCE_MOUSE2 = new IDGResourceSerializer().fromJson({
    Status_Milestone_Guide_RNAs: 'Complete',
    Status_Milestone_Anatomic_survey: 'Complete',
    Status_Milestone_Embryo_injection: 'Complete',
    Repository_page_link: 'https://www.mmrrc.org/catalog/sds.php?mmrrc_id=65283',
    Name: 'C57BL/6J-Gpr85em1(Gpr85*,cre)Blr/Mmnc',
    Status_Milestone_Germ_line_transmission: 'Complete',
    Allele: 'Insertion',
    Repository: 'Mutant Mouse Resource & Research Centers',
    Gene: 'GPR85',
    Data_page_link: 'http://amis.docking.org/img_browser?instrument=Histological&gene=GPR85',
    Status_Milestone_GPCR_Mouse_available: 'Complete',
    Construct_details: 'https://www.mmrrc.org/catalog/sds.php?mmrrc_id=65283',
    Status_Milestone_Validation_of_expression: 'Complete',
    Status_Milestone_Detailed_expression: 'Complete',
    MMRRC_ID: '65283',
    Corresponding_construct: 'null',
    Status_Milestone_IonChannel_Mouse: 'null'
}, 'Mouse');

// // https://rss.ccs.miami.edu/rss-api/target/id?id=e763807c-1868-4267-aa19-0519f95da7e4&json=true
// const TEST_RESOURCE_PHENOTYPE1 = new IDGResourceSerializer().fromJson({}
//   , "name", "Mouse phenotype data");
//
// // https://rss.ccs.miami.edu/rss-api/target/id?id=8febf7dc-941e-4ed2-95db-e61f4a7cc9f3&json=true
// const TEST_RESOURCE_PHENOTYPE2 = new IDGResourceSerializer().fromJson({}
//   , "name", "Mouse phenotype data");

// https://rss.ccs.miami.edu/rss-api/target/id?id=f0b127a3-1a74-4b27-9336-7086831881df&json=true
export const TEST_RESOURCE_NANOBRET1 = new IDGResourceSerializer().fromJson({
    Description: 'NanoBRET Assay Tracer Titration',
    Assay_ID: 'null',
    Authors: 'null',
    Data_Repository: 'Synapse',
    Title: 'NanoLuc®-BRSK2',
    Status_Milestone_NanoBRET_tracer: 'Complete',
    Provider_institution: 'UNC-CH',
    Repository: 'Synapse',
    Gene: 'BRSK2',
    Link_Milestone_NanoBRET_assay: 'https://www.synapse.org/#!Synapse:syn18435656',
    Dataset_ID: 'null',
    Release_Date: 'null',
    Data_Link: 'https://www.synapse.org/#!Synapse:syn18435656',
    PI: 'Tim Willson',
    Status_Milestone_NanoBRET_assay: 'Complete',
    Link_Milestone_NanoBRET_tracer: 'https://www.synapse.org/#!Synapse:syn18435656'
}, 'NanoBRET');

// https://rss.ccs.miami.edu/rss-api/target/id?id=38076d76-02ec-4d03-88e9-c15020021e77&json=true
export const TEST_RESOURCE_NANOBRET2 = new IDGResourceSerializer().fromJson({
    Description: 'NanoBRET Assay Tracer Titration',
    Assay_ID: 'null',
    Authors: 'null',
    Data_Repository: 'Synapse',
    Title: 'NanoLuc®-fused DCLK3',
    Status_Milestone_NanoBRET_tracer: 'Complete',
    Provider_institution: 'UNC-CH',
    Repository: 'Synapse',
    Gene: 'DCLK3',
    Link_Milestone_NanoBRET_assay: 'https://www.synapse.org/#!Synapse:syn20689587',
    Dataset_ID: 'null',
    Release_Date: 'null',
    Data_Link: 'https://www.synapse.org/#!Synapse:syn20689587',
    PI: 'Tim Willson',
    Status_Milestone_NanoBRET_assay: 'Complete',
    Link_Milestone_NanoBRET_tracer: 'https://www.synapse.org/#!Synapse:syn20689587'
}, 'NanoBRET');

// https://rss.ccs.miami.edu/rss-api/target/id?id=d6507f40-c1c4-4134-a699-d7c7ce862940&json=true
export const TEST_RESOURCE_PEPTIDE1 = new IDGResourceSerializer().fromJson({
    Peptide_sequence: 'LGSSSLTNIPEEVR',
    Link_Milestone_PRM_curve: 'https://www.synapse.org/#!Synapse:syn21444294',
    Status_Milestone_Expression: 'null',
    Vendor_cat: 'null',
    Status_Milestone_Protein_Interactions: 'null',
    Link_Milestone_PRM_peptides: 'https://www.synapse.org/#!Synapse:syn21444294',
    Link_Milestone_Cells: 'null',
    Vendor: 'New England Peptide',
    Repository_page_link: 'null',
    Gene_symbol: 'null',
    Status_Milestone_PRM_curve: 'Complete',
    Name: 'SCYL2-LGSSSLTNIPEEVR',
    UniProt_ID: 'null',
    Repository: 'null',
    Link_Milestone_Expression: 'null',
    Link_Milestone_Protein_Interactions: 'null',
    Gene: 'SCYL2',
    Gene_ID: 'null',
    Data_page_link: 'https://www.synapse.org/#!Synapse:syn21444294',
    Status_Milestone_PRM_peptides: 'Complete',
    Status_Milestone_Cells: 'null',
    PRM_type: 'null'
}, 'Peptide');

// https://rss.ccs.miami.edu/rss-api/target/id?id=6c364c55-48c4-4718-86fa-899665868f7e&json=true
export const TEST_RESOURCE_PEPTIDE2 = new IDGResourceSerializer().fromJson({
    Peptide_sequence: 'ISALENSK',
    Link_Milestone_PRM_curve: 'https://www.synapse.org/#!Synapse:syn21444294',
    Status_Milestone_Expression: 'null',
    Vendor_cat: 'null',
    Status_Milestone_Protein_Interactions: 'null',
    Link_Milestone_PRM_peptides: 'https://www.synapse.org/#!Synapse:syn21444294',
    Link_Milestone_Cells: 'null',
    Vendor: 'New England Peptide',
    Repository_page_link: 'null',
    Gene_symbol: 'null',
    Status_Milestone_PRM_curve: 'Complete',
    Name: 'TLK2-ISALENSK',
    UniProt_ID: 'null',
    Repository: 'null',
    Link_Milestone_Expression: 'null',
    Link_Milestone_Protein_Interactions: 'null',
    Gene: 'TLK2',
    Gene_ID: 'null',
    Data_page_link: 'https://www.synapse.org/#!Synapse:syn21444294',
    Status_Milestone_PRM_peptides: 'Complete',
    Status_Milestone_Cells: 'null',
    PRM_type: 'null'
}, 'Peptide');



