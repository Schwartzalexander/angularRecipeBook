import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../recipes.service';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {addRecipe, deleteRecipe, fetchRecipes, setRecipes, stopEdit, storeRecipes, updateRecipe} from './recipes.actions';
import {environment} from '../../../environments/environment';
import {Recipe} from '../model/recipe.model';
import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';

const RECIPES_URL = environment.urlRecipes;

@Injectable()
export class RecipesEffects {

  constructor(private actions: Actions, private http: HttpClient, private router: Router,
              private recipesService: RecipesService, private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
  }

  fetchRecipes = createEffect(() => this.actions.pipe(
    ofType(fetchRecipes),
    switchMap(() => this.http.get<Recipe[]>(RECIPES_URL)),
    map(recipes => {
      return recipes.map((recipe: Recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => setRecipes({recipes}))
  ));

  storeRecipes = createEffect(() => this.actions.pipe(
    ofType(storeRecipes),
    withLatestFrom(this.recipesService.recipesObservable),
    switchMap(([actionData, recipesState]) => this.http.put(RECIPES_URL, recipesState.recipes))
  ), {dispatch: false});

  authRedirect = createEffect(() => this.actions.pipe(
    ofType(addRecipe, updateRecipe, deleteRecipe, stopEdit),
    tap((data) => {
        if (data.redirectUrl !== undefined)
          this.router.navigate(data.redirectUrl);
      }
    )
  ), {dispatch: false});

}


