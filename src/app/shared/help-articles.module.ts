import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ARTICLES} from '../../config/help-article-tokens';
import {IlluminationGraphArticleComponent} from '../tools/help-panel/articles/illumination-graph-article/illumination-graph-article.component';
import {MaterialModule} from '../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TargetDevelopmentArticleComponent} from '../tools/help-panel/articles/target-development-article/target-development-article.component';
import {LigandActivityArticleComponent} from '../tools/help-panel/articles/ligand-activity-article/ligand-activity-article.component';
import {TinxArticleComponent} from '../tools/help-panel/articles/tinx-article/tinx-article.component';
import {PubmedScoreArticleComponent} from '../tools/help-panel/articles/pubmed-score-article/pubmed-score-article.component';
import {EquationRendererComponent} from '../tools/equation-renderer/equation-renderer.component';
import {KatexRendererDirective} from '../tools/equation-renderer/katex-renderer.directive';
import {AssociationScoreArticleComponent} from '../tools/help-panel/articles/association-score-article/association-score-article.component';
import {AssociationDataSourcesArticleComponent} from "../tools/help-panel/articles/association-data-sources-article/association-data-sources-article.component";
import {ExpressionDataSourcesArticleComponent} from "../tools/help-panel/articles/expression-data-sources-article/expression-data-sources-article.component";
import {PPIDataSourcesArticleComponent} from "../tools/help-panel/articles/ppidata-sources-article/ppidata-sources-article.component";

@NgModule({
  declarations: [
    IlluminationGraphArticleComponent,
    TargetDevelopmentArticleComponent,
    LigandActivityArticleComponent,
    TinxArticleComponent,
    PubmedScoreArticleComponent,
    AssociationScoreArticleComponent,
    KatexRendererDirective
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
    {provide: ARTICLES.ASSOCIATION_SCORES_ARTICLE, useValue: AssociationScoreArticleComponent },
    {provide: ARTICLES.ASSOCIATION_DATA_SOURCES_ARTICLE, useValue: AssociationDataSourcesArticleComponent},
    {provide: ARTICLES.EXPRESSION_DATA_SOURCES_ARTICLE, useValue: ExpressionDataSourcesArticleComponent},
    {provide: ARTICLES.PPI_DATA_SOURCES_ARTICLE, useValue: PPIDataSourcesArticleComponent}
  ]
})
export class HelpArticlesModule { }
