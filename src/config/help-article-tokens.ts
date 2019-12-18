import {InjectionToken} from '@angular/core';

/**
 * list of help articles
 */
export class ARTICLES {
  /**
   * injection token to link to illumination graph description article
   */
  public static ILLUMINATION_GRAPH_ARTICLE = new InjectionToken<string>('IlluminationGraphArticleComponent');

  /**
   * injection token to link to target developmentlevel  description article
   */
  public static TARGET_DEVELOPMENT_ARTICLE = new InjectionToken<string>('TargetDevelopmentArticleComponent');
  /**
   * injection token to link to ligand activity description article
   */
  public static LIGAND_ACTIVITY_ARTICLE = new InjectionToken<string>('LigandActivityArticleComponent');
  /**
   * injection token to link to tinx description article
   */
  public static TINX_ARTICLE = new InjectionToken<string>('TinxArticleComponent');

  /**
   * injection token to link to pubmed score description article
   */
  public static PUBMED_SCORE_ARTICLE = new InjectionToken<string>('PubmedScoreArticleComponent');

  /**
   * injection token to link to association score description article
   */
  public static ASSOCIATION_SCORES_ARTICLE = new InjectionToken<string>('AssociationScoreArticleComponent');

}
