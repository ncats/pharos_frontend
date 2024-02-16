import {Routes} from '@angular/router';
import {PharosMainComponent} from '../pharos-main/pharos-main.component';
import {DataDetailsResolver} from '../pharos-main/resolvers/data-details.resolver';
import {ComponentsResolver} from '../pharos-main/resolvers/components.resolver';
import {Disease, DiseaseSerializer} from '../models/disease';
import {TOKENS} from '../../config/component-tokens';
import {
    DiseaseHeaderComponent
} from '../pharos-main/data-details/disease-details/disease-header/disease-header.component';
import {
    DiseaseSummaryComponent
} from '../pharos-main/data-details/disease-details/disease-summary/disease-summary.component';
import {DoBrowserComponent} from '../pharos-main/data-details/disease-details/do-browser/do-browser.component';
import {TinxDiseaseComponent} from '../pharos-main/data-details/disease-details/tinx/tinx-disease.component';
import {
    GwasDiseaseAnalyticsComponent
} from '../pharos-main/data-details/disease-details/gwas-disease-analytics/gwas-disease-analytics.component';
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
                details: Disease.diseaseListFragments,
                query: Disease.diseaseDetailsQuery,
                serverQuery: Disease.serverDetailsQuery
            },
            serializer: new DiseaseSerializer()
        },
        providers: [
            ...commonDetailsProviders,
            {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent},
            {provide: TOKENS.DISEASE_SUMMARY_COMPONENT, useValue: DiseaseSummaryComponent},
            {provide: TOKENS.DISEASE_DO_BROWSER_COMPONENT, useValue: DoBrowserComponent},
            {provide: TOKENS.DISEASE_TINX_COMPONENT, useValue: TinxDiseaseComponent},
            {provide: TOKENS.DISEASE_GWAS_ANALYTICS_COMPONENT, useValue: GwasDiseaseAnalyticsComponent}
        ]
    }
];
