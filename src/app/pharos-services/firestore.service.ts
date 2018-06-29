import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import {AppModule} from "../app.module";




// todo: implement this providedin functionality to create singletons and limit what modules the service is available in
@Injectable() /* {
  providedIn: AppModule
}*/
export class FirestoreService {
  constructor(private db: AngularFirestore) { }

  getEvents() {
console.log(this.db);
  }
}
