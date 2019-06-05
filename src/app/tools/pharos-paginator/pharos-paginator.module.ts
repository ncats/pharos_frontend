import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PharosPaginatorComponent} from "./pharos-paginator.component";
import {MaterialModule} from "../../../assets/material/material.module";

@NgModule({
  declarations: [PharosPaginatorComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [PharosPaginatorComponent]
})
export class PharosPaginatorModule { }
