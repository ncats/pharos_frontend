import {Component} from '@angular/core';
import {PharosAuthService} from '../pharos-auth.service';
import {MatDialogRef} from '@angular/material/dialog';

/**
 * modal to allow users to login using firebase social login
 */
@Component({
  selector: 'pharos-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  /**
   * gets input from modal about which service to use
   * @param dialogRef
   * @param pharosAuthService
   */
  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private pharosAuthService: PharosAuthService
  ) { }

  /**
   * use firebase's facebook login methods
   */
  loginFacebook() {
    this.pharosAuthService.doLogin(this.dialogRef, 'facebook');
  }

  /**
   * use firebase's google login methods
   */
  loginGoogle() {
    this.pharosAuthService.doLogin(this.dialogRef, 'google');
  }

  /**
   * use firebase's twitter login methods
   */
  loginTwitter() {
    this.pharosAuthService.doLogin(this.dialogRef, 'twitter');
  }

  /**
   * use firebase's github login methods
   */
  loginGithub() {
    this.pharosAuthService.doLogin(this.dialogRef, 'github');
  }

  /**
   * use firebase's email login methods
   * todo: not currently used
   */
  loginEmail() {
    // this.pharosAuthService.doRegister(this.dialogRef);
  }
}
