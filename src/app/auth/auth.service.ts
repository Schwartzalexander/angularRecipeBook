import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../junk/model/user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {login, logout} from './store/auth.actions';
import {State} from './store/auth.reducer';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}

const LOCAL_STORAGE_KEY_USER_DATA = environment.localStorageKeyUserData;
const URL_SIGN_UP = environment.urlSignUp;
const URL_SIGN_IN = environment.urlSignIn;
const API_KEY = environment.firebaseApiKey;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenExpirationTimer: any | undefined;

  authObservable: Observable<State>;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {
    this.authObservable = this.store.select('auth');
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(URL_SIGN_UP + '?key=' + API_KEY, {email, password, returnSecureToken: 'true'})
      .pipe(catchError(this.handleError), tap(responseData => {
          this.handleAuthentication(responseData);
          // The previous line does the same as the following three lines:
          // .pipe(catchError(errorResponse => {
          //   return this.handleError(errorResponse);
          // }));
        }
      ));
  }

  autoLogin(): void {
    const userDataRaw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_DATA);
    if (!userDataRaw) {
      return;
    }
    const userData: {
      id: string,
      name: string,
      email: string,
      password: string,
      gender: string,
      roles: string[],
      coronaAttitude: string,
      Token: string,
      tokenExpirationTimestamp?: number
    } = JSON.parse(userDataRaw);
    const loadedUser = new User(userData.id, userData.name, userData.email, userData.password, userData.gender, userData.roles,
      userData.coronaAttitude, userData.Token, userData.tokenExpirationTimestamp);
    if (loadedUser.token && userData.tokenExpirationTimestamp !== undefined) {
      this.store.dispatch(login({
        userId: loadedUser.id,
        email: loadedUser.email,
        token: loadedUser.token,
        expirationTimestamp: userData.tokenExpirationTimestamp
      }));
      if (userData.tokenExpirationTimestamp)
        this.autoLogout(userData.tokenExpirationTimestamp - new Date().getTime());
    }
  }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(URL_SIGN_IN + '?key=' + API_KEY, {email, password, returnSecureToken: 'true'})
      .pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(responseData);
      }));
  }

  private handleAuthentication(responseData: AuthResponseData): any {
    const expirationDate = new Date(new Date().getTime() + responseData.expiresIn * 1000);
    const user = new User(responseData.localId, '', responseData.email, '', '', [], '', responseData.idToken, expirationDate.getTime());
    this.store.dispatch(login({
      userId: user.id,
      email: user.email,
      token: user.token,
      expirationTimestamp: expirationDate.getTime()
    }));
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_DATA, JSON.stringify(user));
    this.autoLogout(responseData.expiresIn * 1000);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    if (!errorResponse || !errorResponse.error || !errorResponse.error.error || !errorResponse.error.error.message)
      return throwError('An unknown error occurred.');
    else
      return throwError(errorResponse.error.error.message);
  }

  /**
   * Logs the user out by sending null to the subject.
   */
  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER_DATA);
    clearTimeout(this.tokenExpirationTimer);
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
