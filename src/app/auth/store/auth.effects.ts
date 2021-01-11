import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {login, loginFailed, loginStart} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {API_KEY, AuthResponseData, URL_SIGN_IN} from '../auth.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(private actions: Actions, private http: HttpClient, private router: Router) {
  }

  // loginStart = createEffect((authData: loginStart) => {
  //   return this.actions.pipe(
  //     ofType(loginStart),
  //     mergeMap((loginData: { email: string, password: string }) => {
  //       return this.http.post<AuthResponseData>(URL_SIGN_IN + '?key=' + API_KEY, {
  //         email: loginData.email,
  //         password: loginData.password,
  //         returnSecureToken: 'true'
  //       });
  //     })
  //   );
  // });

  // getLoginStart: Observable<Action> = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(loginStart),
  //     mergeMap((value: { email: string, password: string }, index: number) => {
  //         return this.http.post<AuthResponseData>(URL_SIGN_IN + '?key=' + API_KEY, {
  //           email: loginData.email,
  //           password: loginData.password,
  //           returnSecureToken: 'true'
  //         });
  //       }
  //     )
  //   )
  // );

  sendLoginData = createEffect(() => this.actions.pipe(
    ofType(loginStart),
    switchMap((loginData: { email: string, password: string }) => {
      return this.http.post<AuthResponseData>(URL_SIGN_IN + '?key=' + API_KEY, {
        email: loginData.email,
        password: loginData.password,
        returnSecureToken: 'true'
      }).pipe(
        map((responseData) => {
          const expirationTimestamp = new Date().getTime() + responseData.expiresIn * 1000;
          return login({email: responseData.email, userId: responseData.localId, token: responseData.idToken, expirationTimestamp});
        }),
        catchError((error) => {
          return of(loginFailed(error));
        }),
      );
    })
    )
  );

  authSuccess = createEffect(() => this.actions.pipe(
    ofType(login),
    tap(() => {
        this.router.navigate(['/']);
      }
    )
  ), {dispatch: false});

}
