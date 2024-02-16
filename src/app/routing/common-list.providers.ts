import {TOKENS} from '../../config/component-tokens';
import {AnalyzeHeaderComponent} from '../pharos-main/analyze-list/analyze-header/analyze-header.component';
import {commonProviders} from './common.providers';
import {FilterPanelComponent} from '../pharos-main/data-list/filter-panel/filter-panel.component';
import {SelectedFacetListComponent} from '../pharos-main/data-list/selected-facet-list/selected-facet-list.component';

export const commonListProviders = [
    ...commonProviders,
    {provide: TOKENS.PHAROS_FACETS_COMPONENT, useValue: FilterPanelComponent},
    {provide: TOKENS.PHAROS_SELECTED_FACET_LIST_COMPONENT, useValue: SelectedFacetListComponent},
    {provide: TOKENS.PHAROS_ANALYZE_HEADER_COMPONENT, useValue: AnalyzeHeaderComponent}
];
