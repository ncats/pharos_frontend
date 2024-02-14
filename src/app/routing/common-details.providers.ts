import {TOKENS} from '../../config/component-tokens';
import {SidenavPanelComponent} from '../tools/sidenav-panel/sidenav-panel.component';
import {commonProviders} from './common.providers';

export const commonDetailsProviders = [
    ...commonProviders,
    {provide: TOKENS.PHAROS_SUBNAV_COMPONENT, useValue: SidenavPanelComponent},
];
