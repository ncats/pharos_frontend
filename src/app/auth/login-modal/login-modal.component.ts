import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as firebaseui from 'firebaseui'
import {MatDialogRef} from "@angular/material";
import {PharosAuthService} from "../pharos-auth.service";
import {AngularFirestoreCollection} from "@angular/fire/firestore";


@Component({
  selector: 'pharos-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private pharosAuthService: PharosAuthService
  ) { }

  ngOnInit() {}

  loginFacebook() {
    this.pharosAuthService.doLogin(this.dialogRef, 'facebook');
  }

  loginGoogle() {
    console.log("google login in modal");
    this.pharosAuthService.doLogin(this.dialogRef, 'google');
  }

  loginTwitter() {
    console.log("twitter login in modal");
    this.pharosAuthService.doLogin(this.dialogRef, 'twitter');
  }

  loginGithub() {
    console.log("github login in modal");
    this.pharosAuthService.doLogin(this.dialogRef, 'github');
  }

  loginEmail() {
    console.log("email login in modal");
    // this.pharosAuthService.doRegister(this.dialogRef);
  }


}
