import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PharosMainRoutingModule} from './pharos-main-routing.module';

@NgModule({
  imports: [
    PharosMainRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: []
})
export class PharosMainModule { }
