import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PharosHomeComponent} from './pharos-home.component';
import {AboutPanelComponent} from './about-panel/about-panel.component';
import {DataTypesPanelComponent} from './data-types-panel/data-types-panel.component';
import {NewsPanelComponent} from './news-panel/news-panel.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {CommonToolsModule} from '../tools/common-tools.module';
import {SearchComponentModule} from '../tools/search-component/search-component.module';
import {AngularFirestore} from '@angular/fire/firestore';

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
    AngularFirestore,
    CommonToolsModule,
    SearchComponentModule,
    RouterModule.forChild(pharosHomeRoutes)
  ],
  exports: [
    PharosHomeComponent
  ]
})
export class PharosHomeModule { }
