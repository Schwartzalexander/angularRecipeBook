import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../recipes.service';
import {tap} from 'rxjs/operators';
import {addRecipe, deleteRecipe, stopEdit, updateRecipe} from './recipes.actions';

@Injectable()
export class RecipesEffects {

  constructor(private actions: Actions, private http: HttpClient, private router: Router,
              private recipesService: RecipesService, private activatedRoute: ActivatedRoute) {
  }

  // sendSignUpData = createEffect(() => this.actions.pipe(
  //   ofType(signUpStart),
  //   switchMap((signUpData: { email: string, password: string, redirectUrl: string }) => {
  //     return this.http.post<AuthResponseData>(URL_SIGN_UP + '?key=' + API_KEY, {
  //       email: signUpData.email,
  //       password: signUpData.password,
  //       returnSecureToken: 'true'
  //     }).pipe(
  //       tap(responseData => this.authService.autoLogout(responseData.expiresIn * 1000)),
  //       map(responseData => handleAuthentication(+responseData.expiresIn, responseData.email, responseData.localId, responseData.idToken,
  //         signUpData.redirectUrl)),
  //       catchError((errorResponse) => handleError(errorResponse)),
  //     );
  //   })
  //   )
  // );

  authRedirect = createEffect(() => this.actions.pipe(
    ofType(addRecipe, updateRecipe, deleteRecipe, stopEdit),
    tap((data) => {
        if (data.redirectUrl !== undefined)
          this.router.navigate(data.redirectUrl);
      }
    )
  ), {dispatch: false});

}


