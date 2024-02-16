import {TOKENS} from '../../config/component-tokens';
import {HelpPanelComponent} from '../tools/help-panel/help-panel.component';
import {ARTICLES} from '../../config/help-article-tokens';
import {
    IlluminationGraphArticleComponent
} from '../tools/help-panel/articles/illumination-graph-article/illumination-graph-article.component';
import {
    TargetDevelopmentArticleComponent
} from '../tools/help-panel/articles/target-development-article/target-development-article.component';
import {
    LigandActivityArticleComponent
} from '../tools/help-panel/articles/ligand-activity-article/ligand-activity-article.component';
import {TinxArticleComponent} from '../tools/help-panel/articles/tinx-article/tinx-article.component';
import {
    PubmedScoreArticleComponent
} from '../tools/help-panel/articles/pubmed-score-article/pubmed-score-article.component';
import {
    AssociationDataSourcesArticleComponent
} from '../tools/help-panel/articles/association-data-sources-article/association-data-sources-article.component';
import {
    PPIDataSourcesArticleComponent
} from '../tools/help-panel/articles/ppidata-sources-article/ppidata-sources-article.component';
import {
    PathwayDataSourcesArticleComponent
} from '../tools/help-panel/articles/pathway-data-sources-article/pathway-data-sources-article.component';
import {
    GoTermsEvidenceArticleComponent
} from '../tools/help-panel/articles/go-terms-evidence-article/go-terms-evidence-article.component';

export const commonProviders = [
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent},

    {provide: ARTICLES.ILLUMINATION_GRAPH_ARTICLE, useValue: IlluminationGraphArticleComponent },
    {provide: ARTICLES.TARGET_DEVELOPMENT_ARTICLE, useValue: TargetDevelopmentArticleComponent },
    {provide: ARTICLES.LIGAND_ACTIVITY_ARTICLE, useValue: LigandActivityArticleComponent },
    {provide: ARTICLES.TINX_ARTICLE, useValue: TinxArticleComponent },
    {provide: ARTICLES.PUBMED_SCORE_ARTICLE, useValue: PubmedScoreArticleComponent },
    {provide: ARTICLES.ASSOCIATION_DATA_SOURCES_ARTICLE, useValue: AssociationDataSourcesArticleComponent},
    {provide: ARTICLES.PPI_DATA_SOURCES_ARTICLE, useValue: PPIDataSourcesArticleComponent},
    {provide: ARTICLES.PATHWAY_DATA_SOURCES_ARTICLE, useValue: PathwayDataSourcesArticleComponent},
    {provide: ARTICLES.GO_TERMS_EVIDENCE_ARTICLE, useValue: GoTermsEvidenceArticleComponent}
];
