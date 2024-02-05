import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpsetComponent } from './upset.component';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';


@NgModule({
  declarations: [
    UpsetComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    UpsetComponent
  ]
})
export class UpsetModule { }
