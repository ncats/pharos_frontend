import { NgModule } from '@angular/core';
import {TopicsRoutingModule} from "../topics/topics-routing.module";
import {CommonModule} from "@angular/common";
import {TargetsRoutingModule} from "./targets-routing.module";

@NgModule({
  declarations: [],
  imports: [
    TargetsRoutingModule
  ]
})
export class TargetsModule { }
