import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {autoLogin, login, loginFailed, loginStart, logout, signUpStart} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {API_KEY, AuthResponseData, AuthService, LOCAL_STORAGE_KEY_USER_DATA, URL_SIGN_IN, URL_SIGN_UP} from '../auth.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../junk/model/user.model';

@Injectable()
export class AuthEffects {

  constructor(private actions: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  sendSignUpData = createEffect(() => this.actions.pipe(
    ofType(signUpStart),
    switchMap((signUpData: { email: string, password: string, redirectUrl: string }) => {
      return this.http.post<AuthResponseData>(URL_SIGN_UP + '?key=' + API_KEY, {
        email: signUpData.email,
        password: signUpData.password,
        returnSecureToken: 'true'
      }).pipe(
        tap(responseData => this.authService.autoLogout(responseData.expiresIn * 1000)),
        map(responseData => handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken,
          signUpData.redirectUrl)),
        catchError((errorResponse) => handleError(errorResponse)),
      );
    })
    )
  );

  sendLoginData = createEffect(() => this.actions.pipe(
    ofType(loginStart),
    switchMap((loginData: { email: string, password: string, redirectUrl: string }) => {
      return this.http.post<AuthResponseData>(URL_SIGN_IN + '?key=' + API_KEY, {
        email: loginData.email,
        password: loginData.password,
        returnSecureToken: 'true'
      }).pipe(
        tap(responseData => this.authService.autoLogout(responseData.expiresIn * 1000)),
        map(responseData => handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken,
          loginData.redirectUrl)),
        catchError((errorResponse) => handleError(errorResponse)),
      );
    })
    )
  );

  authRedirect = createEffect(() => this.actions.pipe(
    ofType(login, logout),
    tap((data) => {
        this.router.navigate([data.redirectUrl]);
      }
    )
  ), {dispatch: false});

  autoLogin = createEffect(() => this.actions.pipe(
    ofType(autoLogin),
    map(() => {
        const userDataRaw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_DATA);
        if (!userDataRaw)
          return {type: 'EMPTY'};

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
          this.authService.autoLogout(userData.tokenExpirationTimestamp - new Date().getTime());
          return login({
            userId: loadedUser.id,
            email: loadedUser.email,
            token: loadedUser.token,
            expirationTimestamp: userData.tokenExpirationTimestamp,
            redirectUrl: '/'
          });
        }
        return {type: 'EMPTY'};
      }
    )
  ));

  logoutStart = createEffect(() => this.actions.pipe(
    ofType(logout),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER_DATA);
    })
  ), {dispatch: false});
}

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string, redirectUrl: string) => {
  const expirationTimestamp = new Date().getTime() + expiresIn * 1000;
  const user = new User(userId, '', email, '', '', [], '', token, expirationTimestamp);
  localStorage.setItem(LOCAL_STORAGE_KEY_USER_DATA, JSON.stringify(user));
  return login({email, userId, token, expirationTimestamp, redirectUrl});
};

const handleError = (errorResponse: any) => {
  if (!errorResponse || !errorResponse.error || !errorResponse.error.error || !errorResponse.error.error.message)
    return of(loginFailed({error: 'An unknown error occurred.'}));
  else
    return of(loginFailed({error: errorResponse.error.error.message}));
};

