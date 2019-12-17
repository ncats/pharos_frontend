import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [ProfileComponent, ConfirmModalComponent],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
