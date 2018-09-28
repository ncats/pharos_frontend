import {InjectionToken} from '@angular/core';
import {NodeDisplayComponent} from '../app/pharos-main/data-details/topic-details/panels/node-display/node-display.component';

export class TOKENS {
  /**
   * injection token to maintain the breadcrumb component
   */
  public static PHAROS_BREADCRUMB_COMPONENT = new InjectionToken<string>('BreadcrumbComponent');

  /**
   * injection token to add the target details header
   */
  public static TARGET_HEADER_COMPONENT = new InjectionToken<string>('TargetHeaderComponent');

  /**
   * injection token to link to the target table component
   */
  public static TARGET_TABLE_COMPONENT = new InjectionToken<string>('TargetTableComponent');

  /**
   * injection token to link to the target details component
   */
  public static TARGET_DETAILS_COMPONENT = new InjectionToken<string>('TargetDetailsComponent');
  /**
   * injection token to link to the disease details component
   */
  public static DISEASE_DETAILS_COMPONENT = new InjectionToken<string>('DiseaseDetailsComponent');
  /**
   * injection token to link to the disease table component
   */
  public static DISEASE_TABLE_COMPONENT = new InjectionToken<string>('DiseaseTableComponent');
  /**
   * injection token to link to the target summary component
   */
  public static SUMMARY_PANEL = new InjectionToken<string>('SummaryPanelComponent');
  /**
   * injection token to link to the disease source panel
   */
  public static DISEASE_SOURCE_PANEL = new InjectionToken<string>('DiseaseSourcePanelComponent');

  /**
   * injection token to link to the target summary component
   */
  public static DISEASE_HEADER_COMPONENT = new InjectionToken<string>('DiseaseHeaderComponent');
  /**
   * injection token to link to the disease source panel
   */
  public static TARGET_LIST_PANEL = new InjectionToken<string>('TargetListPanel');

  /**
   * injection token to link to the references for a target
   */
  public static REFERENCES_PANEL = new InjectionToken<string>('ReferencesPanelComponent');
  /**
   * injection token to link to target expression data visualizations
   */
  public static EXPRESSION_PANEL = new InjectionToken<string>('ExpressionPanelComponent');
  /**
   * injection token to link to target ortholog data
   */
  public static ORTHOLOG_PANEL = new InjectionToken<string>('OrthologPanelComponent');
  /**
   * injection token to link to gene rif data
   */
  public static GENE_RIF_PANEL = new InjectionToken<string>('GeneRifComponent');
  /**
   * injection token to link to gene rif data
   */
  public static ASSAY_PANEL = new InjectionToken<string>('AssayComponent');

  /**
   * injection token to link to amino acid sequence data
   */
  public static AA_SEQUENCE_PANEL = new InjectionToken<string>('AASequenceComponent');

  /**
   * injection Token to link to protein to protein interaction data
   * @type {InjectionToken<string>}
   */
  public static PROTEIN_PROTEIN_PANEL = new InjectionToken<string>('ProteinProteinPanelComponent');

  /**
   * injection token to link to amino acid sequence data
   */
  public static LIGANDS_PANEL = new InjectionToken<string>('LigandPanelComponent');
  /**
   * injection token to link to the other facets for a specific target
   */
  public static TARGET_FACET_PANEL = new InjectionToken<string>('TargetFacetPanelComponent');
  /**
   * Injection token for topics list
   */
  public static TOPIC_TABLE_COMPONENT = new InjectionToken<string>('TopicTableComponent');
  /**
   * Injection token for topics details component
   */
  public static TOPIC_DETAILS_COMPONENT = new InjectionToken<string>('TopicDetailsComponent');

  /**
   * injection token to add the topic details header
   */
  public static TOPIC_HEADER_COMPONENT = new InjectionToken<string>('TopicHeaderComponent');

  /**
   * injection token to add the neo4j graph vis
   */
  public static TOPIC_GRAPH_PANEL = new InjectionToken<string>('TopicGraphPanelComponent');
  /**
   * injection token to add the neo4j graph node details
   */
  public static NODE_DISPLAY_PANEL = new InjectionToken<string>('NodeDisplayComponent');

  /**
   * Injection token for ligands list
   */
  public static LIGAND_TABLE_COMPONENT = new InjectionToken<string>('LigandTableComponent');
  /**
   * Injection token for ligands details component
   */
  public static LIGAND_DETAILS_COMPONENT = new InjectionToken<string>('LigandDetailsComponent');
  /**
   * Injection token for ligands header component
   */
  public static LIGAND_HEADER_COMPONENT = new InjectionToken<string>('LigandHeaderComponent');
  /**
   * injection token to link to synonyms data
   */
  public static SYNONYMS_PANEL = new InjectionToken<string>('SynonymsComponent');
 /**
 * injection token to link to structure view data
 */
public static STRUCTURE_VIEW_PANEL = new InjectionToken<string>('StructureViewComponent');
 /**
 * injection token to link to molecular definition data
 */
public static MOLECULAR_DEFINITION_PANEL = new InjectionToken<string>('MolecularDefinitionComponent');
 /**
 * injection token to link to target relevance data
 */
public static TARGET_RELEVANCE_PANEL = new InjectionToken<string>('TargetRelevanceComponent');
 }
