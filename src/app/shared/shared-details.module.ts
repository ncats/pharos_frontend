import { NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {DataDetailsResolver} from '../pharos-main/resolvers/data-details.resolver';
import {SidenavPanelComponent} from '../tools/sidenav-panel/sidenav-panel.component';
import {AnatomogramModule} from '../tools/anatomogram/anatomogram.module';
import {CommonToolsModule} from '../tools/common-tools.module';
import {
    PublicationCardComponent
} from "../pharos-main/data-details/target-details/panels/related-publications/publication-card/publication-card.component";


@NgModule({
  imports: [
    SharedModule,
    AnatomogramModule,
    CommonToolsModule
  ],
    declarations: [
        SidenavPanelComponent,
        PublicationCardComponent
    ],
  providers: [
    DataDetailsResolver
  ],
    exports: [
        SharedModule,
        AnatomogramModule,
        SidenavPanelComponent,
        PublicationCardComponent
    ]
})
export class SharedDetailsModule { }
