import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModalComponent} from "./login-modal/login-modal.component";

@NgModule({
  declarations: [
    LoginModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginModalComponent
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class AuthModule { }
