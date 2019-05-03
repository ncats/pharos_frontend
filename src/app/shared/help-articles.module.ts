import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {_ARTICLES} from '../../environments/help-article-tokens';
import {IlluminationGraphArticleComponent} from '../tools/help-panel/articles/illumination-graph-article/illumination-graph-article.component';
import {MaterialModule} from '../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TargetDevelopmentArticleComponent} from '../tools/help-panel/articles/target-development-article/target-development-article.component';
import {LigandActivityArticleComponent} from '../tools/help-panel/articles/ligand-activity-article/ligand-activity-article.component';
import {TinxArticleComponent} from '../tools/help-panel/articles/tinx-article/tinx-article.component';
import {PubmedScoreArticleComponent} from '../tools/help-panel/articles/pubmed-score-article/pubmed-score-article.component';
import {EquationRendererComponent} from '../tools/equation-renderer/equation-renderer.component';
import {KatexRendererDirective} from '../tools/equation-renderer/katex-renderer.directive';

@NgModule({
  declarations: [
    IlluminationGraphArticleComponent,
    TargetDevelopmentArticleComponent,
    LigandActivityArticleComponent,
    TinxArticleComponent,
    PubmedScoreArticleComponent,
    EquationRendererComponent,
    KatexRendererDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    {provide: _ARTICLES.ILLUMINATION_GRAPH_ARTICLE, useValue: IlluminationGraphArticleComponent },
    {provide: _ARTICLES.TARGET_DEVELOPMENT_ARTICLE, useValue: TargetDevelopmentArticleComponent },
    {provide: _ARTICLES.LIGAND_ACTIVITY_ARTICLE, useValue: LigandActivityArticleComponent },
    {provide: _ARTICLES.TINX_ARTICLE, useValue: TinxArticleComponent },
    {provide: _ARTICLES.PUBMED_SCORE_ARTICLE, useValue: PubmedScoreArticleComponent },
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
