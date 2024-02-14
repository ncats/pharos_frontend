import {TOKENS} from '../../config/component-tokens';
import {HelpPanelComponent} from '../tools/help-panel/help-panel.component';
import {ScriptLoadService} from '../pharos-services/script-load.service';

export const commonProviders = [
    {provide: TOKENS.PHAROS_HELPPANEL_COMPONENT, useValue: HelpPanelComponent}
];
