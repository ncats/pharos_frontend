import {InjectionToken} from '@angular/core';

/**
 * main class of injection tokens
 */
export class TOKENS {
  public static RADAR_CHART_TOKEN = new InjectionToken<string>('RadarChartComponent');
  /**
   *
   * injection token to maintain the breadcrumb component
   */
  public static PHAROS_BREADCRUMB_COMPONENT = new InjectionToken<string>('BreadcrumbComponent');
  /**
   * injection token to add the target details header
   */
  public static TARGET_HEADER_COMPONENT = new InjectionToken<string>('TargetHeaderComponent');
  /**
   * injection token to add the facets sidenav
   */
  public static PHAROS_FACETS_COMPONENT = new InjectionToken<string>('FilterPanelComponent');
  /**
   * injection token to add the selected facets list component
   */
  public static PHAROS_SELECTED_FACET_LIST_COMPONENT = new InjectionToken<string>('SelectedFacetListComponent');
  public static PHAROS_TARGET_LIGAND_HEATMAP_COMPONENT = new InjectionToken<string>('TargetLigandHeatmapComponent');
  public static PHAROS_LIGAND_TARGET_HEATMAP_COMPONENT = new InjectionToken<string>('LigandTargetHeatmapComponent');
  public static PHAROS_TARGET_DISEASE_HEATMAP_COMPONENT = new InjectionToken<string>('TargetDiseaseHeatmapComponent');
  public static PHAROS_ANALYZE_HEADER_COMPONENT = new InjectionToken<string>('AnalyzeHeaderComponent');
  public static PHAROS_SEQUENCE_LIST_COMPONENT = new InjectionToken<string>('SequenceAlignmentsComponent');
  public static PHAROS_DISEASE_TARGET_HEATMAP_COMPONENT = new InjectionToken<string>('DiseaseTargetHeatmapComponent');
  public static PHAROS_TARGET_TARGET_HEATMAP_COMPONENT = new InjectionToken<string>('TargetTargetHeatmapComponent');
  /**
   * injection token to add the facet donut chart
   */
  public static PHAROS_VISUALIZATION_COMPONENT = new InjectionToken<string>('PharosFacetVisualizationComponent');
  public static PHAROS_FACET_REPRESENTATION_COMPONENT = new InjectionToken<string>('FilterRepresentationComponent');
  public static PHAROS_HIERARCHY_VIEWER_COMPONENT = new InjectionToken<string>('HierarchyViewerComponent');
  /**
   * injection token to add the target details subnavigation component
   */
  public static PHAROS_SUBNAV_COMPONENT = new InjectionToken<string>('PharosSubnavComponent');
  /**
   * injection token to add the help panel sidenav
   */
  public static PHAROS_HELPPANEL_COMPONENT = new InjectionToken<string>('PharosHelpPanelComponent');

  /**
   * injection token to link to the target table component
   */
  public static TARGET_TABLE_COMPONENT = new InjectionToken<string>('TargetTableComponent');
  public static BROWSE_TABLE_COMPONENT = new InjectionToken<string>('BrowseComponent');

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
   * injection token to link to the target development summary component
   */
  public static LEVEL_SUMMARY_PANEL = new InjectionToken<string>('LevelSummaryPanelComponent');
  /**
   * injection token to link to the target development summary component
   */
  public static IDG_RESOURCES_PANEL = new InjectionToken<string>('IdgResourcesPanelComponent');
  /**
   * injection token to link to the disease source panel
   */
  public static DISEASE_SOURCE_PANEL = new InjectionToken<string>('DiseaseSourcePanelComponent');
  public static DISEASE_NOVELTY_PANEL = new InjectionToken<string>('DiseaseNoveltyComponent');
  /**
   * injection token to link to the target summary component
   */
  public static DISEASE_HEADER_COMPONENT = new InjectionToken<string>('DISEASE_HEADER_COMPONENT');
  public static DISEASE_SUMMARY_COMPONENT = new InjectionToken<string>('DiseaseSummaryComponent');
  public static DISEASE_DO_BROWSER_COMPONENT = new InjectionToken<string>('DiseaseDoBrowserComponent');
  public static DISEASE_TINX_COMPONENT = new InjectionToken<string>('TinxDiseaseComponent');
  public static DISEASE_GWAS_ANALYTICS_COMPONENT = new InjectionToken<string>('GwasDiseaseAnalyticsComponent');

  /**
   * injection token to link to the disease source panel
   */
  public static TARGET_LIST_PANEL = new InjectionToken<string>('TargetListPanel');

  /**
   * injection token to link to the publication statistics for a target
   */
  public static PUBLICATION_STATISTICS_PANEL = new InjectionToken<string>('PublicationStatisticsComponent');

  /**
   * injection token to link to the publication info for a target
   */
  public static RELATED_PUBLICATIONS_PANEL = new InjectionToken<string>('RelatedPublicationsComponent');

  /**
   * injection token to link to target expression data visualizations
   */
  public static EXPRESSION_PANEL = new InjectionToken<string>('ExpressionPanelComponent');

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
   * injection token to show predicted viral interactions
   */
  public static VIRAL_INTERACTIONS_PANEL = new InjectionToken<string>('ViralInteractionPanelComponent');
  /**
   * injection token to link to active ligand data
   */
  public static LIGANDS_PANEL = new InjectionToken<string>('LigandPanelComponent');

  /**
   * injection token to link to approved drug data
   */
  public static DRUGS_PANEL = new InjectionToken<string>('DrugsPanelComponent');
  /**
   * injection token to link to the other facets for a specific target
   */
  public static TARGET_FACET_PANEL = new InjectionToken<string>('TargetFacetPanelComponent');
  /*/!**
   * Injection token for topics list
   *!/
  public static TOPIC_TABLE_COMPONENT = new InjectionToken<string>('TopicTableComponent');
  /!**
   * Injection token for topics details component
   *!/
  public static TOPIC_DETAILS_COMPONENT = new InjectionToken<string>('TopicDetailsComponent');

  /!**
   * injection token to add the topic details header
   *!/
  public static TOPIC_HEADER_COMPONENT = new InjectionToken<string>('TopicHeaderComponent');

  /!**
   * injection token to add the neo4j graph vis
   *!/
  public static TOPIC_GRAPH_PANEL = new InjectionToken<string>('TopicGraphPanelComponent');
  /!**
   * injection token to add the neo4j graph node details
   *!/
  public static NODE_DISPLAY_PANEL = new InjectionToken<string>('NodeDisplayComponent');
*/
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

  // no longer in use
  // public static IDG_LEVEL_TOKEN = new InjectionToken('IDGLevelComponent');
  /**
   * injection token to link to target relevance data
   */
  public static TARGET_RELEVANCE_PANEL = new InjectionToken<string>('TargetRelevancePanelComponent');
  /**
   * injection token to link to the pathways data
   */
  public static PATHWAYS_PANEL = new InjectionToken<string>('PathwaysPanelComponent');

  public static INTERACTING_PATHWAYS_PANEL = new InjectionToken<string>('InteractingPathwaysComponent');

  public static GO_TERMS_PANEL = new InjectionToken<string>('GoTermsComponent');

  public static SEQUENCE_LOGO = new InjectionToken<string>('SequenceLogoComponent');

  public static GWAS_TARGET_ANALYTICS_PANEL = new InjectionToken<string>('GwasTargetAnalyticsComponent');

  public static NEAREST_TCLIN_PANEL = new InjectionToken<string>('NearestTclinPanelComponent');

  public static AFFILIATE_LINKS = new InjectionToken('AffiliateLinksComponent');

  public static ORTHOLOGS_PANEL = new InjectionToken('OrthologPanelComponent');
}
