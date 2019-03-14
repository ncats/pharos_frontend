import {InjectionToken} from '@angular/core';
import {NodeDisplayComponent} from "../app/pharos-main/data-details/topic-details/panels/node-display/node-display.component";

export class ARTICLES {
  /**
   * injection token to link to illumination graph description article
   */
  public static ILLUMINATION_GRAPH_ARTICLE = new InjectionToken<string>('IlluminationGraphArticleComponent');

}
