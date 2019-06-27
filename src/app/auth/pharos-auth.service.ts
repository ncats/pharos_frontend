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

  providers: Map<string, firebase.auth.AuthProvider> = new Map<string, firebase.auth.AuthProvider>([
    ['facebook', new firebase.auth.FacebookAuthProvider()],
    ['google', new firebase.auth.GoogleAuthProvider()],
    ['twitter', new firebase.auth.TwitterAuthProvider()],
    ['github', new firebase.auth.GithubAuthProvider()],
  ]);

  constructor(private userCollection: AngularFirestore,
              private pharosProfileService: PharosProfileService,
              public afAuth: AngularFireAuth) {
  }

  doLogin(dialogRef: MatDialogRef<any>, providerName: string) {
    const provider = this.providers.get(providerName);
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.fetchUserProfile(res.user);
          dialogRef.close();
        }, err => {
          console.log(err);
          this.handleError(err);
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

  handleError(error) {
    // An error happened.
    if (error.code === 'auth/account-exists-with-different-credential') {
      // Step 2.
      // User's email already exists.
      // The pending GitHub credential.
      var pendingCred = error.credential;
      // The provider account's email address.
      var email = error.email;
      // Get sign-in methods for this email.
      this.afAuth.auth.fetchSignInMethodsForEmail(email).then((methods) => {
        // Step 3.
        // If the user has several sign-in methods,
        // the first method in the list will be the "recommended" method to use.
        /*if (methods[0] === 'password') {
          // Asks the user their password.
          // In real scenario, you should handle this asynchronously.
          const password = this.promptUserForPassword(); // TODO: implement promptUserForPassword.
          this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
            // Step 4a.
            return res.user.linkWithCredential(pendingCred);
          }).then(function(res) {
            console.log(res);
            // GitHub account successfully linked to the existing Firebase user.
            this.fetchUserProfile(res.user);
          });
          return;
        }*/
        // All the other cases are external providers.
        // Construct provider object for that provider.
        // TODO: implement getProviderForProviderId.
        const provider = this.providers.get(methods[0].split('.')[0]);
        // At this point, you should let the user know that he already has an account
        // but with a different provider, and let him validate the fact he wants to
        // sign in with this provider.
        // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        // so in real scenario you should ask the user to click on a "continue" button
        // that will trigger the signInWithPopup.
        this.afAuth.auth.signInWithPopup(provider).then(result => {
          // Remember that the user may have signed in with an account that has a different email
          // address than the first one. This can happen as Firebase doesn't control the provider's
          // sign in flow and the user is free to login using whichever account he owns.
          // Step 4b.
          // Link to GitHub credential.
          // As we have access to the pending credential, we can directly call the link method.
          result.user.linkWithCredential(pendingCred).then(usercred => {
            // GitHub account successfully linked to the existing Firebase user.
            this.fetchUserProfile(usercred.user);
          });
        });
      });
    }
    if (error.code === 'auth/popup-blocked') {
        alert('Please allow popups for authentication');
    }
    /*
      promptUserForPassword() {
        return '123456789'
      }*/
  }

}
