import { Injectable } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PharosApiService} from "./pharos-api.service";

@Injectable()
export class TablePaginationService {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pharosApiService: PharosApiService) { }


  navigateTo(path: string, params: ParamMap):void {
    console.log("navigat to");
      this.pharosApiService.getData(path, params);
  }
}
