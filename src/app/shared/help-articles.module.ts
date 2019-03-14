import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ARTICLES} from "../../environments/help-article-tokens";
import {IlluminationGraphArticleComponent} from "../tools/help-panel/articles/illumination-graph-article/illumination-graph-article.component";

@NgModule({
  declarations: [
    IlluminationGraphArticleComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: ARTICLES.ILLUMINATION_GRAPH_ARTICLE, useValue: IlluminationGraphArticleComponent },
  ],
  entryComponents: [
    IlluminationGraphArticleComponent
  ]
})
export class HelpArticlesModule { }
