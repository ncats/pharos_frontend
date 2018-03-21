
import { Injectable } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PharosApiService} from "./pharos-api.service";

@Injectable()
export class FacetService {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pharosApiService: PharosApiService) { }


  navigateTo(path: string, params: ParamMap):void {
    this.pharosApiService.getData(path, params);
  }
}
