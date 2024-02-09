import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {PharosMainComponent} from '../../pharos-main.component';
import {Disease, DiseaseSerializer} from '../../../models/disease';
import {ComponentsResolver} from '../../resolvers/components.resolver';
import {TOKENS} from '../../../../config/component-tokens';
import {DiseaseHeaderComponent} from '../../data-details/disease-details/disease-header/disease-header.component';
import {SidenavPanelComponent} from '../../../tools/sidenav-panel/sidenav-panel.component';
import {HelpPanelComponent} from '../../../tools/help-panel/help-panel.component';
import {DiseaseSummaryComponent} from '../../data-details/disease-details/disease-summary/disease-summary.component';
import {DoBrowserComponent} from '../../data-details/disease-details/do-browser/do-browser.component';
import {IdgLevelIndicatorComponent} from '../../../tools/idg-level-indicator/idg-level-indicator.component';
import {TinxDiseaseComponent} from '../../data-details/disease-details/tinx/tinx-disease.component';
import {
  GwasDiseaseAnalyticsComponent
} from '../../data-details/disease-details/gwas-disease-analytics/gwas-disease-analytics.component';

const routes: Routes = [
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
  //  runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    // diseases
    {provide: TOKENS.DISEASE_HEADER_COMPONENT, useValue: DiseaseHeaderComponent},
    {provide: TOKENS.PHAROS_SUBNAV_COMPONENT, useValue: SidenavPanelComponent},
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent},
    {provide: TOKENS.DISEASE_SUMMARY_COMPONENT, useValue: DiseaseSummaryComponent},
    {provide: TOKENS.DISEASE_DO_BROWSER_COMPONENT, useValue: DoBrowserComponent},
    {provide: TOKENS.IDG_LEVEL_TOKEN, useValue: IdgLevelIndicatorComponent},
    {provide: TOKENS.DISEASE_TINX_COMPONENT, useValue: TinxDiseaseComponent},
    {provide: TOKENS.DISEASE_GWAS_ANALYTICS_COMPONENT, useValue: GwasDiseaseAnalyticsComponent}
  ]
})
export class DiseaseDetailsRoutingModule { }
