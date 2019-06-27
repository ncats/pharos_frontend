import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {PharosAuthService} from "../pharos-auth.service";


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
    this.pharosAuthService.doLogin(this.dialogRef, 'google');
  }

  loginTwitter() {
    this.pharosAuthService.doLogin(this.dialogRef, 'twitter');
  }

  loginGithub() {
    this.pharosAuthService.doLogin(this.dialogRef, 'github');
  }

  loginEmail() {
    // this.pharosAuthService.doRegister(this.dialogRef);
  }


}
