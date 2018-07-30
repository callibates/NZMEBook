import { Component, Input } from '@angular/core';
import { AmplifyService, AuthState } from '../../providers';

const template = `
<div class="amplify-form-container" *ngIf="_show">
  <div class="amplify-form-body">

    <div class="amplify-form-row">
      
      <div class="amplify-form-cell-left">
        <a class="amplify-form-link"
          (click)="onSignIn()"
        >Back to Sign In</a>
      </div>

    </div>

    <div class="amplify-form-row">
      <input
        (keyup)="setUsername($event.target.value)"
        class="amplify-form-input"
        type="text"
        placeholder="Username"
        [value]="username"
      />
    </div>
    <div class="amplify-form-row">
      <input #code
        (keyup)="setCode(code.value)"
        (keyup.enter)="onConfirm()"
        class="amplify-form-input"
        type="text"
        placeholder="Code"
      />
    </div>
      
    <button class="amplify-form-button"
      (click)="onConfirm()">Confirm</button>
    <button class="amplify-form-button"
      (click)="onResend()">Resend</button>

  </div>

  <div class="amplify-form-footer">
    <div class="amplify-form-message-error" *ngIf="errorMessage">{{ errorMessage }}</div>
  </div>

</div>
`

@Component({
  selector: 'amplify-auth-confirm-sign-up',
  template: template
})
export class ConfirmSignUpComponent {
  _authState: AuthState;
  _show: boolean;
  username: string;
  code: string;
  errorMessage: string;
  amplifyService: AmplifyService;

  constructor(amplifyService: AmplifyService) {
    this.amplifyService = amplifyService;
  }

  @Input()
  set authState(authState: AuthState) {
    this._authState = authState;
    this._show = authState.state === 'confirmSignUp';

    this.username = authState.user? authState.user.username || '' : '';
  }

  setUsername(username: string) {
    this.username = username;
  }

  setCode(code: string) {
    this.code = code;
  }

  onConfirm() {
    this.amplifyService.auth()
      .confirmSignUp(
        this.username,
        this.code
      )
      .then(() => console.log('confirm success'))
      .catch(err => this._setError(err));
  }

  onResend() {
    this.amplifyService.auth().resendSignUp(this.username)
      .then(() => console.log('code resent'))
      .catch(err => this._setError(err));
  }

  onSignIn() {
    this.amplifyService.setAuthState({ state: 'signIn', user: null });
  }

  _setError(err) {
    if (!err) {
      this.errorMessage = null;
      return;
    }

    this.errorMessage = err.message || err;
  }
}
