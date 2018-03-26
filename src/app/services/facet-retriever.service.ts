import { Injectable } from '@angular/core';
import {ResponseParserService} from "./response-parser.service";
import {Facet} from "../models/facet";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Subscription} from "rxjs/Subscription";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {map} from "rxjs/operators";

@Injectable()
export class FacetRetrieverService {
  facets: Facet[];
  _loaded = new BehaviorSubject<boolean>(false);
  _facets = new BehaviorSubject<Facet[]>([]);
  loaded$ = this._loaded.asObservable();
  facets$ = this._facets.asObservable();



  constructor(private responseParserService: ResponseParserService) {
    this.responseParserService.facetsData$.subscribe(res=> {
      this.facets = res;
      this._loaded.next(true);
      this._facets.next(res);
    })
  }

  getFacet(name: string): any {
    return this.facets.filter(facet => facet.name === name).pop();
  }

  getFacetObservable(name: string): Observable<any> {
    return this.facets$
      .pipe(
        map(res => {
        if (res.length > 0) {
         return res.filter(facet => facet.name === name).pop()
        }
      })
    );
  }

}
