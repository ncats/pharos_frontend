import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PharosHomeComponent} from "./pharos-home.component";
import {AboutPanelComponent} from "./about-panel/about-panel.component";
import {DataTypesPanelComponent} from "./data-types-panel/data-types-panel.component";
import {NewsPanelComponent} from "./news-panel/news-panel.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const pharosHomeRoutes: Routes = [
  {
    path: '',
    component: PharosHomeComponent
  }
];


@NgModule({
  declarations: [
    PharosHomeComponent,
    AboutPanelComponent,
    DataTypesPanelComponent,
    NewsPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(pharosHomeRoutes)
  ],
  exports: [
    PharosHomeComponent
  ]
})
export class PharosHomeModule { }
