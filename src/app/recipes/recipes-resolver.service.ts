import {Injectable} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from './model/recipe.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RecipesService} from './recipes.service';
import {Actions, ofType} from '@ngrx/effects';
import {setRecipes} from './store/recipes.actions';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService, private actions: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // return this.dataStorageService.fetchRecipes();
    return this.recipesService.recipesObservable.pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.recipesService.fetchRecipes();
          return this.actions.pipe(
            ofType(setRecipes),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
