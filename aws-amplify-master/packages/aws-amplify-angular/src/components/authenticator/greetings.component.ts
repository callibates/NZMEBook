import { Component, Input } from '@angular/core';
import { AmplifyService, AuthState } from '../../providers';

const template = `
<div class="amplify-greeting">
    <span class="amplify-greeting-text">{{ greeting }}</span>
    <button class="amplify-form-button amplify-greeting-sign-out"
        *ngIf="signedIn"
        (click)="onSignOut()"
      >Sign Out</button>
</div>
`

@Component({
  selector: 'amplify-auth-greetings',
  template: template
})
export class GreetingsComponent {
  signedIn: boolean;
  greeting: string;

  amplifyService: AmplifyService;

  constructor(amplifyService: AmplifyService) {
    this.amplifyService = amplifyService;
    this.subscribe();
  }

  @Input()
  authState: AuthState;

  subscribe() {
    this.amplifyService.authStateChange$
      .subscribe(state => this.setAuthState(state));
  }

  setAuthState(authState: AuthState) {
    this.authState = authState;
    this.signedIn = authState.state === 'signedIn';

    this.greeting = this.signedIn
      ? "Hello " + authState.user.username
      : "";
  }

  onSignOut() {
    this.amplifyService.auth().signOut();
  }
}
