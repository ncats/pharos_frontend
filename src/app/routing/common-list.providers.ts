import {TOKENS} from '../../config/component-tokens';
import {AnalyzeHeaderComponent} from '../pharos-main/analyze-list/analyze-header/analyze-header.component';
import {commonProviders} from './common.providers';

export const commonListProviders = [
    ...commonProviders,
    {provide: TOKENS.PHAROS_ANALYZE_HEADER_COMPONENT, useValue: AnalyzeHeaderComponent}
];
