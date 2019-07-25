import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {MaterialModule} from '../../assets/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    LoginModalComponent
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class AuthModule { }
