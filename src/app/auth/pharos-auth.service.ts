import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs/index";
import {MatDialogRef} from "@angular/material";
import {PharosProfileService} from "./pharos-profile.service";

@Injectable({
  providedIn: 'root'
})
export class PharosAuthService {

  constructor(
    private userCollection: AngularFirestore,
    private pharosProfileService: PharosProfileService,
    public afAuth: AngularFireAuth) {
  }

  doFacebookLogin(dialogRef: MatDialogRef<any>) {
    console.log("facebook in service");
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      return this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.fetchUserProfile(res.user);
          dialogRef.close();
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doGoogleLogin(dialogRef: MatDialogRef<any>) {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.fetchUserProfile(res.user);
          dialogRef.close();
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doRegister(value, dialogRef: MatDialogRef<any>) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.fetchUserProfile(res.user);
          dialogRef.close();
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  logout() {
    this.afAuth.auth.signOut().then(res => {
      this.pharosProfileService.setProfile(null);
      return null;
    });
  }

  fetchUserProfile(user: any) {
    this.pharosProfileService.fetchUserProfile(user);
  }
}
