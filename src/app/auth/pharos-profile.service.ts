import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs/index';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PharosProfileService {


  private _profileSource = new BehaviorSubject<any>(null);


  /**
   * Observable stream of visibility changes
   * @type {Observable<boolean>}
   */
  profile$ = this._profileSource.asObservable();

  private user;
  private profile;

  constructor(
    private userCollection: AngularFirestore,
  ) {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (user) {
        this.fetchUserProfile(user);
      } else {
        //  firebase.auth().updateCurrentUser(null);
        this._profileSource.next(null);
      }
    });
  }

  fetchUserProfile(user) {
    this.userCollection.collection('users')
      .doc(user.uid)
      .get()
      .subscribe(profile => {
        if (profile.exists) {
          this._profileSource.next(profile);
        } else {
          this.userCollection.collection('users')
            .doc(user.uid)
            .set({
              name: user.displayName,
              profilePic: user.photoURL
            }).then(res => {
              this._profileSource.next(res);
            }
          );
        }
      });
  }

  setProfile(profile) {
    this._profileSource.next(profile);
  }

  updateProfile(data) {
    this.userCollection.collection('users')
      .doc(this.user.uid)
      .update({savedTargets: data}).then(res => {
      this.fetchUserProfile(this.user);
    });
  }

  logout() {
    firebase.auth().signOut();
    this._profileSource.next(null);
  }
}
