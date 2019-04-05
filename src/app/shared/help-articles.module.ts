import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ARTICLES} from "../../environments/help-article-tokens";
import {IlluminationGraphArticleComponent} from "../tools/help-panel/articles/illumination-graph-article/illumination-graph-article.component";
import {MaterialModule} from "../../assets/material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {TargetDevelopmentArticleComponent} from "../tools/help-panel/articles/target-development-article/target-development-article.component";
import {LigandActivityArticleComponent} from "../tools/help-panel/articles/ligand-activity-article/ligand-activity-article.component";
import {TinxArticleComponent} from "../tools/help-panel/articles/tinx-article/tinx-article.component";
import {PubmedScoreArticleComponent} from "src/app/tools/help-panel/articles/pubmed-score-article/pubmed-score-article.component";

@NgModule({
  declarations: [
    IlluminationGraphArticleComponent,
    TargetDevelopmentArticleComponent,
    LigandActivityArticleComponent,
    TinxArticleComponent,
    PubmedScoreArticleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: ARTICLES.ILLUMINATION_GRAPH_ARTICLE, useValue: IlluminationGraphArticleComponent },
    {provide: ARTICLES.TARGET_DEVELOPMENT_ARTICLE, useValue: TargetDevelopmentArticleComponent },
    {provide: ARTICLES.LIGAND_ACTIVITY_ARTICLE, useValue: LigandActivityArticleComponent },
    {provide: ARTICLES.TINX_ARTICLE, useValue: TinxArticleComponent },
    {provide: ARTICLES.PUBMED_SCORE_ARTICLE, useValue: PubmedScoreArticleComponent },
  ],
  entryComponents: [
    IlluminationGraphArticleComponent,
    TargetDevelopmentArticleComponent,
    LigandActivityArticleComponent,
    TinxArticleComponent,
    PubmedScoreArticleComponent
  ]
})
export class HelpArticlesModule { }
