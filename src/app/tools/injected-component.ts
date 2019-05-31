import {PharosBase} from "../models/pharos-base";
import {EventEmitter} from "@angular/core";

export interface InjectedComponent {
  data: any;
  object: PharosBase;
  parent?: PharosBase;
  container: any;
  clickEvent: EventEmitter<any>;
  attached: boolean;
}
