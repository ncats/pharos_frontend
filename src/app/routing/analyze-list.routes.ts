import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {DataListResolver} from '../pharos-main/resolvers/data-list.resolver';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {Target, TargetSerializer} from '../models/target';
import {Disease} from '../models/disease';
import {Ligand} from '../models/ligand';
import {Facet} from '../models/facet';
import {TOKENS} from '../../config/component-tokens';
import {
    TargetDiseaseHeatmapComponent
} from '../pharos-main/analyze-list/target-disease-heatmap/target-disease-heatmap.component';
import {
    TargetLigandHeatmapComponent
} from '../pharos-main/analyze-list/target-ligand-heatmap/target-ligand-heatmap.component';
import {
    DiseaseTargetHeatmapComponent
} from '../pharos-main/analyze-list/disease-target-heatmap/disease-target-heatmap.component';
import {
    LigandTargetHeatmapComponent
} from '../pharos-main/analyze-list/ligand-target-heatmap/ligand-target-heatmap.component';
import {
    TargetTargetHeatmapComponent
} from '../pharos-main/analyze-list/target-target-heatmap/target-target-heatmap.component';
import {AnalyzeHeaderComponent} from '../pharos-main/analyze-list/analyze-header/analyze-header.component';
import {SequenceSearchComponent} from '../pharos-main/analyze-list/sequence-search/sequence-search.component';
import {
    DataListVisualizationsComponent
} from '../pharos-main/data-list/data-list-visualizations/data-list-visualizations.component';
import {
    FilterRepresentationComponent
} from '../pharos-main/analyze-list/filter-representation/filter-representation.component';
import {commonListProviders} from './common-list.providers';

export const routes: Routes = [
    {
        path: '',
        component: PharosMainComponent,
        resolve: {
            results: DataListResolver,
            components: ComponentsResolver
        },
        data: {
            fragments: {
                targets: {
                    list: Target.targetListFragments,
                    extras: Target.targetListExtras
                },
                diseases: {
                    list: Disease.diseaseListFragments,
                },
                ligands: {
                    list: Ligand.ligandListFragments
                },
                facets: Facet.facetFieldsFragments,
            },
            serializer: new TargetSerializer()
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            ...commonListProviders,
            {provide: TOKENS.PHAROS_FACET_REPRESENTATION_COMPONENT, useValue: FilterRepresentationComponent},
            {provide: TOKENS.PHAROS_SEQUENCE_LIST_COMPONENT, useValue: SequenceSearchComponent},
            {provide: TOKENS.PHAROS_VISUALIZATION_COMPONENT, useValue: DataListVisualizationsComponent},
            {provide: TOKENS.PHAROS_TARGET_DISEASE_HEATMAP_COMPONENT, useValue: TargetDiseaseHeatmapComponent},
            {provide: TOKENS.PHAROS_TARGET_LIGAND_HEATMAP_COMPONENT, useValue: TargetLigandHeatmapComponent},
            {provide: TOKENS.PHAROS_DISEASE_TARGET_HEATMAP_COMPONENT, useValue: DiseaseTargetHeatmapComponent},
            {provide: TOKENS.PHAROS_LIGAND_TARGET_HEATMAP_COMPONENT, useValue: LigandTargetHeatmapComponent},
            {provide: TOKENS.PHAROS_TARGET_TARGET_HEATMAP_COMPONENT, useValue: TargetTargetHeatmapComponent}
        ]
    }
];
