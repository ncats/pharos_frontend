import { Injectable } from '@angular/core';
import {Observable,of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, mergeAll, mergeMap, take} from "rxjs/operators";

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
       return this.firebaseService.collection<any>('target-collection')
         .doc(collection)
         .valueChanges()
         .pipe(
           map(response => {
             const typedResponse: any = response as any;
             this.targetListMap.set(collection, typedResponse.targetList);
             return typedResponse.targetList;
           })
         );
    }
  }

  /**
   * initialize the service objects
   * @param firebaseService
   */
  constructor(private firebaseService: AngularFirestore) {
    this.targetListMap = new Map<string, string[]>();
  }
}
