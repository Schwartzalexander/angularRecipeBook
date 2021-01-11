import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {autoLogin, loginStart, logout, signUpStart} from './store/auth.actions';
import {State} from './store/auth.reducer';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
  type: string;
}

export const LOCAL_STORAGE_KEY_USER_DATA = environment.localStorageKeyUserData;
export const URL_SIGN_UP = environment.urlSignUp;
export const URL_SIGN_IN = environment.urlSignIn;
export const API_KEY = environment.firebaseApiKey;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenExpirationTimer: any | undefined;

  authObservable: Observable<State>;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {
    this.authObservable = this.store.select(state => state.auth);
  }

  login(email: string, password: string, redirectUrl: string): void {
    this.store.dispatch(loginStart({email, password, redirectUrl}));
  }

  signUp(email: string, password: string, redirectUrl: string): void {
    this.store.dispatch(signUpStart({email, password, redirectUrl}));
  }

  autoLogin(): void {
    this.store.dispatch(autoLogin());
  }

  /**
   * Logs the user out by sending null to the subject.
   */
  logout(): void {
    this.store.dispatch(logout({redirectUrl: '/auth'}));
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER_DATA);
    this.clearLogoutTimer();
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = undefined;
    }
  }

}
