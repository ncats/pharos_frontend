import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ARTICLES} from "../../environments/help-article-tokens";
import {IlluminationGraphArticleComponent} from "../tools/help-panel/articles/illumination-graph-article/illumination-graph-article.component";
import {MaterialModule} from "../../assets/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    IlluminationGraphArticleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: ARTICLES.ILLUMINATION_GRAPH_ARTICLE, useValue: IlluminationGraphArticleComponent },
  ],
  entryComponents: [
    IlluminationGraphArticleComponent
  ]
})
export class HelpArticlesModule { }
