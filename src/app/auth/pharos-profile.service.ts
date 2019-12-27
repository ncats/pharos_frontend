import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, ReplaySubject} from 'rxjs/index';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/internal/operators';

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


  isLoggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>(null);

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
        this.isLoggedIn.next(true);
        this.fetchUserProfile(user);
      } else {
        //  firebase.auth().updateCurrentUser(null);
        this.isLoggedIn.next(false);
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
          this.isLoggedIn.next(true);
          this._profileSource.next(profile);
        } else {
          this.userCollection.collection('users')
            .doc(user.uid)
            .set({
              name: user.displayName,
              profilePic: user.photoURL
            }).then(res => {
            this.isLoggedIn.next(true);
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
   * update profile with saved target collections
   * @param id
   */
  updateSavedCollection(id: string) {
    const profile = this._profileSource.getValue().data();
    if (profile.collection) {
    profile.collection.push(id);
    } else {
    profile.collection = [id];
    }
    this.userCollection.collection('users')
      .doc(this.user.uid)
      .update(profile).then(res => {
      this.fetchUserProfile(this.user);
    });
  }

  updateEntireCollection(ids: string[]) {
    const profile = this._profileSource.getValue().data();
    profile.collection = ids;
    this.userCollection.collection('users')
      .doc(this.user.uid)
      .update(profile).then(res => {
      this.fetchUserProfile(this.user);
    });
  }

  /**
   * logout and remove user profile
   */
  logout() {
    firebase.auth().signOut();
    this.isLoggedIn.next(false);
    this._profileSource.next(null);
  }

/*  isLoggedIn() {
    return this.afAuth.authState.pipe(
      map(
        (response: any) => {
          console.log(response);
          this.isLoggedIn.next(response);
          return response;
        }
      ));
  }*/
}



