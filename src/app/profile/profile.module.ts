import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    ConfirmModalComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
  ]
})
export class ProfileModule {
}
