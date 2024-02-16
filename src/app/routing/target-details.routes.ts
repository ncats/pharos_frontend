import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {DataDetailsResolver} from '../pharos-main/resolvers/data-details.resolver';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {Target, TargetSerializer} from '../models/target';
import {TOKENS} from '../../config/component-tokens';
import {
    LevelSummaryPanelComponent
} from '../pharos-main/data-details/target-details/panels/level-summary-panel/level-summary-panel.component';
import {SidenavPanelComponent} from '../tools/sidenav-panel/sidenav-panel.component';
import {HelpPanelComponent} from '../tools/help-panel/help-panel.component';
import {BreadcrumbComponent} from '../pharos-main/data-details/target-details/panels/breadcrumb/breadcrumb.component';
import {TargetHeaderComponent} from '../pharos-main/data-details/target-details/target-header/target-header.component';
import {
    SummaryPanelComponent
} from '../pharos-main/data-details/target-details/panels/summary-panel/summary-panel.component';
import {
    IdgResourcesPanelComponent
} from '../pharos-main/data-details/target-details/panels/idg-resources-panel/idg-resources-panel.component';
import {
    PublicationStatisticsComponent
} from '../pharos-main/data-details/target-details/panels/publication-statistics/publication-statistics.component';
import {
    RelatedPublicationsComponent
} from '../pharos-main/data-details/target-details/panels/related-publications/related-publications.component';
import {
    DiseaseSourceComponent
} from '../pharos-main/data-details/target-details/panels/disease-source-panel/disease-source-panel.component';
import {
    DiseaseNoveltyComponent
} from '../pharos-main/data-details/target-details/panels/disease-novelty/disease-novelty.component';
import {
    ExpressionPanelComponent
} from '../pharos-main/data-details/target-details/panels/expression-panel/expression-panel.component';
import {
    ProteinProteinPanelComponent
} from '../pharos-main/data-details/target-details/panels/protein-protein-panel/protein-protein-panel.component';
import {
    ViralInteractionPanelComponent
} from '../pharos-main/data-details/target-details/panels/viral-interaction-panel/viral-interaction-panel.component';
import {
    TargetFacetPanelComponent
} from '../pharos-main/data-details/target-details/panels/target-facet-panel/target-facet-panel.component';
import {
    AaSequencePanelComponent
} from '../pharos-main/data-details/target-details/panels/aa-sequence-panel/aa-sequence-panel.component';
import {
    LigandsPanelComponent
} from '../pharos-main/data-details/target-details/panels/drugs-ligands-panel/ligands-panel.component';
import {
    DrugsPanelComponent
} from '../pharos-main/data-details/target-details/panels/drugs-ligands-panel/drugs-panel.component';
import {
    PathwaysPanelComponent
} from '../pharos-main/data-details/target-details/panels/pathways-panel/pathways-panel.component';
import {GoTermsComponent} from '../pharos-main/data-details/target-details/panels/go-terms/go-terms.component';
import {
    InteractingPathwaysComponent
} from '../pharos-main/data-details/target-details/panels/interacting-pathways-component/interacting-pathways.component';
import {
    GwasTargetAnalyticsComponent
} from '../pharos-main/data-details/target-details/panels/gwas-target-analytics/gwas-target-analytics.component';
import {
    NearestTclinPanelComponent
} from '../pharos-main/data-details/target-details/panels/nearest-tclin-panel/nearest-tclin-panel.component';
import {
    AffiliateLinksComponent
} from '../pharos-main/data-details/target-details/panels/affiliate-links/affiliate-links.component';
import {
    OrthologPanelComponent
} from '../pharos-main/data-details/target-details/panels/ortholog-panel/ortholog-panel.component';
import {commonDetailsProviders} from './common-details.providers';

export const routes: Routes = [
    {
        path: '',
        component: PharosMainComponent,
        resolve: {
            results: DataDetailsResolver,
            components: ComponentsResolver
        },
        data: {
            fragments: {
                details: Target.targetDetailsFragments,
                serverQuery: Target.serverDetailsQuery,
                query: Target.targetDetailsQuery
            },
            serializer: new TargetSerializer()
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            ...commonDetailsProviders,
            {provide: TOKENS.LEVEL_SUMMARY_PANEL, useValue: LevelSummaryPanelComponent},
            {provide: TOKENS.PHAROS_BREADCRUMB_COMPONENT, useValue: BreadcrumbComponent},
            {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent},
            {provide: TOKENS.SUMMARY_PANEL, useValue: SummaryPanelComponent},
            {provide: TOKENS.IDG_RESOURCES_PANEL, useValue: IdgResourcesPanelComponent},
            {provide: TOKENS.PUBLICATION_STATISTICS_PANEL, useValue: PublicationStatisticsComponent},
            {provide: TOKENS.RELATED_PUBLICATIONS_PANEL, useValue: RelatedPublicationsComponent},
            {provide: TOKENS.DISEASE_SOURCE_PANEL, useValue: DiseaseSourceComponent},
            {provide: TOKENS.DISEASE_NOVELTY_PANEL, useValue: DiseaseNoveltyComponent},
            {provide: TOKENS.EXPRESSION_PANEL, useValue: ExpressionPanelComponent},
            {provide: TOKENS.PROTEIN_PROTEIN_PANEL, useValue: ProteinProteinPanelComponent},
            {provide: TOKENS.VIRAL_INTERACTIONS_PANEL, useValue: ViralInteractionPanelComponent},
            {provide: TOKENS.TARGET_FACET_PANEL, useValue: TargetFacetPanelComponent},
            {provide: TOKENS.AA_SEQUENCE_PANEL, useValue: AaSequencePanelComponent},
            {provide: TOKENS.LIGANDS_PANEL, useValue: LigandsPanelComponent},
            {provide: TOKENS.DRUGS_PANEL, useValue: DrugsPanelComponent},
            {provide: TOKENS.PATHWAYS_PANEL, useValue: PathwaysPanelComponent},
            {provide: TOKENS.GO_TERMS_PANEL, useValue: GoTermsComponent},
            {provide: TOKENS.INTERACTING_PATHWAYS_PANEL, useValue: InteractingPathwaysComponent},
            {provide: TOKENS.GWAS_TARGET_ANALYTICS_PANEL, useValue: GwasTargetAnalyticsComponent},
            {provide: TOKENS.NEAREST_TCLIN_PANEL, useValue: NearestTclinPanelComponent},
            {provide: TOKENS.AFFILIATE_LINKS, useValue: AffiliateLinksComponent},
            {provide: TOKENS.ORTHOLOGS_PANEL, useValue: OrthologPanelComponent}
        ]
    }
];
