import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {login, loginStart} from './auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {API_KEY, AuthResponseData, URL_SIGN_IN} from '../auth.service';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {

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

  sendUserdata = createEffect(() => {
      const effectResult = this.actions.pipe(
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
              return of(login({email: 'responseData.email', userId: 'responseData.localId', token: 'responseData.idToken', expirationTimestamp: 123456798}));
            }),
          );
        })
      );
      return effectResult;
    }
  );

  constructor(private actions: Actions, private http: HttpClient) {
  }
}
