import {InjectionToken} from "@angular/core";
import {BreadcrumbComponent} from "../app/tools/breadcrumb/breadcrumb.component";
import {TargetHeaderComponent} from "../app/pharos-main/data-details/target-details/target-header/target-header.component";

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
   * injection token to link to the target knowledge visualization
   */
  public static KNOWLEDGE_PANEL = new InjectionToken<string>('KnowledgePanelComponent');
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
}
