import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable,of} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, mergeAll, mergeMap, take} from "rxjs/operators";
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve and cache targetLists from the firestore
 */
export class TargetListService {

  targetListMap: Map<string, string[]>;

  getList(collection: string): Observable<any>{
    if (this.targetListMap.has(collection)){
      return of(this.targetListMap.get(collection));
    }
    else{
      if (isPlatformBrowser(this.platformID)) {
        // @ts-ignore
        return this.firebaseService.collection<any>('target-collection')
          .doc(collection)
          .valueChanges()
          .pipe(
            // @ts-ignore
            map((response: any) => {
              const typedResponse: any = response as any;
              this.targetListMap.set(collection, typedResponse.targetList);
              return typedResponse.targetList;
            })
          );
      }
      else {
        return of([]);
      }
    }
  }

  /**
   * initialize the service objects
   * @param firebaseService
   */
  constructor(private firebaseService: AngularFirestore,
              @Inject(PLATFORM_ID) private platformID: any) {
    this.targetListMap = new Map<string, string[]>();
  }
}
