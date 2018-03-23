import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export class EnvironmentVariablesService {
private _environment: any;
private path: string;
constructor(
    private _route: ActivatedRoute,
    private _location: Location
  ) {
  this._environment = environment;

}

  getApiPath(): string{
  return this._environment.apiUrl;
  }


  getDefaultUrl(path: string): string {
    return this._pathExists(path) ? this._environment[this.path].default : null;
  }

  getTableFields(path: string): any[] {
    return this._pathExists(path) ? this._environment[this.path].fields : null;
  }

  getFacets(path: string): any[] {
    return this._pathExists(path) ? this._environment[this.path].facets : null;
  }
  getAllChartFacets(path: string): any[] {
    return this._pathExists(path) ? this._environment[this.path].chartFacets : null;
  }

  getChartFacetByName(path: string, chart: string): any[] {
    if(this._pathExists(path) && this._environment[this.path].chartFacets[chart]) {
      return this._environment[this.path].chartFacets[chart]
    } else {
      return null;
    }
  }
  _pathExists(path: string): boolean {
    if(path){
      this.path = path;
    } else {
      console.log("no snapshot)");
     this.path = this._location.path().split('/')[1].split('?')[0];
    }
    console.log(this.path);
    return this._environment[this.path] !== undefined;
  }
}


