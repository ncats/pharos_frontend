import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs/index';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';

/**
 * service to retrieve profile info from firebase, based on user id token
 */
@Injectable({
  providedIn: 'root'
})
export class PharosProfileService {


  /**
   * subject to track user profile
   */
  private _profileSource = new BehaviorSubject<any>(null);


  /**
   * Observable stream of visibility changes
   * @type {Observable<boolean>}
   */
  profile$ = this._profileSource.asObservable();

  /**
   * user object
   * todo once standardized, should be an object model
   */
  private user;

  /**
   * get and filter user collection on init
   * @param userCollection
   * @param afAuth
   */
  constructor(
    private userCollection: AngularFirestore,
    public afAuth: AngularFireAuth

  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.user = user;
      if (user) {
        this.fetchUserProfile(user);
      } else {
        //  firebase.auth().updateCurrentUser(null);
        this._profileSource.next(null);
      }
    });
  }

  /**
   * fetch and broadcast user profile. if it doesn't exist, create one from the user collection login
   * @param user
   */
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

  /**
   * broadcast profile object
   * @param profile
   */
  setProfile(profile) {
    this._profileSource.next(profile);
  }

  /**
   * update profile with new data or saved target collections
   * @param data
   */
  updateProfile(data) {
    this.userCollection.collection('users')
      .doc(this.user.uid)
      .update({savedTargets: data}).then(res => {
      this.fetchUserProfile(this.user);
    });
  }

  /**
   * logout and remove user profile
   */
  logout() {
    firebase.auth().signOut();
    this._profileSource.next(null);
  }
}
