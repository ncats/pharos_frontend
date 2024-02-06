import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpsetComponent } from './upset.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';


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
